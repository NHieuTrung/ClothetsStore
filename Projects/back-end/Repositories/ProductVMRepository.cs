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

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;

            IList<ProductVM> productVMs = new List<ProductVM>();
            productVMs = await GetAllWithFilter(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName);

            Console.WriteLine(productVMs);

            return productVMs;
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;
            int numberOfProducts = 0;
            int numberOfPages = 0;

            //if (colorId != Guid.Empty)
            //{
            //    numberOfProducts = await ctx.ProductColor.Where(p => p.ColorId == colorId && p.Product.Price >= minPrice && p.Product.Price <= maxPrice).CountAsync();
            //}
            //else
            //{
            //    numberOfProducts = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice).CountAsync();
            //}

            numberOfProducts = await GetNumberOfProductsWithFilter(minPrice, maxPrice, colorId, sizeName);
            numberOfPages = numberOfProducts % pageSize > 0 ? (numberOfProducts / pageSize) + 1 : numberOfProducts / pageSize;

            return numberOfPages;
        }

        public async Task<IList<ProductVM>> GetAllWithFilter(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName)
        {
            List<ProductVM> productVMs = new List<ProductVM>();
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .ToListAsync();

            if(sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            if(colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            switch (orderBy)
            {
                case "new":
                    productVMs = productSizes.OrderByDescending(p => p.ProductColor.Product.CreatedDate)
                                             .Skip(pageSize * (pageNumber - 1))
                                             .Take(pageSize)
                                             .Select(p => new ProductVM
                                             {
                                                 Name = p.ProductColor.Product.Name,
                                                 Price = p.ProductColor.Product.Price,
                                                 Discount = p.ProductColor.Product.Discount,
                                                 ImageUrl = p.ProductColor.ImageUrl
                                             })
                                             .ToList();
                    break;
                case "high":
                    productVMs = productSizes.OrderByDescending(p => p.ProductColor.Product.Price)
                                             .Skip(pageSize * (pageNumber - 1))
                                             .Take(pageSize)
                                             .Select(p => new ProductVM
                                             {
                                                 Name = p.ProductColor.Product.Name,
                                                 Price = p.ProductColor.Product.Price,
                                                 Discount = p.ProductColor.Product.Discount,
                                                 ImageUrl = p.ProductColor.ImageUrl
                                             })
                                             .ToList();
                    break;
                case "low":
                    productVMs = productSizes.OrderBy(p => p.ProductColor.Product.Price)
                                             .Skip(pageSize * (pageNumber - 1))
                                             .Take(pageSize)
                                             .Select(p => new ProductVM
                                             {
                                                 Name = p.ProductColor.Product.Name,
                                                 Price = p.ProductColor.Product.Price,
                                                 Discount = p.ProductColor.Product.Discount,
                                                 ImageUrl = p.ProductColor.ImageUrl
                                             })
                                             .ToList();
                    break;
                default:
                    productVMs = productSizes.OrderByDescending(p => p.ProductColor.Product.CreatedDate)
                                             .Skip(pageSize * (pageNumber - 1))
                                             .Take(pageSize)
                                             .Select(p => new ProductVM
                                             {
                                                 Name = p.ProductColor.Product.Name,
                                                 Price = p.ProductColor.Product.Price,
                                                 Discount = p.ProductColor.Product.Discount,
                                                 ImageUrl = p.ProductColor.ImageUrl
                                             })
                                             .ToList();
                    break;
            }

            return productVMs;
        }

        public async Task<int> GetNumberOfProductsWithFilter(decimal minPrice, decimal maxPrice, Guid colorId, string sizeName)
        {
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .ToListAsync();

            if (sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            if (colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            return productSizes.Count;
        }
    }
}
