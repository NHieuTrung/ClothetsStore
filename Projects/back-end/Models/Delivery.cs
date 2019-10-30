using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Delivery
    {
        public Delivery()
        {
            Order = new HashSet<Order>();
        }

        public Guid DeliveryId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public ICollection<Order> Order { get; set; }
    }
}
