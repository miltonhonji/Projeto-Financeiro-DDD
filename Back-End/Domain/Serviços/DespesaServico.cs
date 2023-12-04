using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.IDespesa;
using Domain.Interfaces.InterfaceServicos;
using Entities.Entidades;

namespace Domain.Serviços
{
    public class DespesaServico : IDespesaServico
    {
        private readonly InterfaceDespesa _InterfaceDespesa;
        public DespesaServico(InterfaceDespesa InterfaceDespesa)
        {
            _InterfaceDespesa = InterfaceDespesa;
        }

        public async Task AdicionarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataCadastro = data;
            despesa.Ano = data.Year;
            despesa.Mes = data.Month;

            var valido = despesa.ValidarPropriedadeString(despesa.Nome, "Nome");

            if(valido)
                await _InterfaceDespesa.Add(despesa);  
        }

        public async Task AtualizarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataAlteracao = data;

            if(despesa.Pago)
            {
                despesa.DataPagamento = data;
            }

            var valido = despesa.ValidarPropriedadeString(despesa.Nome, "Nome");

            if(valido)
                await _InterfaceDespesa.Update(despesa);
        }

        public async Task<object> CarregaGraficos(string emailUsuario)
        {
            var despesasUsuario = await _InterfaceDespesa.ListarDespesasUsuario(emailUsuario);
            var despesasAnterior = await _InterfaceDespesa.ListarDespesasUsuarioNaoPagasMesesAnterior(emailUsuario);
            
            var depesas_naoPagasMesesAnteriores = despesasAnterior.Any() ?
                despesasAnterior.ToList().Sum(x => x.Valor) : 0;

            var despesas_pagas = despesasUsuario.Where(d => d.Pago && d.TipoDespesa == Entities.Enums.ETipoDespesa.Contas)
                .Sum(x => x.Valor);
            
            var despesas_pendentes = despesasUsuario.Where(d => !d.Pago && d.TipoDespesa == Entities.Enums.ETipoDespesa.Contas)
            .Sum(x => x.Valor);

            var investimentos = despesasUsuario.Where(d => d.TipoDespesa == Entities.Enums.ETipoDespesa.Investimento)
                .Sum(x => x.Valor);

            return new
            {
                sucesso = "OK",
                despesas_paga = despesas_pagas,
                despesas_pendentes = despesas_pendentes,
                depesas_naoPagasMesesAnteriores = depesas_naoPagasMesesAnteriores,
                investimentos = investimentos
            };
        }
    }
}