﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProductVM
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public double? Discount { get; set; }
    }
}
