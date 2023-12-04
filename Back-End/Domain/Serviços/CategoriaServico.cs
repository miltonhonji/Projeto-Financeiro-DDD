using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Entidades;
using Domain.Interfaces.InterfaceServicos;
using Domain.Interfaces.ICategoria;

namespace Domain.Serviços
{
    public class CategoriaServico : ICategoriaServico
    {
        private readonly InterfaceCategoria _interfaceCategoria;

        public CategoriaServico(InterfaceCategoria interfaceCategoria)
        {
            _interfaceCategoria = interfaceCategoria;
        }
        public async Task AdicionarCategoria(Categoria categoria)
        {
            var valido = categoria.ValidarPropriedadeString(categoria.Nome, "Nome");
            
            if(valido)
                await _interfaceCategoria.Add(categoria);
        }

        public async Task AtualizarCategoria(Categoria categoria)
        {
            var valido = categoria.ValidarPropriedadeString(categoria.Nome, "Nome");
            
            if(valido)
                await _interfaceCategoria.Update(categoria);
        }
    }
}