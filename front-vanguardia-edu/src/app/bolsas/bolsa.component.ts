import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../services/subir-archivo.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})
export class BolsaComponent implements OnInit {

  public identity;
  imagenSubir: File;
  imagenTemp: string;
  public carrera: string;
  public bolsa: string;

  constructor(public http: HttpClient, public subirServ: SubirArchivoService, public router: Router, public actRoute: ActivatedRoute) {
    this.carrera = this.actRoute.snapshot.paramMap.get('bolsa');
    this.bolsa = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  seleccionImagen(arc: File) {
    if (!arc) {
      this.imagenSubir = null;
      return;
    }
    // this.imagenTemp
    this.imagenSubir = arc;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(arc);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  guardarSubida() {
    console.log(this.imagenSubir);

    this.subirServ.subirArchivoBolsa(this.imagenSubir, this.carrera, this.bolsa);
    swal('Bolsa Actualizada!', 'Todo Bien', 'success');

  }

}
