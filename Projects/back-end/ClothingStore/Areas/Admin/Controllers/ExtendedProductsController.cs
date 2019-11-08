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
    public class ExtendedProductsController : ControllerBase
    {
        ProductService productService = new ProductService();
        ProductColorService productColorService = new ProductColorService();
        ProductSizeService productSizeService = new ProductSizeService();
        ExtendedProductService extendedProductService = new ExtendedProductService();
        [HttpGet]
        public async Task<IActionResult> GetExtendedProduct()
        {
            var listProduct = await productService.GetAll();
            var listProductColor = await productColorService.GetAll();
            var listProductSize = await productSizeService.GetAll();
            List<ExtendedProductVM> listExtendedProduct = new List<ExtendedProductVM>();
            foreach (var product in listProduct)
            {
                IList<ProductColorVM> listProductColorVM = listProductColor
                    .Where(m => m.ProductId == product.ProductId)
                    .Select(m => new ProductColorVM()
                    {
                        Color = new ColorVM() { ColorId = m.ColorId, ColorValue = m.Color.ColorValue, Name = m.Color.Name },
                        ImageUrl = m.ImageUrl,
                        ListProductSize = listProductSize
                        .Where(n => n.ColorId == m.ColorId && n.ProductId == m.ProductId)
                        .Select(n => new ProductSizeVM() { InventoryQuantity = n.InventoryQuantity, Size = new SizeVM() { SizeId = n.SizeId, Name = n.Size.Name } }).ToList()
                    }).ToList();
                ExtendedProductVM extendedProduct = new ExtendedProductVM
                {
                    ProductId = product.ProductId,
                    Code = product.Code,
                    Name = product.Name,
                    TypeProduct = new TypeProductVM() { Name = product.Name, TypeProductId = product.TypeProductId },
                    Price = product.Price,
                    Detail = product.Detail,
                    Discount = product.Discount,
                    CreatedDate = product.CreatedDate,
                    Brand = new BrandVM() { Name = product.Brand.Name, BrandId = product.Brand.BrandId },
                    Status = new StatusVM() { Name = product.Status.Name, StatusId = product.Status.StatusId },
                    ListProductColor = listProductColorVM
                };
                listExtendedProduct.Add(extendedProduct);
            }

            return Ok(listExtendedProduct);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProductVM>> GetExtendedProduct(Guid id)
        {
            var product = await productService.GetById(id);
            var listProductColor = await productColorService.GetByProductId(id);
            var listProductSize = await productSizeService.GetByProductId(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                IList<ProductColorVM> listProductColorVM = listProductColor
                                        .Select(m => new ProductColorVM()
                                        {
                                            Color = new ColorVM() { ColorId = m.ColorId, ColorValue = m.Color.ColorValue, Name = m.Color.Name },
                                            ImageUrl = m.ImageUrl,
                                            ListProductSize = listProductSize.Where(n => n.ColorId == m.ColorId)
                                            .Select(n => new ProductSizeVM() { InventoryQuantity = n.InventoryQuantity, Size = new SizeVM() { SizeId = n.SizeId, Name = n.Size.Name } }).ToList()
                                        }).ToList();
                ExtendedProductVM extendedProduct = new ExtendedProductVM
                {
                    ProductId = id,
                    Code = product.Code,
                    Name = product.Name,
                    TypeProduct = new TypeProductVM() { TypeProductId = product.TypeProduct.TypeProductId, Name = product.TypeProduct.Name },
                    Price = product.Price,
                    Detail = product.Detail,
                    Discount = product.Discount,
                    CreatedDate = product.CreatedDate,
                    Brand = new BrandVM() { BrandId = product.Brand.BrandId, Name = product.Brand.Name },
                    Status = new StatusVM() { StatusId = product.Status.StatusId, Name = product.Status.Name },
                    ListProductColor = listProductColorVM
                };
                return extendedProduct;
            }


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
                id = extendedProductVM.ProductId
            }, extendedProductVM);
        }
    }
}