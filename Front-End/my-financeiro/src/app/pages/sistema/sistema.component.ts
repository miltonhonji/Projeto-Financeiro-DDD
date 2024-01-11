import { SistemaFinanceiro } from './../../models/SistemaFinanceiro';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {

tipoTela: number = 1; //1 listagem, 2 cadastro, 3 edição
tableListSistemas: Array<SistemaFinanceiro>;
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
  this.sistemaForm.reset();
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

ListaSistemasUsuario(){
  this.tipoTela = 1;

  this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
    .subscribe((response: Array<SistemaFinanceiro>) => {
      this.tableListSistemas = response;
    }, (error) => console.error(error),
    () => { })
}

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService,public authService : AuthService) {
  }


  sistemaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaSistemasUsuario();

    this.sistemaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )
  }


  dadorForm() {
    return this.sistemaForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    let item = new SistemaFinanceiro();
    item.nome = dados["name"].value;

    item.id =0;
    item.mes=0;
    item.ano=0;
    item.diaFechamento=0;
    item.gerarCopiaDespesa=true;
    item.mesCopia=0;
    item.anoCopia=0;

    this.sistemaService.AdicionarSistemaFinanceiro(item)
    .subscribe((response: SistemaFinanceiro) => {

      this.sistemaForm.reset();


      this.sistemaService.CadastrarUsuarioNoSistema(response.id,this.authService.getEmailUser())
      .subscribe((response: any) => {
        debugger
      }, (error) => console.error(error),
        () => { })

    }, (error) => console.error(error),
      () => { })

  }



}
