import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxPaginationModule } from "ngx-pagination";
import { MatIconModule } from '@angular/material/icon'

@NgModule(
  {
      providers:[],
      declarations:[CategoriaComponent],
      imports:[
          CommonModule,
          CategoriaRoutingModule,
          NavbarModule,
          SidebarModule,
          FormsModule,
          ReactiveFormsModule,
          NgSelectModule,

          NgxPaginationModule,
          NgSelectModule,
          MatIconModule
      ]
  }
)

export class CategoriaModule{}
