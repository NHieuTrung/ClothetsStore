using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ColorSize
    {
        public Guid ColorId { get; set; }
        public Guid SizeId { get; set; }
        public int InventoryQuantity { get; set; }
    }
}
