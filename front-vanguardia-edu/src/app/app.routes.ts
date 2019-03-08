

import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { RegisterComponent } from './login/register.component';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { CitaComponent } from './cita/cita.component';
import { PlanesComponent } from './planes/planes.component';
import { PlanComponent } from './planes/plan.component';
import { BolsasComponent } from './bolsas/bolsas.component';
import { BolsaComponent } from './bolsas/bolsa.component';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'autenticado', component: AutenticadoComponent },
    { path: 'carreras/:id', component: CarrerasComponent },
    { path: 'cita/:id', component: CitaComponent },
    { path: 'planes', component: PlanesComponent },
    { path: 'mantenimiento/plan/:id', component: PlanComponent },
    { path: 'bolsas', component: BolsasComponent },
    { path: 'mantenimiento/bolsa/:bolsa/:id', component: BolsaComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
