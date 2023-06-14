using System;
using System.Collections.Generic;

namespace productAPI.Model
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int Price { get; set; }
        public int CategoryId { get; set; }

        public virtual Category? Category { get; set; } = null!;
    }
}
