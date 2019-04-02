import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../services/carrera.service';

import swal from 'sweetalert';
import { Bolsa } from '../models/bolsa.model';

@Component({
  selector: 'app-crear-bolsa',
  templateUrl: './crear-bolsa.component.html',
  styleUrls: ['./crear-bolsa.component.css']
})
export class CrearBolsaComponent implements OnInit {

  forma: FormGroup;
  constructor(public carreraServ: CarreraService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      bolsa: new FormControl('', Validators.required)
    });
  }

  crearBolsa() {
    if (this.forma.invalid) {
      return;
    }

    const bolsa = new Bolsa(
      this.forma.value.nombre,
      this.forma.value.bolsa
    );

    this.carreraServ.crearBolsa(bolsa).subscribe(resp => {
      console.log(resp);
      swal('Bolsa Creada!', 'Todo Bien', 'success');
    });
  }

}
