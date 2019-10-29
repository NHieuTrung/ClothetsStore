using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ColorRepository : BaseRepository<Color>
    {
        private readonly ClothetsStoreContext ctx;

        public ColorRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ColorRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Color>> GetAll()
        {
            return await ctx.Color.ToListAsync();
        }

        public override async Task<Color> GetById(Guid id)
        {
            Color color = await ctx.Color.Where(p => p.ColorId == id)
                                             .FirstOrDefaultAsync();

            return color;
        }

        public async Task<IList<Color>> GetColorByProductId(Guid productId)
        {
            List<Color> colors = await ctx.ProductColor.Include(p => p.Color)
                                                       .Where(p => p.ProductId == productId)
                                                       .Select(p => new Color
                                                       {
                                                           ColorId = p.Color.ColorId,
                                                           ColorValue = p.Color.ColorValue,
                                                           Name = p.Color.Name,
                                                           StatusId = p.Color.StatusId
                                                       })
                                                       .ToListAsync();

            return colors;
        }
    }
}
