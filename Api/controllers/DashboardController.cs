using System;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public DashboardController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var now = DateTime.UtcNow;

            var totalProdutos = await _db.Products.CountAsync();

            var itensCriticos = await _db.Products
                .Where(p => p.Quantity < p.MinimumQuantity)
                .Select(p => new
                {
                    name = p.Name,
                    qtd = p.Quantity
                })
                .ToListAsync();

            var produtosCriticos = itensCriticos.Count;

            var totalMovimentacoesMes = await _db.StockMovements
                .Where(m => m.Date.Month == now.Month && m.Date.Year == now.Year)
                .CountAsync();

            var usoMensalRaw = await _db.StockMovements
                .GroupBy(m => new { m.Date.Year, m.Date.Month })
                .Select(g => new
                {
                    year = g.Key.Year,
                    month = g.Key.Month,
                    valor = g.Count()
                })
                .OrderBy(x => x.year)
                .ThenBy(x => x.month)
                .Take(6)
                .ToListAsync();

            var usoMensal = usoMensalRaw
                .Select(x => new
                {
                    mes = $"{x.month:D2}/{x.year}",
                    x.valor
                })
                .ToList();

            return Ok(new
            {
                totalProdutos,
                produtosCriticos,
                totalMovimentacoesMes,
                usoMensal,
                itensCriticos
            });
        }
    }
}
