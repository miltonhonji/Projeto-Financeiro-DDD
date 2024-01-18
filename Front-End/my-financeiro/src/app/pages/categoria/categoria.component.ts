import { CategoriaService } from './../../services/categoria.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { SistemaService } from '../../services/sistema.service';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  tipoTela: number = 1; //1 listagem, 2 cadastro, 3 edição
  tableListCategoria: Array<Categoria>;
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
    this.categoriaForm.reset();
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

  ListarCategoriasUsuario(){
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Categoria>) => {
        this.tableListCategoria = response;
      }, (error) => console.error(error),
      () => { })
  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService : CategoriaService) {
  }

listSistemas = new Array<SelectModel>();
sistemaSelect = new SelectModel();

categoriaForm: FormGroup;

ngOnInit(){
  this.menuService.menuSelecionado = 3;

  this.configpag();
  this.ListarCategoriasUsuario();

  this.categoriaForm = this.formBuilder.group
    (
      {
        name: ['', [Validators.required]],
        sistemaSelect:['', Validators.required]
      }
    )

    this.ListaSistemasUsuario();
  }

  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar(){
    var dados = this.dadosForm();

    if(this.itemEdicao)
    {
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.id = 0;
      this.itemEdicao.idSistema = parseInt(this.sistemaSelect.id)
      this.itemEdicao.nomePropriedade = "";
      this.itemEdicao.mensagem = "";
      this.itemEdicao.notificacoes = [];

      this.categoriaService.AtualizarCategoria(this.itemEdicao)
      .subscribe((response: Categoria) => {

        this.categoriaForm.reset();
        this.ListarCategoriasUsuario();

      }, (error) => console.error(error),
        () => { })
    }
    else
    {
      let item = new Categoria();
      item.nome = dados["name"].value;
      item.id = 0;
      item.idSistema = parseInt(this.sistemaSelect.id)

      this.categoriaService.AdicionarCategoria(item)
      .subscribe((response: Categoria) => {

        this.categoriaForm.reset();

        this.ListarCategoriasUsuario();

      }, (error) => console.error(error),
        () => { })
    }
  }

  ListaSistemasUsuario(id: number = null) {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiro>) => {

      var listSistemaFinanceiro = [];

      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;
        listSistemaFinanceiro.push(item);

        if(id && id == x.id){
          this.sistemaSelect = item;
        }

      });

      this.listSistemas = listSistemaFinanceiro;

    })
  }

  itemEdicao: Categoria;

  edicao(id: number){
  this.categoriaService.ObterCategoria(id)
    .subscribe((response: Categoria) => {

      if (response){
          this.itemEdicao = response;
          this.tipoTela = 2;

          var sistema = response;


          var dados = this.dadosForm();
          dados["name"].setValue(this.itemEdicao.nome)
          this.ListaSistemasUsuario(response.idSistema)
        }

    },
    (error) => console.error(error),
    () => {

    })
  }
}
