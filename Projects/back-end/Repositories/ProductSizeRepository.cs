using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductSizeRepository : BaseRepository<ProductSize>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductSizeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductSizeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }
        public override async Task<IList<ProductSize>> GetAll()
        {
            return await ctx.ProductSize.ToListAsync();
        }
        public async Task<IList<ProductSize>> GetByProductId(Guid productId)
        {
            return await ctx.ProductSize.Where(m => m.ProductId == productId).ToListAsync();
        }

        public override async Task Create(ProductSize productSize)
        {
            ctx.ProductSize.Add(productSize);
            await ctx.SaveChangesAsync();

        }
    }
}
