import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
  }

listSistemas = new Array<SelectModel>();
sistemaSelect = new SelectModel();

categoriaForm: FormGroup;

ngOnInit(){
  this.menuService.menuSelecionado = 3;

  this.categoriaForm = this.formBuilder.group
    (
      {
        name: ['', [Validators.required]]
      }
    )
  }

  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    alert(dados["name"].value)
  }
}
