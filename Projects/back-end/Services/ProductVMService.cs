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

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy)
        {
            return await productVMRepository.GetAll(pageSize, pageNumber, orderBy);
        }

        public async Task<int> GetNumberOfPages(int pageSize)
        {
            return await productVMRepository.GetNumberOfPages(pageSize);
        }
    }
}
