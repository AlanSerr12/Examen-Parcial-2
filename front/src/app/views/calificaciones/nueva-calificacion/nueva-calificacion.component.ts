import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CalificacionesService } from '../../../Services/Calificaciones.service';
import Swal from 'sweetalert2';
import { IEstudiantes } from '../../../Interfaces/iestudiantes';
import { EstudiantesService } from '../../../Services/Estudiantes.service';
@Component({
  selector: 'app-nueva-calificacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nueva-calificacion.component.html',
  styleUrl: './nueva-calificacion.component.css',
})
export class NuevaCalificacionComponent {
  title = '';
  id!: number;
  listaEstudiantes: IEstudiantes[] = [];

  provedor: FormGroup = new FormGroup({
    ID_estudiante: new FormControl('', Validators.required),
    Materia: new FormControl('', Validators.required),
    Nota: new FormControl('', Validators.required),
  });
  constructor(
    private calificacionesServicio: CalificacionesService,
    private estudianteService: EstudiantesService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargaClientes();
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nueva Asignatura';
    } else {
      this.title = 'Actualizar Asignatura';
      this.calificacionesServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          ID_estudiante: res.ID_estudiante,
          Materia: res.Materia,
          Nota: res.Nota,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  cargaClientes() {
    this.estudianteService.todos().subscribe((res) => {
      this.listaEstudiantes = res;
    });
  }

  grabar() {
    Swal.fire({
      title: 'calificaciones',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.calificacionesServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'calificaciones',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/calificaciones']);
              this.id = 0;
            });
        } else {
          this.calificacionesServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'calificaciones',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/calificaciones']);
              this.id = 0;
            });
        }
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
