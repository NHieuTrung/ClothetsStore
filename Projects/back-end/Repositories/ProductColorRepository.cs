using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductColorRepository : BaseRepository<ProductColor>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductColorRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductColorRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductColor>> GetAll()
        {
            return await ctx.ProductColor.ToListAsync();
        }

        public async Task<IList<ProductColor>> GetProductColorsByColorId(Guid colorId)
        {
            List<ProductColor> productColors = await ctx.ProductColor.Where(pc => pc.ColorId == colorId)
                                                                     .ToListAsync();

            return productColors;
        }
    }
}
