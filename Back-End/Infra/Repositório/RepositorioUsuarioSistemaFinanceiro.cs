using Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Entities.Entidades;
using Infra.Repositório.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repositório
{
    public class RepositorioUsuarioSistemaFinanceiro : RepositoryGenerics<UsuarioSistemaFinanceiro>, InterfaceUsuarioSistemaFinanceiro
    {
        private readonly DbContextOptions<ContextBase> _OptionsBuilder;

        public RepositorioUsuarioSistemaFinanceiro()
        {
            _OptionsBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<UsuarioSistemaFinanceiro>> ListarUsuariosSistema(int IdSistema)
        {
            using(var banco = new ContextBase(_OptionsBuilder))
            {
                return await 
                 banco.UsuarioSistemaFinanceiro
                 .Where(s => s.IdSistema == IdSistema).AsNoTracking()
                 .ToListAsync();
            }
        }

        public async Task<UsuarioSistemaFinanceiro> ObterUsuarioPorEmail(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionsBuilder))
            {
                return await
                 banco.UsuarioSistemaFinanceiro.AsNoTracking()
                 .FirstOrDefaultAsync(x => x.EmailUsuario.Equals(emailUsuario));
                 
            }
        }

        public async Task RemoverUsuarios(List<UsuarioSistemaFinanceiro> usuarios)
        {
            using(var banco = new ContextBase(_OptionsBuilder))
            {
                 banco.UsuarioSistemaFinanceiro
                 .RemoveRanges(usuarios);

                 await banco.SaveChangesAsync();
            }
        }
    }
}