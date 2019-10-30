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
        [HttpGet]
        public async Task<IActionResult> GetExtendedProduct()
        {
            var listProduct = await productService.GetAll();
            var listProductSize = await productSizeService.GetAll();
            List<ExtendedProductVM> listExtendedProduct = new List<ExtendedProductVM>();
            foreach (var product in listProduct)
            {
                ExtendedProductVM extendedProduct = new ExtendedProductVM
                {
                    ProductId = product.ProductId,
                    Code = product.Code,
                    Name = product.Name,
                    TypeProductId = product.TypeProductId,
                    Price = product.Price,
                    Detail = product.Detail,
                    Discount = product.Discount,
                    CreatedDate = product.CreatedDate,
                    BrandId = product.BrandId,
                    StatusId = product.StatusId,
                    ListProductSize = listProductSize.Where(m => m.ProductId == product.ProductId).Select(m => new ProductSizeVM() { ColorId = m.ColorId, ProductId = m.ProductId, SizeId = m.SizeId, InventoryQuantity = m.InventoryQuantity }).ToList()
                };
                listExtendedProduct.Add(extendedProduct);
            }

            return Ok(listExtendedProduct);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProductVM>> GetExtendedProduct(Guid id)
        {
            var product = await productService.GetById(id);
            var listProductSizeVM = await productSizeService.GetByProductId(id);
            ExtendedProductVM extendedProduct = new ExtendedProductVM
            {
                ProductId = id,
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
        public async Task<ActionResult<ExtendedProductVM>> PostExtendedProduct(ExtendedProductVM extendedProductVM)
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