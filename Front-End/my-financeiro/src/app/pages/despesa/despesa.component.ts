import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
  }

listSistemas = new Array<SelectModel>();
sistemaSelect = new SelectModel();

listCategorias = new Array<SelectModel>();
categoriaSelect = new SelectModel();

despesaForm: FormGroup;

ngOnInit(){
  this.menuService.menuSelecionado = 4;

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
  }

  dadosForm() {
    return this.despesaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    alert(dados["name"].value)
  }
}
