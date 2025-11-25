using Api.Data;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class StockMovementRepository : IStockMovementRepository
    {
        private readonly ApplicationDbContext _db;

        public StockMovementRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<StockMovement>> GetAllAsync()
        {
            return await _db.StockMovements
                .Include(s => s.Product)
                .OrderByDescending(s => s.Date)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<StockMovement?> GetByIdAsync(Guid id)
        {
            return await _db.StockMovements.FindAsync(id);
        }

        public async Task AddAsync(StockMovement movement)
        {
            await _db.StockMovements.AddAsync(movement);
        }

        public Task UpdateAsync(StockMovement movement)
        {
            _db.StockMovements.Update(movement);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(StockMovement movement)
        {
            _db.StockMovements.Remove(movement);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
