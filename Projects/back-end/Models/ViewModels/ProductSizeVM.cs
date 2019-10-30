﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProductSizeVM
    {
        public Guid SizeId { get; set; }
        public Guid? ProductId { get; set; }
        public Guid ColorId { get; set; }
        public int InventoryQuantity { get; set; }
    }
}
