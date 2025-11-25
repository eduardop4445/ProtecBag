using Api.Entities;

namespace Api.Interfaces
{
    public interface IStockMovementRepository
    {
        Task<List<StockMovement>> GetAllAsync();
        Task<StockMovement?> GetByIdAsync(Guid id);
        Task AddAsync(StockMovement movement);
        Task UpdateAsync(StockMovement movement);
        Task DeleteAsync(StockMovement movement);
        Task SaveChangesAsync();
    }
}
