import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EstudiantesService } from '../../../Services/Estudiantes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-estudiante.component.html',
  styleUrl: './nuevo-estudiante.component.css',
})
export class NuevoEstudianteComponent {
  title = '';
  id!: number;

  provedor: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Curso: new FormControl('', Validators.required),
    GPA: new FormControl('', Validators.required),
  });
  constructor(
    private estudianteServicio: EstudiantesService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo estudiante';
    } else {
      this.title = 'Actualizar estudiante';
      this.estudianteServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          Nombre: res.Nombre,
          Edad: res.Edad,
          Curso: res.Curso,
          GPA: res.GPA,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  grabar() {
    Swal.fire({
      title: 'estudiantes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.estudianteServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'estudiantes',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/estudiantes']);
              this.id = 0;
            });
        } else {
          this.estudianteServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'estudiantes',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/estudiantes']);
              this.id = 0;
            });
        }
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
