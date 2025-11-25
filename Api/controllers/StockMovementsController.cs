using Microsoft.AspNetCore.Mvc;
using Api.Entities;
using Api.Interfaces;

[ApiController]
[Route("api/stock-movements")]
public class StockMovementsController : ControllerBase
{
    private readonly IStockMovementRepository _repo;

    public StockMovementsController(IStockMovementRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();

        var result = items.Select(m => new
        {
            m.Id,
            m.ProductId,
            ProductName = m.Product != null ? m.Product.Name : null,
            m.Type,
            m.Quantity,
            m.Date,
            m.Notes
        });

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StockMovement s)
    {
        await _repo.AddAsync(s);
        await _repo.SaveChangesAsync();

        var result = new
        {
            s.Id,
            s.ProductId,
            s.Type,
            s.Quantity,
            s.Date,
            s.Notes
        };

        return CreatedAtAction(nameof(GetById), new { id = s.Id }, result);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] StockMovement s)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound();

        item.ProductId = s.ProductId;
        item.Type = s.Type;
        item.Quantity = s.Quantity;
        item.Notes = s.Notes;
        item.Date = s.Date;

        await _repo.UpdateAsync(item);
        await _repo.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound();

        await _repo.DeleteAsync(item);
        await _repo.SaveChangesAsync();
        return NoContent();
    }
}
