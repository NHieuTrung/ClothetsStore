using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OrderDetailRepository : BaseRepository<OrderProductSize>
    {
        private readonly ClothetsStoreContext ctx;

        public OrderDetailRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public OrderDetailRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<OrderProductSize>> GetAll()
        {
            return await ctx.OrderProductSize.ToListAsync();
        }

        public async Task<IList<OrderProductSize>> GetAllByOrderId(Guid orderId)
        {
            return await ctx.OrderProductSize.Where(o => o.OrderId == orderId)
                                             .ToListAsync();
        }
    }
}