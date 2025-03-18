import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'inicio', // Ruta padre para landing-page
    loadChildren: () => import('./landig-page/landing-page.module').then(m => m.LandingPageModule), // Lazy loading para cargar el módulo de landing-page solo cuando se accede a 'inicio'
  },
  {
    path: 'auth', // Ruta padre para autenticación
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin', // Ruta padre para administración
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '', // Ruta inicial
    redirectTo: '/auth/login', // Redirecciona a la ruta de login
    pathMatch: 'full', // Solo se redirecciona si la ruta es exactamente vacía
  },
  {
    path: '**', // Ruta comodín, se usa cuando ninguna de las rutas anteriores coincide
    redirectTo: '404', // Redirecciona a la ruta 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
