using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class SizeService : BaseService<Size, SizeRepository>
    {
        SizeRepository sizeRepository = new SizeRepository();
        public async Task<IList<string>> GetDistinctSizes()
        {
            return await sizeRepository.GetDistinctSizes();

        }
        public async Task<IList<Size>> GetSizesByProductId(Guid id)
        {
            return await sizeRepository.GetSizeByProductId(id);
        }

        public async Task<string> GetSizeById(Guid sizeId)
        {
            return await sizeRepository.GetSizeById(sizeId);
        }
    }
}
