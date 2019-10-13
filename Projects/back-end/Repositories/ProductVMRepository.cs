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

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy)
        {
            List<Product> products = new List<Product>();
            switch (orderBy)
            {
                case "new":
                    products = await ctx.Product.OrderByDescending(p => p.CreatedDate)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
                case "high":
                    products = await ctx.Product.OrderByDescending(p => p.Price)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
                case "low":
                    products = await ctx.Product.OrderBy(p => p.Price)
                                                .Skip(pageSize * (pageNumber - 1))
                                                .Take(pageSize)
                                                .ToListAsync();
                    break;
            }

            List<ProductVM> productVMs = new List<ProductVM>();
            foreach(Product pro in products)
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

        public async Task<int> GetNumberOfPages(int pageSize)
        {
            int numberOfProducts = await ctx.Product.CountAsync();
            int numberOfPages = numberOfProducts % pageSize > 0 ? (numberOfProducts / pageSize) + 1 : numberOfProducts / pageSize;

            return numberOfPages;
        }
    }
}
