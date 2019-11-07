using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        AccountService accountService = new AccountService();

        [HttpGet]
        [Route("getAccounts")] //api/customer/product/getProducts
        public async Task<IActionResult> GetColors()
        {
            return Ok(await accountService.GetAll());
        }

        [HttpGet]
        [Route("getAccountById")]
        public async Task<IActionResult> GetColorById(Guid id)
        {
            return Ok(await accountService.GetById(id));
        }

        [HttpGet]
        [Route("checkAvailability")]
        public async Task<IActionResult> CheckAvailability(string username)
        {
            return Ok(await accountService.CheckAvailability(username));
        }

        [HttpGet]
        [Route("checkEmailAvailability")]
        public async Task<IActionResult> CheckEmailAvailability(string email)
        {
            return Ok(await accountService.CheckEmailAvailability(email));
        }

        [HttpPost]
        [Route("createCustomerAccount")]
        public async Task<IActionResult> CreateCustomerAccount([FromBody] Account account)
        {
            return Ok(await accountService.CreateCustomerAccount(account));
        }

        [HttpPost]
        [Route("createCustomerAccountAndCustomer")]
        public async Task<IActionResult> CreateCustomerAccountAndCustomer([FromBody] AccountCustomerVM accountCustomer)
        {
            return Ok(await accountService.CreateCustomerAccountAndCustomer(accountCustomer));
        }
    }
}