using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        ExtendedProductService extendedProductService = new ExtendedProductService();
        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProductVM>> GetExtendedProduct(Guid id)
        {
            var product = await productService.GetById(id);
            var listProductSizeVM = await productSizeService.GetByProductId(id);
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
                ListProductSize = listProductSizeVM,
            };

            if (extendedProduct == null)
            {
                return NotFound();
            }

            return extendedProduct;
        }

        [HttpPost]
        public async Task<ActionResult<Gender>> PostExtendedProduct(ExtendedProductVM extendedProductVM)
        {
            try
            {
                await extendedProductService.Create(extendedProductVM);
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetExtendedProduct", new
            {
                id = extendedProductVM.ListProductSize.Select(m => m.ProductId).FirstOrDefault()
            }, extendedProductVM);
        }
    }
}