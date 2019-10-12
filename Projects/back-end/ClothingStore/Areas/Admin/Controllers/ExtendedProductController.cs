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
        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProduct>> GetAccount(Guid id)
        {
            var product = await productService.GetById(id);
            var listColorSize = await _context.ProductSize.Where(m => m.ProductId == id).Select(m => new ColorSize { ColorId = m.ColorId, SizeId = m.SizeId, InventoryQuantity = m.InventoryQuantity }).ToListAsync();
            ExtendedProduct extendedProduct = new ExtendedProduct
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