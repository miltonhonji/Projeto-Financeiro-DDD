import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SistemaComponent } from "./sistema.component";
import { SistemaRoutingModule } from "./sistema-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatIconModule } from '@angular/material/icon';

@NgModule(
  {
      providers:[],
      declarations:[SistemaComponent],
      imports:[
          CommonModule,
          SistemaRoutingModule,
          NavbarModule,
          SidebarModule,
          ReactiveFormsModule,

          NgxPaginationModule,
          FormsModule,
          NgSelectModule,
          MatIconModule
      ]
  }
)

export class SistemaModule{}
