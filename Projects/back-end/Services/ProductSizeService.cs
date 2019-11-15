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
        public async Task<int> GetQuatityBySelect(Guid colorId, Guid sizeId, Guid productId)
        {
            if (colorId == Guid.Empty || sizeId == Guid.Empty || productId == Guid.Empty)
            {
                return 0;
            }

            return await productSizeRepository.GetQuatityBySelect(colorId, sizeId, productId);
        }

        public async Task<IList<ProductSize>> GetByProductId(Guid productId)
        {
            if (productId == Guid.Empty)
            {
                List<ProductSize> productSizes = new List<ProductSize>();
                return productSizes;
            }

            return await productSizeRepository.GetByProductId(productId);
        }
    }
}
