public class UsuarioCreateDto
{
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Senha { get; set; } = null!;
    public string? Telefone { get; set; }
    public string? Papel { get; set; }
}

public class UsuarioUpdateDto
{
    public string Nome { get; set; } = null!;
    public string? Telefone { get; set; }
    public string? Papel { get; set; }
    public bool Ativo { get; set; }
}

public class UsuarioResultDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Telefone { get; set; }
    public string? Papel { get; set; }
    public bool Ativo { get; set; }
}
