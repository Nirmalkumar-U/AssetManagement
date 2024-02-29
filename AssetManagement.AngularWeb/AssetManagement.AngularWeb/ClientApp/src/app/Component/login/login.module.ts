import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutes } from "../../constants/paths";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {
    path: AppRoutes.login,
    title: 'Branch Listing',
    component: LoginComponent,
    //resolve: { DataResolver: AccumulationAreaListResolver }
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
