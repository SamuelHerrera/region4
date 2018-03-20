import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { RegistroComponent } from '../components/registro/registro.component';
import { InicioDeSesionComponent } from '../components/inicio-de-sesion/inicio-de-sesion.component';
import { OlvideContrasenaComponent } from '../components/olvide-contrasena/olvide-contrasena.component';
import { ActivacionUsuarioComponent } from '../components/activacion-usuario/activacion-usuario.component';
import { AvaluoComponent } from '../components/avaluo/avaluo.component';
import { ReporteComponent } from '../components/reporte/reporte.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/iniciosesion',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        canActivate: [AuthGuard],
        component: LandingPageComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'iniciosesion',
        component: InicioDeSesionComponent
    },
    {
        path: "reestablecer",
        component: OlvideContrasenaComponent
    },
    {
        path: "activacion",
        component: ActivacionUsuarioComponent
    },
    {
        path: "generaravaluo",
        canActivate: [AuthGuard],
        component: AvaluoComponent
    },
    {
        path: "reporte",
        canActivate: [AuthGuard],
        component: ReporteComponent
    },
    {
        path: '**',
        redirectTo: '/landing'
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule { }
