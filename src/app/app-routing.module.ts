import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { CanActivateGuard } from './common/CanActivateGuard';
import { GraphComponent } from './graph/graph.component';
import { ProfileComponent } from './profile/profile.component';
import { SaludoComponent } from './saludo/saludo.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'graph',
    component: GraphComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'saludo',
    component: SaludoComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/home' 
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
