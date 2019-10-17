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

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;

            IList<ProductVM> productVMs = new List<ProductVM>();

            if(colorId != Guid.Empty)
            {
                productVMs = await GetAllWithColorFilter(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId);
            }
            else
            {
                productVMs = await GetAllWithoutFilter(pageSize, pageNumber, orderBy, minPrice, maxPrice);
            }

            return productVMs;
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;

            int numberOfProducts = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice).CountAsync();
            int numberOfPages = numberOfProducts % pageSize > 0 ? (numberOfProducts / pageSize) + 1 : numberOfProducts / pageSize;

            return numberOfPages;
        }

        public async Task<IList<ProductVM>> GetAllWithoutFilter(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice)
        {
            List<Product> products = new List<Product>();

            switch (orderBy)
            {
                case "new":
                    products = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                                                .OrderByDescending(p => p.CreatedDate)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
                case "high":
                    products = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                                                .OrderByDescending(p => p.Price)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
                case "low":
                    products = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                                                .OrderBy(p => p.Price)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
                default:
                    products = await ctx.Product.Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                                                .OrderByDescending(p => p.CreatedDate)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
            }

            List<ProductVM> productVMs = new List<ProductVM>();
            foreach (Product pro in products)
            {
                ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == pro.ProductId).FirstOrDefaultAsync();
                productVMs.Add(new ProductVM
                {
                    Name = pro.Name,
                    Price = pro.Price,
                    Discount = pro.Discount,
                    ImageUrl = productColor.ImageUrl
                });
            }

            return productVMs;
        }

        public async Task<IList<ProductVM>> GetAllWithColorFilter(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId)
        {
            List<ProductColor> productColors = new List<ProductColor>();
            List<ProductVM> productVMs = new List<ProductVM>();

            switch (orderBy)
            {
                case "new":
                    productVMs = await ctx.ProductColor.Where(p => p.ColorId == colorId && p.Product.Price >= minPrice && p.Product.Price <= maxPrice)
                                                       .OrderByDescending(p => p.Product.CreatedDate)
                                                       .Skip(pageSize * (pageNumber - 1))
                                                       .Take(pageSize)
                                                       .Select(p => new ProductVM
                                                       {
                                                           Name = p.Product.Name,
                                                           Price = p.Product.Price,
                                                           Discount = p.Product.Discount,
                                                           ImageUrl = p.ImageUrl
                                                       })
                                                       .ToListAsync();
                    break;
                case "high":
                    productVMs = await ctx.ProductColor.Where(p => p.ColorId == colorId && p.Product.Price >= minPrice && p.Product.Price <= maxPrice)
                                                       .OrderByDescending(p => p.Product.Price)
                                                       .Skip(pageSize * (pageNumber - 1))
                                                       .Take(pageSize)
                                                       .Select(p => new ProductVM
                                                       {
                                                           Name = p.Product.Name,
                                                           Price = p.Product.Price,
                                                           Discount = p.Product.Discount,
                                                           ImageUrl = p.ImageUrl
                                                       })
                                                       .ToListAsync();
                    break;
                case "low":
                    productVMs = await ctx.ProductColor.Where(p => p.ColorId == colorId && p.Product.Price >= minPrice && p.Product.Price <= maxPrice)
                                                       .OrderBy(p => p.Product.Price)
                                                       .Skip(pageSize * (pageNumber - 1))
                                                       .Take(pageSize)
                                                       .Select(p => new ProductVM
                                                       {
                                                           Name = p.Product.Name,
                                                           Price = p.Product.Price,
                                                           Discount = p.Product.Discount,
                                                           ImageUrl = p.ImageUrl
                                                       })
                                                       .ToListAsync();
                    break;
                default:
                    productVMs = await ctx.ProductColor.Where(p => p.ColorId == colorId && p.Product.Price >= minPrice && p.Product.Price <= maxPrice)
                                                       .OrderByDescending(p => p.Product.CreatedDate)
                                                       .Skip(pageSize * (pageNumber - 1))
                                                       .Take(pageSize)
                                                       .Select(p => new ProductVM
                                                       {
                                                           Name = p.Product.Name,
                                                           Price = p.Product.Price,
                                                           Discount = p.Product.Discount,
                                                           ImageUrl = p.ImageUrl
                                                       })
                                                       .ToListAsync();
                    break;
            }

            return productVMs;
        }
    }
}
