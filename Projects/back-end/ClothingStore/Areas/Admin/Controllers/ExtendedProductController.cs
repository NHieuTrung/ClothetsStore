using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothingStore.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ExtendedProductController : ControllerBase
    {
        ProductService productService = new ProductService();
        ProductSizeService productSizeService = new ProductSizeService();
        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProductVM>> GetProductSize(Guid id)
        {
            var product = await productService.GetById(id);
            var listColorSize = await productSizeService.GetByProduct()
            ExtendedProductVM extendedProduct = new ExtendedProductVM
            {
                Code = product.Code,
                Name = product.Name,
                TypeProductId = product.TypeProductId,
                Price = product.Price,
                Detail = product.Detail,
                Discount = product.Discount,
                CreatedDate = product.CreatedDate,
                BrandId = product.BrandId,
                StatusId = product.StatusId,
                ListColorSize = listColorSize,
            };

            if (extendedProduct == null)
            {
                return NotFound();
            }

            return extendedProduct;
        }
    }
}