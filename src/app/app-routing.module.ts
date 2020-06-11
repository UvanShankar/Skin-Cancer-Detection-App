import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/dataresolver/data-resolver.service';

const routes: Routes = [
  /*
  {
    path: '',
    redirectTo: 'login',
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  {
    path: 'tabs',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'disease-detail',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./pages/disease-detail/disease-detail/disease-detail.module').then( m => m.DiseaseDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
