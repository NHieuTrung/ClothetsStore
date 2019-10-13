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
    public class ProductSizeRepository : BaseRepository<ProductSizeVM>
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

        public async Task<IList<ProductSizeVM>> GetByProductId(Guid productId)
        {
            return await ctx.ProductSize.Where(m => m.ProductId == productId).Select(m => new ProductSizeVM { ColorId = m.ColorId, SizeId = m.SizeId, InventoryQuantity = m.InventoryQuantity }).ToListAsync();
        }
    }
}
