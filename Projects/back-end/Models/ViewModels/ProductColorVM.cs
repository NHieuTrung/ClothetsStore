using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProductColorVM
    {
        public Guid ColorId { get; set; }
        public string ImageUrl { get; set; }
        public IList<ProductSizeVM> ListProductSize { get; set; }
    }
}
