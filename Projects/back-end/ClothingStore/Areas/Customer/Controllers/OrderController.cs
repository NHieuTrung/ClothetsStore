using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    [Route("api/customer/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderService orderService = new OrderService();
        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpPost]
        [Route("createOrder")]
        public async Task<IActionResult> createOrder(Order order)
        {
            return Ok(await orderService.CreateOrder(order));
        }
    }
}