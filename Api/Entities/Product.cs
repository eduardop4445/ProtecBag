namespace Api.Entities
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = null!;

        public decimal Quantity { get; set; }

        public string Unit { get; set; } = null!;

        public decimal MinimumQuantity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? Notes { get; set; }

        public ICollection<StockMovement> Movements { get; set; } = new List<StockMovement>();
    }
}
