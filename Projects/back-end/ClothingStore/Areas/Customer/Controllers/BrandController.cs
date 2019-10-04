using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        BrandService brandService = new BrandService();

        [HttpGet]
        [Route("getBrands")] //api/customer/brand/getBrands
        public async Task<IActionResult> GetColors()
        {
            return Ok(await brandService.GetAll());
        }

        [HttpGet]
        [Route("getBrandById")]
        public async Task<IActionResult> GetColorById(Guid id)
        {
            return Ok(await brandService.GetById(id));
        }
    }
}