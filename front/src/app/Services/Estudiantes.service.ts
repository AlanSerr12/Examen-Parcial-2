import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstudiantes } from '../Interfaces/iestudiantes';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private urlBase: string = environment.URL + 'Estudiantes.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IEstudiantes[]> {
    return this.clientePhp.get<IEstudiantes[]>(this.urlBase + 'todos');
  }

  uno(id: number): Observable<IEstudiantes> {
    var estudiantes = new FormData();
    estudiantes.append('ID_estudiante', id.toString());
    return this.clientePhp.post<IEstudiantes>(
      this.urlBase + 'uno',
      estudiantes
    );
  }

  insertar(estudiantes: IEstudiantes): Observable<any> {
    var est = new FormData();
    est.append('Nombre', estudiantes.Nombre);
    est.append('Edad', estudiantes.Edad.toString());
    est.append('Curso', estudiantes.Curso);
    est.append('GPA', estudiantes.GPA);
    return this.clientePhp.post(this.urlBase + 'insertar', est);
  }

  actualizar(estudiantes: IEstudiantes, id: number): Observable<any> {
    var est = new FormData();
    est.append('ID_estudiante', id.toString());
    est.append('Nombre', estudiantes.Nombre);
    est.append('Edad', estudiantes.Edad.toString());
    est.append('Curso', estudiantes.Curso);
    est.append('GPA', estudiantes.GPA);
    return this.clientePhp.post(this.urlBase + 'actualizar', est);
  }

  eliminar(id: number): Observable<any> {
    var cli = new FormData();
    cli.append('ID_estudiante', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', cli);
  }
}
