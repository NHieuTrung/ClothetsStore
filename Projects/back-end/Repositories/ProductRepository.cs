using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductRepository : BaseRepository<Product>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Product>> GetAll()
        {
            return await ctx.Product.ToListAsync();
        }

        public override async Task<Product> GetById(Guid id)
        {
            Product product = await ctx.Product.Where(p => p.ProductId == id)
                                               .FirstOrDefaultAsync();

            return product;
        public async Task<IList<Size>> GetSize(Guid id)
        {
            IList<Size> size = new List<Size>();
            
            List<Guid> productSize = await ctx.ProductSize.Where(p => p.ProductId == id)
                                               .GroupBy(p => p.SizeId)
                                               .Distinct()
                                               .Select(s=>s.Key)
                                               .ToListAsync();

            foreach(Guid item in productSize)
            {
                size.Add(ctx.Size.Where(s => s.SizeId == item).FirstOrDefault());
            }

            return size;
        }

        public override async Task Create( Product product)
        {
            ctx.Product.Add(product);
            await ctx.SaveChangesAsync();
        }
    }
}
