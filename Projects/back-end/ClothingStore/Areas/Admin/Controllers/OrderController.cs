using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderService orderService = new OrderService();

        [HttpGet]
        [Route("getOrders")]
        public async Task<IActionResult> GetOrders()
        {
            return Ok(await orderService.GetAll());
        }

        [HttpGet]
        [Route("getAdminOrders")]
        public async Task<IActionResult> GetAdminOrders()
        {
            return Ok(await orderService.GetAdminOrders());
        }

        [HttpGet]
        [Route("getOrderById")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            return Ok(await orderService.GetById(id));
        }
    }
}