using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public abstract class BaseService<TEntity, TRepository>
        where TEntity : class, new()
        where TRepository : BaseRepository<TEntity>, new()
    {
        TRepository repository = new TRepository();

        public virtual async Task<IList<TEntity>> GetAll()
        {
            return await repository.GetAll();
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            return await repository.GetById(id);
        }
    }
}
