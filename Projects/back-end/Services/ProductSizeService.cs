using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductSizeService : BaseService<ProductSizeVM, ProductSizeRepository>
    {
        ProductSizeRepository productSizeRepository = new ProductSizeRepository();

        public async Task<IList<ProductSizeVM>> GetByProductId(Guid productId)
        {
            return await productSizeRepository.GetByProductId(productId);
        }
    }
}
