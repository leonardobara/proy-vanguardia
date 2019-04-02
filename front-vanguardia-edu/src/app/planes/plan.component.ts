import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../services/subir-archivo.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  public identity;
  imagenSubir: File;
  imagenTemp: string;
  public carrera: string;

  constructor(public http: HttpClient, public subirServ: SubirArchivoService, public router: Router, public actRoute: ActivatedRoute) {
    this.carrera = this.actRoute.snapshot.paramMap.get('id');
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

    this.subirServ.subirArchivoPlan(this.imagenSubir, this.carrera);
    swal('Plan Actualizado!', 'Todo Bien', 'success');

  }

}
