﻿using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductTypeService : BaseService<TypeProduct, ProductTypeRepository>
    {
        ProductTypeRepository productTypeRepository = new ProductTypeRepository();

        public async Task<IList<TypeProduct>> GetProductTypesByProductGender(Guid productGenderId)
        {
            return await productTypeRepository.GetProductTypesByProductGender(productGenderId);
        }
    }
}
