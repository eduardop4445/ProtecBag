public interface IUsuarioService
{
    Task<IEnumerable<UsuarioResultDto>> ListarAsync();
    Task<UsuarioResultDto?> ObterPorIdAsync(Guid id);
    Task<UsuarioResultDto> CriarAsync(UsuarioCreateDto dto);
    Task<UsuarioResultDto?> AtualizarAsync(Guid id, UsuarioUpdateDto dto);
    Task<bool> RemoverAsync(Guid id);
}
