using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductSizeRepository: BaseRepository<ProductSize>
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
        public async Task<int> GetQuatityBySelect(Guid colorId, Guid sizeId)
        {
            int SL = await ctx.ProductSize.Where(p => p.ColorId == colorId && p.SizeId == sizeId)
                                         .CountAsync();
            return SL;
        }
    }
}
