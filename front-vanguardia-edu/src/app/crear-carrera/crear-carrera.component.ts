import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../services/carrera.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.css']
})
export class CrearCarreraComponent implements OnInit {

  forma: FormGroup;

  constructor(public carreraServ: CarreraService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      plan: new FormControl('', Validators.required)
    });
  }

  crearCarrera() {
    if (this.forma.invalid) {
      return;
    }

    const carrera = new Carrera(
      this.forma.value.nombre,
      this.forma.value.descripcion,
      this.forma.value.plan
    );

    this.carreraServ.crearCarrera(carrera).subscribe(resp => {
      console.log(resp);
      swal('Carrera Creada!', 'Todo Bien', 'success');
    });
  }

}
