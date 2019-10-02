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
            ProductVM product = await ctx.Product.Where(p => p.ProductId == id)
                                                 .Select(p => new ProductVM
                                                 {
                                                     Name = p.Name,
                                                     Price = p.Price,
                                                     Discount = p.Discount
                                                 })
                                                 .FirstOrDefaultAsync();

            return product;
        }
    }
}
