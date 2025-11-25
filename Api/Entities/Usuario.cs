using System;

namespace Api.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string SenhaHash { get; set; } = null!;

        public string? Telefone { get; set; }
        public string? Papel { get; set; }

        public bool Ativo { get; set; } = true;
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    }
}
