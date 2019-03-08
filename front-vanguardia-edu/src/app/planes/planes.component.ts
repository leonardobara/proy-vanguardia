import { Component, OnInit } from '@angular/core';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../services/carrera.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  carreras: Carrera[] = [];
  constructor(private carreraServ: CarreraService) { }

  ngOnInit() {
    this.onLoadCarreras();
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
