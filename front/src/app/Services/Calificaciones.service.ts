import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICalificaciones } from '../Interfaces/icalificaciones';

@Injectable({
  providedIn: 'root',
})
export class CalificacionesService {
  private urlBase: string =
    environment.URL + 'Calificaciones.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<ICalificaciones[]> {
    return this.clientePhp.get<ICalificaciones[]>(this.urlBase + 'todos');
  }
  insertar(calificacion: ICalificaciones): Observable<any> {
    var co = new FormData();
    co.append('ID_estudiante', calificacion.ID_estudiante.toString());
    co.append('Materia', calificacion.Materia);
    co.append('Nota', calificacion.Nota.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', co);
  }
  eliminar(id: number): Observable<any> {
    var co = new FormData();
    co.append('ID_calificacion', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', co);
  }
  uno(id: number): Observable<ICalificaciones> {
    var co = new FormData();
    co.append('ID_calificacion', id.toString());
    return this.clientePhp.post<ICalificaciones>(this.urlBase + 'uno', co);
  }
  actualizar(calificacion: ICalificaciones, id: number): Observable<any> {
    var co = new FormData();
    co.append('ID_calificacion', id.toString());
    co.append('ID_estudiante', calificacion.ID_estudiante.toString());
    co.append('Materia', calificacion.Materia);
    co.append('Nota', calificacion.Nota.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', co);
  }
}
