import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../services/carrera.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Carrera } from '../models/carrera.model';

import { Bolsa } from '../models/bolsa.model';

import { ArchivoService } from '../services/archivo.service';

import { saveAs } from 'file-saver';



@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  public id;
  carreraBd: any;
  bolsa: any;
  nombre: string;
  bolsaPath: string;

  constructor(public carreraServ: CarreraService,
    public router: Router, public actRoute: ActivatedRoute,
    public archivoServ: ArchivoService) { }

  ngOnInit() {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.traerCarrera();
    this.obtenerBolsas();
    console.log(this.bolsa.bolsas.nombre);

  }

  traerCarrera() {

    try {
      const traerCarrera = this.carreraServ.getCarrera(this.id);
      console.log(this.id);

      traerCarrera.subscribe(
        (resp: any) => {
          console.log(resp);
          this.carreraBd = resp.carrera;
        });
      console.log(this.carreraBd);
    } catch (error) {
      console.log(error);

    }
  }

  traerPlanEstudios(carrera) {

    try {
      const traerPlan = this.archivoServ.getPlan(carrera.nombre, carrera.plan);
      const fileName = 'http://localhost:3000/' + carrera.nombre + '/' + carrera.plan;

      console.log(this.id);

      traerPlan.subscribe(
        (resp: any) => {
          console.log(resp);
          saveAs(resp, fileName);
        });
    } catch (error) {
      console.log(error);

    }
  }

  obtenerBolsas() {
    try {
      const getBol = this.archivoServ.obtenerBolsas();

      getBol.subscribe((resp: any) => {
        console.log(resp.bolsas[0].nombre);
        for (const index of resp.bolsas) {
          console.log(index);
          if (index.nombre === this.carreraBd.nombre) {
            this.bolsa = index;
            this.nombre = index.nombre;
            this.bolsaPath = index.bolsa;
            console.log(this.bolsaPath);
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  traerBolsa() {

    try {
      const traerBolsa = this.archivoServ.getBolsa(this.nombre, this.bolsaPath);
      const fileName = 'http://localhost:3000/bolsas/' + this.nombre + '/' + this.bolsaPath;

      traerBolsa.subscribe(
        (resp: any) => {
          console.log(resp);
          saveAs(resp, fileName);
        });
    } catch (error) {
      console.log(error);

    }

  }



}
