import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../services/usuario.service';
import { CarreraService } from '../services/carrera.service';
import { SubirArchivoService } from '../services/subir-archivo.service';
import { SolicitudesService } from '../services/solicitudes.service';
import { ArchivoService } from '../services/archivo.service';

import { HttpClient } from '@angular/common/http';

// Modelos
import { Carrera } from '../models/carrera.model';
import { Solicitud } from '../models/solicitud.model';

import { saveAs } from 'file-saver';


@Component({
  selector: 'app-autenticado',
  templateUrl: './autenticado.component.html',
  styleUrls: ['./autenticado.component.css']
})
export class AutenticadoComponent implements OnInit {


  public title: string;
  public identity;
  carreras: Carrera[] = [];
  solicitudes: Solicitud[] = [];
  imagenSubir: File;
  imagenTemp: string;

  constructor(public usuarioServ: UsuarioService, public carreraServ: CarreraService,
    public http: HttpClient, public subirServ: SubirArchivoService, public solicitudServ: SolicitudesService,
    public archivoServ: ArchivoService) {
    this.identity = usuarioServ.getIdentity();

  }


  ngOnInit() {
    this.title = 'Te has logueado exitosamente!';
    /* this.obtenerCarreras();
    console.log(this.carreras); */
    this.obtenerSolicitudes();
    console.log(this.solicitudes);

  }

  obtenerCarreras() {
    try {
      const getCarreras = this.carreraServ.getCarreras();

      getCarreras.subscribe((resp: any) => {
        console.log(resp);
        for (let index = 0; index < resp.length; index++) {
          this.carreras[index] = resp[index];
        }
      });

    } catch (error) {
      console.log(error);
    }
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

    this.subirServ.subirArchivo(this.imagenSubir, this.identity._id);

  }

  obtenerSolicitudes() {
    try {
      const getSolicitudes = this.solicitudServ.getSolicitudes();

      getSolicitudes.subscribe((resp: any) => {
        console.log(resp);
        for (let index = 0; index < resp.solicitud.length; index++) {
          this.solicitudes[index] = resp.solicitud[index];
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  obtenerArchivoSolicitud(solicitud) {
    try {
      const traerBolsaAlumno = this.archivoServ.getBolsaAlumno(solicitud.bolsa);
      const fileName = 'http://localhost:3000/solicitudes/todas/' + solicitud.bolsa;

      console.log(solicitud);

      traerBolsaAlumno.subscribe(
        (resp: any) => {
          console.log(resp);
          saveAs(resp, fileName);
        });
    } catch (error) {
      console.log(error);

    }
  }


}
