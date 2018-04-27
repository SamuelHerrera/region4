import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
/** */
import { MatTableModule } from '@angular/material/table';

//Prime ng components
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
import { ProgressBarModule } from 'primeng/progressbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RoutingModule } from './router/routing.module';
import { ActivacionUsuarioComponent } from './components/activacion-usuario/activacion-usuario.component';
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
import { ClientService } from './services/client.service';
import { ObservablesService } from './services/observables.service';
import { YalsService } from './services/yals.service';
import { PagofacilService } from './services/pagofacil.service';
import { Paso1Component } from './components/paso-1/paso-1.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common/src/common_module';
import { DatosfacturacionComponent } from './components/datosfacturacion/datosfacturacion.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { AuthGuard } from './guards/auth.guard';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CuponesComponent } from './components/cupones/cupones.component';
import { MailService } from './services/mail.service';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ReenviarClaveComponent } from './components/reenviar-clave/reenviar-clave.component';
import { DialogCuponesComponent } from './components/dialog-cupones/dialog-cupones.component';
import { CuponService } from './services/cupon.service';
import { TerminosyCondicionesComponent } from './components/terminosy-condiciones/terminosy-condiciones.component';
import { TemplateFacturacionComponent } from './components/template-facturacion/template-facturacion.component';
import { TemplatePasswordRecoveryComponent } from './components/template-password-recovery/template-password-recovery.component';
import { TemplateReportComponent } from './components/template-report/template-report.component';
import { TemplateUserActivationComponent } from './components/template-user-activation/template-user-activation.component';
import { IsSecureGuard } from './guards/is-secure-guard.guard';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { ReporteFakeComponent } from './components/reporte-fake/reporte-fake.component';
import { BasicReportComponent } from './components/basic-report/basic-report.component';
import { BasicReportFakeComponent } from './components/basic-report-fake/basic-report-fake.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivacionUsuarioComponent,
    AvaluoEnviadoComponent,
    AvaluoComponent,
    ContrasenaActivadaComponent,
    EnvioAvaluoComponent,
    InicioDeSesionComponent,
    MapaComponent,
    Mapa2Component,
    OlvideContrasenaComponent,
    PagoConTarjetaComponent,
    Paso2Component,
    Paso3Component,
    RegistroComponent,
    RestablecerContrasenaComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    Paso1Component,
    DatosfacturacionComponent,
    ReporteComponent,
    AdministracionComponent,
    CuponesComponent,
    ForgotpassComponent,
    ReenviarClaveComponent,
    DialogCuponesComponent,
    TerminosyCondicionesComponent,
    TemplateFacturacionComponent,
    TemplatePasswordRecoveryComponent,
    TemplateReportComponent,
    TemplateUserActivationComponent,
    ShortNumberPipe,
    ReporteFakeComponent,
    BasicReportComponent,
    BasicReportFakeComponent
  ],
  imports: [
    HttpClientModule,
    RoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    MatFormFieldModule,
    DropdownModule,
    GrowlModule,
    CheckboxModule,
    DialogModule,
    SelectButtonModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    TabViewModule,
    MatInputModule,
    ChartModule,
    ProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYcMrK6MOhpjQ93Cg1BeN8RkGAb5KFHhc'
    })
  ],
  providers: [AuthGuard, IsSecureGuard, PagofacilService, ClientService, MessageService, ObservablesService, YalsService, MailService, CuponService],
  entryComponents: [DialogCuponesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  //Awesomeness
}
