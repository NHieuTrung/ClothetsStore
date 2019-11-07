using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductSizeService:BaseService<ProductSize, ProductSizeRepository>
    {
        ProductSizeRepository productsizeRepository = new ProductSizeRepository();
        public async Task<int> GetQuatityBySelect(Guid colorId, Guid sizeId)
        {
            return await productsizeRepository.GetQuatityBySelect(colorId, sizeId);
        }

       
    }
}
