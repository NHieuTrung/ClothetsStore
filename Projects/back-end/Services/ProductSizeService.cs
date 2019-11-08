using Models;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductSizeService : BaseService<ProductSize, ProductSizeRepository>
    {
        ProductSizeRepository productSizeRepository = new ProductSizeRepository();
        public async Task<int> GetQuatityBySelect(Guid colorId, Guid sizeId)
        {
            return await productsizeRepository.GetQuatityBySelect(colorId, sizeId);
        }

        public async Task<IList<ProductSize>> GetByProductId(Guid productId)
        {
            return await productSizeRepository.GetByProductId(productId);
        }
    }
}
