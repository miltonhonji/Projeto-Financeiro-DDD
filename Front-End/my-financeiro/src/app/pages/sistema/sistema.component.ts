import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {

  constructor(public menuService: MenuService){
  }

  ngOnInit(){
    this.menuService.menuSelecionado = 2;
  }
}
