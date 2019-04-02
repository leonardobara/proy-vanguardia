import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { UsuarioService } from '../services/usuario.service';
import { CitaService } from '../services/cita.service';
import { SolicitudesService } from '../services/solicitudes.service';

// Models
import { Cita } from '../models/cita.model';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Solicitud } from '../models/solicitud.model';

import swal from 'sweetalert';



@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  public id;
  public idSolicitud;
  alumno: any;
  solicitud: any;
  esto: string[] = [
    'Rechazar', 'Aceptar'
  ];
  estado = '';
  forma: FormGroup;

  constructor(public usuarioServ: UsuarioService, public router: Router,
    public actRoute: ActivatedRoute, public citaServ: CitaService, public solicitudServ: SolicitudesService) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.idSolicitud = this.actRoute.snapshot.paramMap.get('solicitud');
    this.traerAlumno();
    this.forma = new FormGroup({
      fecha: new FormControl('', Validators.required)
    });
    this.traerSolicitud();
    console.log(this.esto);

  }


  traerAlumno() {

    try {
      const traerAlumno = this.usuarioServ.getAlumno(this.id);
      console.log(traerAlumno);

      traerAlumno.subscribe(
        (resp: any) => {
          console.log(resp);
          this.alumno = resp.usuario;
        });
      console.log(this.alumno);
    } catch (error) {
      console.log(error);

    }
  }

  traerSolicitud() {

    try {
      const traerSolicitud = this.solicitudServ.getSolicitud(this.idSolicitud);
      console.log(traerSolicitud);

      traerSolicitud.subscribe(
        (resp: any) => {
          console.log(resp);
          this.solicitud = resp.solicitud;
        });
      console.log(this.solicitud);
    } catch (error) {
      console.log(error);

    }
  }

  citar() {
    if (this.forma.invalid) {
      return;
    }

    const cita = new Cita(
      this.forma.value.fecha
    );

    this.citaServ.agendarCita(cita, this.id).subscribe((resp: any) => {
      swal('Cita agendada!', 'Todo Bien', 'success');
      console.log(resp);
    });
  }

  onBack() {
    this.router.navigate(['/autenticado']);
  }

  cambioEstado(value) {
    console.log(value);
    this.estado = value;
  }

}
