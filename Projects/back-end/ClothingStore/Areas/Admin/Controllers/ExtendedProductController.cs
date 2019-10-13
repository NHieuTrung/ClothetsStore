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
            Guid productId;
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var currentDateTime = DateTime.Now;
                    var account = new Account { Email = registerVM.Email, CreatedDate = currentDateTime };
                    _context.Account.Add(account);
                    _context.SaveChanges();
                    accountId = account.Id;
                    var userInfo = new UserInfo { Name = registerVM.Name, AccountId = account.Id, AvatarUrl = registerVM.ImageUrl, FacebookId = registerVM.Id, ModifyDate = currentDateTime, CreatedDate = currentDateTime };
                    _context.UserInfo.Add(userInfo);
                    userInfoId = userInfo.Id;
                    _context.SaveChanges();
                    // Commit transaction if all commands succeed, transaction will auto-rollback
                    // when disposed if either commands fails
                    transaction.Commit();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }

            return CreatedAtAction("GetGender", new { id = gender.Id }, gender);
        }
    }
}