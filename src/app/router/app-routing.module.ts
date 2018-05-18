import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '../components/landing/landing.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { TerminosComponent } from '../components/terminos/terminos.component';
import { ActivacionComponent } from '../components/activacion/activacion.component';
import { ReenviarComponent } from '../components/reenviar/reenviar.component';
import { RestablecerComponent } from '../components/restablecer/restablecer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }, {
    path: 'inicio',
    component: LandingComponent
  }, {
    path: 'sesion',
    component: LoginComponent
  }, {
    path: 'registro',
    component: RegisterComponent
  }, {
    path: 'terminos-y-condiciones',
    component: TerminosComponent
  }, {
    path: 'activacion',
    children: [
      {
        path: ':codigo',
        component: ActivacionComponent
      },
      {
        path: '**',
        component: ActivacionComponent
      }
    ]
  }, {
    path: 'reenviar',
    component: ReenviarComponent
  }, {
    path: 'restablecer',
    children: [
      {
        path: ':mail',
        component: RestablecerComponent
      },
      {
        path: '**',
        component: RestablecerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
