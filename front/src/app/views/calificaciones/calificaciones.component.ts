import { Component } from '@angular/core';
import { ICalificaciones } from '../../Interfaces/icalificaciones';
import { CalificacionesService } from '../../Services/Calificaciones.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.css',
})
export class calificacionesComponent {
  title = 'Calificaciones';
  calificaciones: ICalificaciones[] = [];

  constructor(private calificacionesService: CalificacionesService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.calificacionesService.todos().subscribe((listacalificaciones) => {
      this.calificaciones = listacalificaciones;
      console.log(listacalificaciones);
    });
  }
  alerta() {
    Swal.fire('calificaciones', 'Mensaje en calificaciones', 'success');
  }

  eliminar(ID_calificacion: number) {
    Swal.fire({
      title: 'calificaciones',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.calificacionesService
          .eliminar(ID_calificacion)
          .subscribe((datos) => {
            this.cargaTabla();
            Swal.fire({
              title: 'calificaciones',
              text: 'Se eliminó con éxito el registro',
              icon: 'success',
            });
          });
      } else {
        Swal.fire({
          title: 'calificaciones',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
