using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public abstract class BaseRepository<TEntity>
        where TEntity : class, new()
    {
        private readonly ClothetsStoreContext ctx;
        public BaseRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public BaseRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public virtual async Task<IList<TEntity>> GetAll()
        {
            return (IList<TEntity>)ctx.Set<TEntity>();
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            return await ctx.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task<TEntity> GetByProductId(Guid productId)
        {
            return await ctx.Set<TEntity>().Where(m => m.ProductId == productId);
        }
    }
}
