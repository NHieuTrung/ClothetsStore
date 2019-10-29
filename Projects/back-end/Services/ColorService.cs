using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ColorService : BaseService<Color, ColorRepository>
    {

        ColorRepository colorRepository = new ColorRepository();

        public async Task<IList<Color>> GetColorByProductId(Guid productId)
        {
            return await colorRepository.GetColorByProductId(productId);
        }
    }
}
