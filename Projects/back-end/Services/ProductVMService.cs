using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductVMService : BaseService<ProductVM, ProductVMRepository>
    {
        ProductVMRepository productVMRepository = new ProductVMRepository();

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId)
        {
            return await productVMRepository.GetAll(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId);
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId)
        {
            return await productVMRepository.GetNumberOfPages(pageSize, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId);
        }
        public async Task<IList<ProductVM>> GetNew()
        {
            return await productVMRepository.GetNew();
        }
    }
}
