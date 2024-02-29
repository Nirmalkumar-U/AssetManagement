import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchListComponent } from "./branchList/branchList.component";
import { AppRoutes, Paths } from "../../constants/paths";
import { AddEditBranchComponent } from "./addEditBranch/addEditBranch.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: AppRoutes.branchList,
    title: 'Branch Listing',
    component: BranchListComponent,
    //resolve: { DataResolver: AccumulationAreaListResolver }
  },
  {
    path: AppRoutes.addBranch,
    title: 'Add Branch',
    component: AddEditBranchComponent,
    //resolve: { DataResolver: AccumulationAreaAddEditResolver }
  },
  {
    path: AppRoutes.editBranch,
    title: 'Edit Branch',
    component: AddEditBranchComponent,
    //resolve: { DataResolver: AccumulationAreaAddEditResolver }
  }
];


@NgModule({
  declarations: [AddEditBranchComponent, BranchListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class BranchModule { }
