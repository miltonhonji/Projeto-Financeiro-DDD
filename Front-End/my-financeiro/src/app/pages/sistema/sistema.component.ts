import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
  }

  sistemaForm: FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 2;

    this.sistemaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )

  }

  dadosForm() {
    return this.sistemaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    alert(dados["name"].value)
  }
}
