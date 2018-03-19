import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import {MatStepperModule} from '@angular/material/stepper';

//Prime ng components
import { MessageService } from 'primeng/components/common/messageservice';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';

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
import { PaypalComponent } from './components/paypal/paypal.component';
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
    PaypalComponent,
    RegistroComponent,
    RestablecerContrasenaComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    Paso1Component
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
    DropdownModule,
    GrowlModule,
    CheckboxModule,
    SelectButtonModule,
    MatStepperModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYcMrK6MOhpjQ93Cg1BeN8RkGAb5KFHhc'
    })
  ],
  providers: [PagofacilService, ClientService, MessageService, ObservablesService, YalsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  //Awesomeness
}
