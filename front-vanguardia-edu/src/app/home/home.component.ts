import { Component, OnInit } from '@angular/core';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../services/carrera.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pageTitle = 'Bienvenidos a Colegio System';

  carreras: Carrera[] = [];

  forma: FormGroup;

  constructor(private carreraServ: CarreraService) { }

  ngOnInit() {
    this.onLoadCarreras();
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      plan: new FormControl('', Validators.required)
    });

    console.log(this.carreras);
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
    });
  }

  onLoadCarreras() {
    try {
      const getCarr = this.carreraServ.getCarreras();

      getCarr.subscribe((resp: any) => {
        console.log(resp);
        for (let index = 0; index < resp.length; index++) {
          this.carreras[index] = resp[index];
        }
      });
      console.log(this.carreras);
    } catch (error) {
      console.log(error);
    }
  }
}
