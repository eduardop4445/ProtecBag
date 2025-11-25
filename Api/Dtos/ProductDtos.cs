namespace Api.Dtos
{
    public class ProductCreateUpdateDto
    {
        public string Name { get; set; } = null!;
        public decimal Quantity { get; set; }
        public string Unit { get; set; } = null!;
        public decimal MinimumQuantity { get; set; }
        public string? Notes { get; set; }
    }

    public class ProductListItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Quantity { get; set; }
        public string Unit { get; set; } = null!;
        public decimal MinimumQuantity { get; set; }
        public string? Notes { get; set; }
        public bool IsBelowMinimum => Quantity <= MinimumQuantity;
    }
}
