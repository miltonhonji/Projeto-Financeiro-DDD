using Domain.Interfaces.ISistemaFinanceiro;
using Entities.Entidades;
using Infra.Repositório.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repositório
{
    public class RepositorioSistemaFinanceiro : RepositoryGenerics<SistemaFinanceiro>, InterfaceSistemaFinanceiro
    {
        public Task<IList<SistemaFinanceiro>> ListaSistemasUsuario(string emailUsuario)
        {
            throw new NotImplementedException();
        }
    }
}