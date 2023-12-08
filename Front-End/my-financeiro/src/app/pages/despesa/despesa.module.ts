import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DespesaComponent } from "./despesa.component";
import { DespesaRoutingModule } from "./despesa-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule(
  {
      providers:[],
      declarations:[DespesaComponent],
      imports:[
          CommonModule,
          DespesaRoutingModule,
          NavbarModule,
          SidebarModule
      ]
  }
)

export class DespesaModule{}
