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
    RestablecerComponent
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
    MatSelectModule
  ],
  providers: [AuthGuard,
    IsSecureGuard,
    PagofacilService,
    ClientService,
    ObservablesService,
    YalsService,
    MailService,
    CuponService],
  bootstrap: [AppComponent]
})
export class AppModule { }
