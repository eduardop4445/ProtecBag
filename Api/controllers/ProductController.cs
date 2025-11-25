using Microsoft.AspNetCore.Mvc;
using Api.Interfaces;
using Api.Entities;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repo;

    public ProductsController(IProductRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _repo.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        await _repo.AddAsync(product);
        await _repo.SaveChangesAsync();
        return Created("", product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Product p)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound();

        item.Name = p.Name;
        item.Quantity = p.Quantity;
        item.Unit = p.Unit;
        item.MinimumQuantity = p.MinimumQuantity;
        item.Notes = p.Notes;

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
