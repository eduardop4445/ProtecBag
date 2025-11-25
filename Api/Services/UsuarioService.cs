using System.Security.Cryptography;
using System.Text;
using Api.Data;
using Api.Entities;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Api.Dtos; 

namespace Api.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ApplicationDbContext _db;

        public UsuarioService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<UsuarioResultDto>> ListarAsync()
        {
            return await _db.Usuarios
                .AsNoTracking()
                .Select(u => new UsuarioResultDto
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    Telefone = u.Telefone,
                    Papel = u.Papel,
                    Ativo = u.Ativo
                })
                .ToListAsync();
        }

        public async Task<UsuarioResultDto?> ObterPorIdAsync(Guid id)
        {
            return await _db.Usuarios
                .AsNoTracking()
                .Where(u => u.Id == id)
                .Select(u => new UsuarioResultDto
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    Telefone = u.Telefone,
                    Papel = u.Papel,
                    Ativo = u.Ativo
                })
                .FirstOrDefaultAsync();
        }

        public async Task<UsuarioResultDto> CriarAsync(UsuarioCreateDto dto)
        {
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Telefone = dto.Telefone,
                Papel = dto.Papel
            };

            _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();

            return new UsuarioResultDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Telefone = usuario.Telefone,
                Papel = usuario.Papel,
                Ativo = usuario.Ativo
            };
        }

        public async Task<UsuarioResultDto?> AtualizarAsync(Guid id, UsuarioUpdateDto dto)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            usuario.Nome = dto.Nome;
            usuario.Telefone = dto.Telefone;
            usuario.Papel = dto.Papel;
            usuario.Ativo = dto.Ativo;

            await _db.SaveChangesAsync();

            return new UsuarioResultDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Telefone = usuario.Telefone,
                Papel = usuario.Papel,
                Ativo = usuario.Ativo
            };
        }

        public async Task<bool> RemoverAsync(Guid id)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return false;

            _db.Usuarios.Remove(usuario);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
