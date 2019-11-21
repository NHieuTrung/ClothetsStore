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

        public async Task<IList<OrderProductSize>> getDetailOrder(Guid idcustomer)
        {
            return await orderRepository.getDetailOrder(idcustomer);
        }

        public async Task<bool> ConfirmDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return await orderRepository.ConfirmDeliveryDate(orderConfirmation);
        }

        public async Task<bool> EditDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return await orderRepository.EditDeliveryDate(orderConfirmation);
        }

        public async Task<bool> ConfirmOrder(Order order)
        {
            return await orderRepository.ConfirmOrder(order);
        }
    }
}
