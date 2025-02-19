﻿using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Customer
    {
        public Customer()
        {
            Order = new HashSet<Order>();
        }

        public Guid CustomerId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Guid GenderId { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public Guid AccountId { get; set; }

        public Account Account { get; set; }
        public Gender Gender { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
