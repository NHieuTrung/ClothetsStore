using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductVMRepository : BaseRepository<ProductVM>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductVMRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductVMRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductVM>> GetAll()
        {
            return await ctx.Product.Select(p => new ProductVM
                                    {
                                        Name = p.Name,
                                        Price = p.Price,
                                        Discount = p.Discount
                                    }).ToListAsync();
        }

        public override async Task<ProductVM> GetById(Guid id)
        {
            Product product = await ctx.Product.Where(p => p.ProductId == id)
                                               .FirstOrDefaultAsync();

            ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == product.ProductId)
                                                              .FirstOrDefaultAsync();

            ProductVM productVM = new ProductVM();
            productVM.Name = product.Name;
            productVM.Price = product.Price;
            productVM.Discount = product.Discount;
            productVM.ImageUrl = productColor.ImageUrl;

            return productVM;
        }

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;

            IList<ProductVM> productVMs = new List<ProductVM>();
            productVMs = await GetAllWithFilter(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search);

            Console.WriteLine(productVMs);

            return productVMs;
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;
            int numberOfProducts = 0;
            int numberOfPages = 0;

            numberOfProducts = await GetNumberOfProductsWithFilter(minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search);
            numberOfPages = numberOfProducts % pageSize > 0 ? (numberOfProducts / pageSize) + 1 : numberOfProducts / pageSize;

            return numberOfPages;
        }

        public async Task<IList<ProductVM>> GetAllWithFilter(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search)
        {
            List<ProductVM> productVMs = new List<ProductVM>();
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .Include(p => p.ProductColor.Product.TypeProduct)
                                                                  .ToListAsync();

            //Filter by size
            if (sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            //Filter by color
            if (colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            //Filter by brand
            if (brandId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.BrandId == brandId).ToList();
            }

            //Filter by product gender
            if (productGenderId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProduct.ProductGenderId == productGenderId).ToList();
            }

            //Search
            if (search != null && search != "")
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.Name.Contains(search)).ToList();
            }

            //Filter by price
            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            //Get distinct products (group by -> distinct)
            List<Guid> productIdList = productSizes.GroupBy(p => p.ProductId)
                                                   .Distinct()
                                                   .Select(p => p.Key)
                                                   .ToList();

            //Get all products
            List<ProductColor> productList = new List<ProductColor>();
            foreach (var productId in productIdList)
            {
                ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == productId).FirstOrDefaultAsync();
                productList.Add(productColor);
            }

            switch (orderBy)
            {
                case "new":
                    productVMs = productList.OrderByDescending(p => p.Product.CreatedDate)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                case "high":
                    productVMs = productList.OrderByDescending(p => p.Product.Price)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                case "low":
                    productVMs = productList.OrderBy(p => p.Product.Price)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                default:
                    productVMs = productList.OrderByDescending(p => p.Product.CreatedDate)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
            }

            return productVMs;
        }

        //getnew
        public async Task<IList<ProductVM>> GetNew()
        {
            List<ProductVM> productVMs = new List<ProductVM>();
            productVMs = await ctx.ProductColor.OrderByDescending(p => p.Product.CreatedDate)
                                               .Take(8)
                                               .Select(p => new ProductVM
                                               {
                                                   ProductId = p.Product.ProductId,
                                                   Name = p.Product.Name,
                                                   Price = p.Product.Price,
                                                   Discount = p.Product.Discount,
                                                   ImageUrl = p.ImageUrl
                                               }).ToListAsync();
            return productVMs;
        }

        public async Task<ProductVM> GetProductVMById(Guid id, Guid colorId)
        {
            ProductVM product = new ProductVM();

            if(colorId != Guid.Empty)
            {
                product = await ctx.ProductColor.Where(p => p.ProductId == id && p.ColorId == colorId)
                                                .Select(p => new ProductVM
                                                {
                                                    ProductId = p.Product.ProductId,
                                                    Name = p.Product.Name,
                                                    Price = p.Product.Price,
                                                    Discount = p.Product.Discount,
                                                    ImageUrl = p.ImageUrl
                                                })
                                                .FirstOrDefaultAsync();
            }
            else
            {
                product = await ctx.ProductColor.Where(p => p.ProductId == id)
                                                .Select(p => new ProductVM
                                                {
                                                    ProductId = p.Product.ProductId,
                                                    Name = p.Product.Name,
                                                    Price = p.Product.Price,
                                                    Discount = p.Product.Discount,
                                                    ImageUrl = p.ImageUrl
                                                })
                                                .FirstOrDefaultAsync();
            }
            //IList<string> product = await ctx.ProductColor.Where(s => s.ProductId == id).Select(s => s.ImageUrl).ToListAsync();
            //return product;
            return product;
        }

        public async Task<int> GetNumberOfProductsWithFilter(decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search)
        {
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .Include(p => p.ProductColor.Product.TypeProduct)
                                                                  .ToListAsync();

            //Filter by size
            if (sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            //Filter by color
            if (colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            //Filter by brand
            if (brandId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.BrandId == brandId).ToList();
            }

            //Filter by product gender
            if (productGenderId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProduct.ProductGenderId == productGenderId).ToList();
            }

            //Search
            if (search != null && search != "")
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.Name.Contains(search)).ToList();
            }

            //Filter by price
            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            List<Guid> productIdList = productSizes.GroupBy(p => p.ProductId)
                                                   .Distinct()
                                                   .Select(p => p.Key)
                                                   .ToList();

            //Get all products
            List<ProductColor> productList = new List<ProductColor>();
            foreach (var productId in productIdList)
            {
                ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == productId).FirstOrDefaultAsync();
                productList.Add(productColor);
            }

            return productList.Count;
        }
    }
}
