using Api.Enums;

namespace Api.Entities
{
    public class StockMovement
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ProductId { get; set; }

        public Product? Product { get; set; }

        public MovementType Type { get; set; }

        public decimal Quantity { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string? Notes { get; set; }
    }
}
