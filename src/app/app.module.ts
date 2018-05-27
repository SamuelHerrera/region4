import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SafePipe } from './pipes/safe.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { IsSecureGuard } from './guards/is-secure-guard.guard';
import { PagofacilService } from './services/pagofacil.service';
import { ClientService } from './services/client.service';
import { ObservablesService } from './services/observables.service';
import { YalsService } from './services/yals.service';
import { MailService } from './services/mail.service';
import { CuponService } from './services/cupon.service';
import { TerminosComponent } from './components/terminos/terminos.component';
import { ActivacionComponent } from './components/activacion/activacion.component';
import { ReenviarComponent } from './components/reenviar/reenviar.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { PoliticaprivacidadComponent } from './components/politicaprivacidad/politicaprivacidad.component';
import { AvisocookiesComponent } from './components/avisocookies/avisocookies.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReporteComponent } from './components/reporte/reporte.component';
import {MatTabsModule} from '@angular/material/tabs';

import { AgmCoreModule } from '@agm/core';

/**Material */
/** */

/**PrimeNG */
import {SelectButtonModule} from 'primeng/selectbutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {GMapModule} from 'primeng/gmap';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SafePipe,
    LoginComponent,
    RegisterComponent,
    TerminosComponent,
    ActivacionComponent,
    ReenviarComponent,
    RestablecerComponent,
    PoliticaprivacidadComponent,
    AvisocookiesComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSelectModule,
    SelectButtonModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    CheckboxModule,
    MatButtonToggleModule,
    GMapModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYcMrK6MOhpjQ93Cg1BeN8RkGAb5KFHhc'
    })
  ],
  providers: [
    AuthGuard,
    IsSecureGuard,
    PagofacilService,
    ClientService,
    ObservablesService,
    YalsService,
    MailService,
    CuponService,
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
