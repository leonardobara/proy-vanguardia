import { Component, OnInit } from '@angular/core';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../services/carrera.service';
import { Bolsa } from '../models/bolsa.model';

@Component({
  selector: 'app-bolsas',
  templateUrl: './bolsas.component.html',
  styleUrls: ['./bolsas.component.css']
})
export class BolsasComponent implements OnInit {

  bolsas: Bolsa[] = [];
  constructor(private carreraServ: CarreraService) { }

  ngOnInit() {
    this.onLoadBolsas();
  }

  onLoadBolsas() {
    try {
      const getBol = this.carreraServ.getBolsas();

      getBol.subscribe((resp: any) => {
        console.log(resp);
        for (let index = 0; index < resp.bolsas.length; index++) {
          this.bolsas[index] = resp.bolsas[index];
        }
      });
      console.log(this.bolsas);
    } catch (error) {
      console.log(error);
    }
  }

}
