using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Repositories
{
    public class ExtendedProductRepository : BaseRepository<ExtendedProductVM>
    {
        private readonly ClothetsStoreContext ctx;

        public ExtendedProductRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ExtendedProductRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }
        public override async Task Create(ExtendedProductVM extendedProductVM)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var currentDate = System.DateTime.Now;
                    var product = new Product
                    {
                        Code = extendedProductVM.Code,
                        Name = extendedProductVM.Name,
                        TypeProductId = extendedProductVM.TypeProductId,
                        Price = extendedProductVM.Price,
                        Detail = extendedProductVM.Detail,
                        Discount = extendedProductVM.Discount,
                        CreatedDate = currentDate,
                        BrandId = extendedProductVM.BrandId,
                        StatusId = extendedProductVM.StatusId
                    };
                    ctx.Product.Add(product);
                    await ctx.SaveChangesAsync();
                    Guid productId = product.ProductId;
                    foreach (var item in extendedProductVM.ListProductSize)
                    {
                        var productColor = new ProductColor { ColorId = item.ColorId, ProductId = item.ProductId };
                        var productSize = new ProductSize { ProductId = productId, SizeId = item.SizeId, ColorId = item.ColorId, InventoryQuantity = item.InventoryQuantity };
                        ctx.ProductSize.Add(productSize);
                        await ctx.SaveChangesAsync();
                    }
                    // Commit transaction if all commands succeed, transaction will auto-rollback
                    // when disposed if either commands fails
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    var exception = e.ToString();
                }
            }

        }
    }
}
