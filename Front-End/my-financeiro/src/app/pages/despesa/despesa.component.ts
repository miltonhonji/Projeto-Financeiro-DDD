import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { CategoriaService } from '../../services/categoria.service';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';
import { Categoria } from '../../models/Categoria';
import { DespesaService } from '../../services/despesa.service';
import { Despesa } from '../../models/Despesa';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent {

  tipoTela: number = 1; //1 listagem, 2 cadastro, 3 edição
  tableListDespesas: Array<Despesa>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };
  }

  gerarIdParaConfigDePaginacao(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++){
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro()
  {
    this.tipoTela = 2;
    this.despesaForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any){
    this.page = event;
    this.config.currentPage = this.page;
  }

  ListarDespesasUsuario(){
    this.tipoTela = 1;

  this.despesaService.ListarDespesasUsuario(this.authService.getEmailUser())
    .subscribe((response: Array<Despesa>) => {
      this.tableListDespesas = response;
    }, (error) => console.error(error),
    () => { })
  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService: CategoriaService,
    public despesaService: DespesaService){
  }

listSistemas = new Array<SelectModel>();
sistemaSelect = new SelectModel();

listCategorias = new Array<SelectModel>();
categoriaSelect = new SelectModel();

color = 'accent';
checked = false;
disabled = false;

despesaForm: FormGroup;

ngOnInit(){
  this.menuService.menuSelecionado = 4;

  this.configpag();
  this.ListarDespesasUsuario();

  this.despesaForm = this.formBuilder.group
    (
      {
        name: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        data: ['', [Validators.required]],
        sistemaSelect: ['', [Validators.required]],
        categoriaSelect: ['', [Validators.required]]
      }
    )

    this.ListarCategoriasUsuario();
  }

  dadosForm() {
    return this.despesaForm.controls;
  }

  enviar(){

    var dados = this.dadosForm();

    if(this.itemEdicao) {

      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.valor = dados["valor"].value;
      this.itemEdicao.pago = this.checked;
      this.itemEdicao.dataVencimento = dados["data"].value;
      this.itemEdicao.idCategoria = parseInt(this.categoriaSelect.id);

      this.itemEdicao.nomePropriedade = "";
      this.itemEdicao.mensagem = "";
      this.itemEdicao.notificacoes = [];

      this.despesaService.AtualizarDespesa(this.itemEdicao)
        .subscribe((response: Despesa) => {

          this.despesaForm.reset();
          this.ListarDespesasUsuario();

        }, (error) => console.error(error),
         () => { })

    }
    else{
      let item = new Despesa();
      item.nome = dados["name"].value;
      item.valor = dados["valor"].value;
      item.pago = this.checked;
      item.dataVencimento = dados["data"].value;
      item.idCategoria = parseInt(this.categoriaSelect.id);
      item.tipoDespesa = 1;

      this.despesaService.AdicionarDespesa(item)
        .subscribe((response: Despesa) => {

          this.despesaForm.reset();
          this.ListarDespesasUsuario();

        }, (error) => console.error(error),
         () => { })
      }
  }

  handleChangePago(item: any){
    this.checked = item.checked as boolean;
  }

  ListarCategoriasUsuario(id: number = null) {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Categoria>) => {

      var listSistemaFinanceiro = [];

      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;

        listSistemaFinanceiro.push(item);

        if(id && id == x.id)
        {
          this.categoriaSelect = item;
        }

      });

      this.listCategorias = listSistemaFinanceiro;

    })
  }

  itemEdicao: Despesa;

  edicao(id: number){
    this.despesaService.ObterDespesa(id)
    .subscribe((response: Despesa) => {

      if (response){
          this.itemEdicao = response;
          this.tipoTela = 2;

          this.ListarCategoriasUsuario(response.idCategoria);

          var dados = this.dadosForm();
          dados["name"].setValue(this.itemEdicao.nome)

          var dateToString = response.dataVencimento.toString();
          var dateFull = dateToString.split('-');
          var dayFull = dateFull[2].split('T');
          var day = dayFull[0];
          var month = dateFull[1];
          var year = dateFull[0];

          var dateInput = year + '-' + month + '-' + day;
          dados["data"].setValue(dateInput)
          dados["valor"].setValue(response.valor)

          this.checked = response.pago;
        }

    },
    (error) => console.error(error),
    () => {

    })
  }
}
