import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from './app.routes';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Components
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register.component';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { LoginComponent } from './login/login.component';
import { CarrerasComponent } from './carreras/carreras.component';

// Services
import { CarreraService } from './services/carrera.service';
import { ArchivoService } from './services/archivo.service';
import { UsuarioService } from './services/usuario.service';
import { SubirArchivoService } from './services/subir-archivo.service';
import { SolicitudesService } from './services/solicitudes.service';
import { CitaComponent } from './cita/cita.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CarrerasComponent,
    RegisterComponent,
    AutenticadoComponent,
    CitaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    FileUploadModule
  ],
  providers: [CarreraService, ArchivoService, UsuarioService, SubirArchivoService, SolicitudesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
