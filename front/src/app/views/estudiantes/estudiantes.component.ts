import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IEstudiantes } from '../../Interfaces/iestudiantes';
import { EstudiantesService } from '../../Services/Estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
})
export class EstudiantesComponent {
  title = 'Estudiantes';
  estudiantes: IEstudiantes[];

  constructor(private estudianteservice: EstudiantesService) {}

  ngOnInit() {
    this.cargaestudiantes();
  }

  cargaestudiantes() {
    this.estudianteservice.todos().subscribe((listaestudiantes) => {
      this.estudiantes = listaestudiantes;
      console.log(listaestudiantes);
    });
  }

  alerta() {
    Swal.fire('estudiantes', 'Mensaje en estudiantes', 'success');
  }

  eliminar(ID_cliente: number) {
    Swal.fire({
      title: 'estudiantes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteservice.eliminar(ID_cliente).subscribe((datos) => {
          this.cargaestudiantes();
          Swal.fire({
            title: 'estudiantes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'estudiantes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
