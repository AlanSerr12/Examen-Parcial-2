import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { EstudiantesComponent } from './views/estudiantes/estudiantes.component';
import { NuevoEstudianteComponent } from './views/estudiantes/nuevo-estudiante/nuevo-estudiante.component';
import { calificacionesComponent } from './views/calificaciones/calificaciones.component';
import { NuevaCalificacionComponent } from './views/calificaciones/nueva-calificacion/nueva-calificacion.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'nuevo-estudiante', component: NuevoEstudianteComponent },
  { path: 'editar-estudiante/:id', component: NuevoEstudianteComponent },
  { path: 'calificaciones', component: calificacionesComponent },
  { path: 'nueva-calificacion', component: NuevaCalificacionComponent },
  { path: 'editar-calificacion/:id', component: NuevaCalificacionComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
