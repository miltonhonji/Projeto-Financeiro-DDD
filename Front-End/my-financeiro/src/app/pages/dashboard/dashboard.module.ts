import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule(
  {
      providers:[],
      declarations:[DashboardComponent],
      imports:[
          CommonModule,
          DashboardRoutingModule
      ]
  }
)

export class DashboardModule{}
