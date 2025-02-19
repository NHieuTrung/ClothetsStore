﻿using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Order
    {
        public Order()
        {
            OrderProductSize = new HashSet<OrderProductSize>();
        }

        public Guid OrderId { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string ContactPhone { get; set; }
        public Guid DeliveryId { get; set; }
        public decimal DeliveryAddress { get; set; }
        public decimal DeliveryPrice { get; set; }
        public DateTime DeliveryDate { get; set; }
        public Guid StatusId { get; set; }

        public Customer Customer { get; set; }
        public Delivery Delivery { get; set; }
        public Status Status { get; set; }
        public ICollection<OrderProductSize> OrderProductSize { get; set; }
    }
}
