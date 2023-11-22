
using Domain.Interfaces.IDespesa;
using Entities.Entidades;
using Infra.Repositório.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repositório
{
    public class RepositorioDespesa : RepositoryGenerics<Despesa>, InterfaceDespesa
    {
        private readonly DbContextOptions<ContextBase> _OptionBuilder;
    
        public RepositorioDespesa()
        {
            _OptionBuilder = new DbContextOptions<ContextBase>();
        }
        public async Task<IList<Despesa>> ListarDespesasUsuario(string emailUsuario)
        {
            using(var banco = new ContextBase(_OptionBuilder))
            {
                return await
                (from s in banco.SistemaFinanceiro
                 join c in banco.Categoria on s.Id equals c.IdSistema
                 join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.IdSistema
                 join d in banco.Despesa on c.Id equals d.IdCategoria
                 where us.EmailUsuario.Equals(emailUsuario) && s.Mes == d.Mes && s.Ano == d.Ano
                 select c).AsNoTracking().ToListAsync();
            }
        }

        public async Task<IList<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnterior(string emailUsuario)
        {
            using(var banco = new ContextBase(_OptionBuilder))
            {
                return await
                (from s in banco.SistemaFinanceiro
                 join c in banco.Categoria on s.Id equals c.IdSistema
                 join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.IdSistema
                 join d in banco.Despesa on c.Id equals d.IdCategoria
                 where us.EmailUsuario.Equals(emailUsuario) && d.Mes < DateTime.Now.Month && !d.Pago 
                 select d).AsNoTracking().ToListAsync();
            }
        }
    }
}