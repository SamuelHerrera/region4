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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { MatStepperModule } from '@angular/material/stepper';

import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
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
import { BasicReportFakeComponent } from './components/basic-report-fake/basic-report-fake.component';
import { ReporteFakeComponent } from './components/reporte-fake/reporte-fake.component';

import { AgmCoreModule } from '@agm/core';
import { ShortNumberPipe } from './pipes/short-number.pipe';

import { AvaluoEnviadoComponent } from './components/avaluo-enviado/avaluo-enviado.component';
import { AvaluoComponent } from './components/avaluo/avaluo.component';
import { ContrasenaActivadaComponent } from './components/contrasena-activada/contrasena-activada.component';
import { EnvioAvaluoComponent } from './components/envio-avaluo/envio-avaluo.component';
import { InicioDeSesionComponent } from './components/inicio-de-sesion/inicio-de-sesion.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { Mapa2Component } from './components/mapa2/mapa2.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { PagoConTarjetaComponent } from './components/pago-con-tarjeta/pago-con-tarjeta.component';
import { Paso2Component } from './components/paso-2/paso-2.component';
import { Paso3Component } from './components/paso-3/paso-3.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RestablecerContrasenaComponent } from './components/restablecer-contrasena/restablecer-contrasena.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { Paso1Component } from './components/paso-1/paso-1.component';
import { DatosfacturacionComponent } from './components/datosfacturacion/datosfacturacion.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CuponesComponent } from './components/cupones/cupones.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ReenviarClaveComponent } from './components/reenviar-clave/reenviar-clave.component';
import { DialogCuponesComponent } from './components/dialog-cupones/dialog-cupones.component';
import { TerminosyCondicionesComponent } from './components/terminosy-condiciones/terminosy-condiciones.component';
import { TemplateFacturacionComponent } from './components/template-facturacion/template-facturacion.component';
import { TemplatePasswordRecoveryComponent } from './components/template-password-recovery/template-password-recovery.component';
import { TemplateReportComponent } from './components/template-report/template-report.component';
import { TemplateUserActivationComponent } from './components/template-user-activation/template-user-activation.component';
import { BasicReportComponent } from './components/basic-report/basic-report.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { AvisoCookiesComponent } from './components/aviso-cookies/aviso-cookies.component';


@NgModule({
  declarations: [
    TemplateReportComponent,
    TemplateUserActivationComponent,
    PoliticaPrivacidadComponent,
    AvisoCookiesComponent,
    TemplatePasswordRecoveryComponent,
    TemplateFacturacionComponent,
    TerminosyCondicionesComponent,
    DialogCuponesComponent,
    ReenviarClaveComponent,
    ForgotpassComponent,
    CuponesComponent,
    AdministracionComponent,
    DatosfacturacionComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    AvaluoComponent,
    AppComponent,
    LandingComponent,
    BasicReportComponent,
    SafePipe,
    LoginComponent,
    RegisterComponent,
    TerminosComponent,
    ActivacionComponent,
    ReenviarComponent,
    PagoConTarjetaComponent,
    RestablecerComponent,
    PoliticaprivacidadComponent,
    AvisocookiesComponent,
    ReporteComponent,
    BasicReportFakeComponent,
    ReporteFakeComponent,
    ShortNumberPipe
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
    SplitButtonModule,
    MatCheckboxModule,
    ButtonModule,
    TabViewModule,
    MatSnackBarModule,
    SelectButtonModule,
    CheckboxModule,
    ProgressBarModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatTabsModule,
    MatTableModule,
    DropdownModule,
    ChartModule,
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
    MessageService,
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
