import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './constants/paths';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: AppRoutes.home,
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/Component/Branch/branch.module').then(m => m.BranchModule),
      pathMatch: 'prefix',
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/Component/login/login.module').then(m => m.LoginModule),
      pathMatch: 'prefix',
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
