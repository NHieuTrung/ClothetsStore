using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderDetailService : BaseService<OrderProductSize, OrderDetailRepository>
    {

        OrderDetailRepository orderDetailRepository = new OrderDetailRepository();

        public async Task<IList<OrderProductSize>> GetAllByOrderId(Guid orderId)
        {
            return await orderDetailRepository.GetAllByOrderId(orderId);
        }
    }
}
