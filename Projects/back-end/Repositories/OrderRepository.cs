using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OrderRepository:BaseRepository<Order>
    {
        private readonly ClothetsStoreContext ctx;
        public OrderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }
        public OrderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }
        public async Task<bool> CreateOrder(Order order)
        {
            ctx.Order.Add(new Order()
            {
                OrderId = new Guid(),
                CustomerId=order.CustomerId,
                CreatedDate=DateTime.Now,
                TotalPrice=order.TotalPrice,
                ContactPhone= order.ContactPhone,
                DeliveryName= order.DeliveryName,
                DeliveryEmail= order.DeliveryEmail,
                DeliveryAddress= order.DeliveryAddress,
                DeliveryPrice= order.DeliveryPrice,
                DeliveryDate= DateTime.Now,
                StatusId= Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")

            });
            await ctx.SaveChangesAsync();
            return true;
        }
    }
}
