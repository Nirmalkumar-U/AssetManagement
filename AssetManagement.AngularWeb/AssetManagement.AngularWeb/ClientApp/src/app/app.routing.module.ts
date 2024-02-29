import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('../app/Component/Branch/branch.module').then(m => m.BranchModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      useHash: false,
      onSameUrlNavigation: 'reload',
      enableTracing: false
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
