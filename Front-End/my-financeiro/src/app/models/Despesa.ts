export class Despesa
{
    Id: number;
    Nome: string;
    Valor: number;
    Mes: number;
    Ano: number;
    TipoDespesa: number;
    DataCadastro: Date;
    DataAlteracao: Date;
    DataPagamento: Date;
    DataVencimento: Date;
    Pago: boolean;
    DespesaAtrasa: boolean;
    IdCategoria: number;

    nomePropriedade:string="";
    mensagem:string="";
    notificacoes:[];
}
