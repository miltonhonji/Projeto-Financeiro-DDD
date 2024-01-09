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

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService : CategoriaService) {
  }

listSistemas = new Array<SelectModel>();
sistemaSelect = new SelectModel();

categoriaForm: FormGroup;

ngOnInit(){
  this.menuService.menuSelecionado = 3;

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
    debugger
    var dados = this.dadosForm();

    let item = new Categoria();
    item.nome = dados["name"].value;
    item.id =0;
    item.idSistema = parseInt(this.sistemaSelect.id)

    this.categoriaService.AdicionarCategoria(item)
    .subscribe((response: Categoria) => {

      this.categoriaForm.reset();

    }, (error) => console.error(error),
      () => { })
  }

  ListaSistemasUsuario() {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiro>) => {

      var listSistemaFinanceiro = [];

      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;

        listSistemaFinanceiro.push(item);

      });

      this.listSistemas = listSistemaFinanceiro;

    })
  }
}
