using Models;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService:BaseService<Order,OrderRepository >
    {
        OrderRepository orderRepository = new OrderRepository();

        public async Task<List<ExtendedOrderVM>> GetAdminOrders()
        {
            return await orderRepository.GetAllAdminOrders();
        }

        public async Task<bool> CreateOrder(Order order)
        {
            return await orderRepository.CreateOrder(order);
        }
        public async Task<IList<OrderDetailVM>> getDetailOrder(Guid idcustomer)
        {
            return await orderRepository.getDetailOrder(idcustomer);
        }
    }
}
