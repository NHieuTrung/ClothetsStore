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
    public class OrderRepository:BaseRepository<Order>
    {
        private readonly ClothetsStoreContext ctx;
        private ProductRepository productRepository = new ProductRepository();
        //private ProductSizeRepository productSizeRepository = new ProductSizeRepository();

        public OrderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public OrderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Order>> GetAll()
        {
            return await ctx.Order.ToListAsync();
        }

        public async Task<List<ExtendedOrderVM>> GetAllAdminOrders()
        {
            return await ctx.Order.Select(or => new ExtendedOrderVM
                                         {
                                             OrderId = or.OrderId,
                                             CustomerId = or.CustomerId,
                                             CustomerName = or.Customer.Name,
                                             CreatedDate = or.CreatedDate,
                                             TotalPrice = or.TotalPrice,
                                             ContactPhone = or.ContactPhone,
                                             DeliveryName = or.DeliveryName,
                                             DeliveryEmail = or.DeliveryEmail,
                                             DeliveryAddress = or.DeliveryAddress,
                                             DeliveryPrice = or.DeliveryPrice,
                                             DeliveryDate = or.DeliveryDate,
                                             StatusId = or.StatusId,
                                             StatusName = or.Status.Name
                                         })
                                  .ToListAsync();
        }

        public override async Task<Order> GetById(Guid id)
        {
            Order order = await ctx.Order.Where(p => p.OrderId == id)
                                         .FirstOrDefaultAsync();

            return order;
        }

        public async Task<bool> CreateOrder(Order order)
        {
            //Order
            //DateTime date = new DateTime();

            Order tempOrder = new Order();
            tempOrder.OrderId = Guid.NewGuid();
            tempOrder.CustomerId = order.CustomerId;
            tempOrder.CreatedDate = DateTime.Now;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.ContactPhone = order.ContactPhone;
            tempOrder.DeliveryName = order.DeliveryName;
            tempOrder.DeliveryEmail = order.DeliveryEmail;
            tempOrder.DeliveryAddress = order.DeliveryAddress;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.DeliveryPrice = order.DeliveryPrice;
            tempOrder.DeliveryDate = DateTime.Now;
            tempOrder.StatusId = Guid.Parse("A1AD8DEF-626A-4A06-B39C-956B6255C37C"); //Chưa thanh toán

            ctx.Order.Add(tempOrder);
            await ctx.SaveChangesAsync();

            //OrderDetail
            foreach(OrderProductSize item in order.OrderProductSize)
            {
                //Lấy giá
                Product product = new Product();
                product = await productRepository.GetById(item.ProductId);

                //OrderDetail
                OrderProductSize orderProductSize = new OrderProductSize();
                orderProductSize.OrderId = tempOrder.OrderId;
                orderProductSize.SizeId = item.SizeId;
                orderProductSize.ProductId = item.ProductId;
                orderProductSize.ColorId = item.ColorId;
                orderProductSize.Quantity = item.Quantity;
                orderProductSize.Price = item.Price;

                //product.Discount == 0 ? product.Price * item.Quantity : (product.Price - (product.Price / 100 * (decimal)product.Discount)) * item.Quantity
                ctx.OrderProductSize.Add(orderProductSize);
                await ctx.SaveChangesAsync();

                //Trừ số lượng
                ProductSize productSize = new ProductSize();
                productSize = await ctx.ProductSize.Where(p => p.ColorId == item.ColorId && p.SizeId == item.SizeId && p.ProductId == item.ProductId)
                                                   .FirstOrDefaultAsync();

                productSize.InventoryQuantity = productSize.InventoryQuantity - item.Quantity;
                await ctx.SaveChangesAsync();
            }

            return true;
        }

        public async Task<IList<OrderProductSize>> getDetailOrder(Guid idcustomer)
        {
            //List<Guid> id = ctx.Order.Where(s => s.CustomerId == idcustomer).ToListAsync();
            //List<OrderProductSize> list= ctx.OrderProductSize.Where(s=>s.OrderId==)
            List<OrderProductSize> list = new List<OrderProductSize>();
            List<Guid> id = ctx.Order.Where(s => s.CustomerId == idcustomer).Select(s => s.OrderId).ToList();
            foreach(Guid i in id)
            {
                OrderProductSize order = ctx.OrderProductSize.Where(s => s.OrderId == i).FirstOrDefault();
                list.Add(order);
            }
            return list;
        }
    }
}
