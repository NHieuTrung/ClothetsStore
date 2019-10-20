using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class SizeRepository : BaseRepository<Size>
    {
        private readonly ClothetsStoreContext ctx;

        public SizeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public SizeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Size>> GetAll()
        {
            return await ctx.Size.ToListAsync();
        }

        public async Task<IList<string>> GetDistinctSizes()
        {
            return await ctx.Size.Select(s => s.Name)
                                 .Distinct()
                                 .ToListAsync();
        }

        public override async Task<Size> GetById(Guid id)
        {
            Size size = await ctx.Size.Where(s => s.SizeId == id)
                                      .FirstOrDefaultAsync();

            return size;
        }
    }
}
