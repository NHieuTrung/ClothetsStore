using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        CustomerService customerService = new CustomerService();

        [HttpGet]
        [Route("getcustomerServices")] //api/customer/product/getProducts
        public async Task<IActionResult> GetColors()
        {
            return Ok(await customerService.GetAll());
        }

        [HttpGet]
        [Route("getcustomerServiceById")]
        public async Task<IActionResult> GetColorById(Guid id)
        {
            return Ok(await customerService.GetById(id));
        }

        [HttpPost]
        [Route("createCustomerWithAccountId")]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerVM customer)
        {
            return Ok(await customerService.CreateCustomerWithAccountId(customer));
        }

        [HttpPost]
        [Route("createCustomerWithUsername")]
        public async Task<IActionResult> CreateCustomerWithUsername([FromBody] CustomerVM customer)
        {
            return Ok(await customerService.CreateCustomerWithUsername(customer));
        }
    }
}