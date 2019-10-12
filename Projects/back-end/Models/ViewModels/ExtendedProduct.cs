using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ExtendedProduct
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid TypeProductId { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public double? Discount { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid BrandId { get; set; }
        public Guid StatusId { get; set; }
        public List<ColorSize> ListColorSize { get; set; }
    }
}
