import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { CitaService } from '../services/cita.service';

import { Cita } from '../models/cita.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  public id;
  alumno: any;
  forma: FormGroup;

  constructor(public usuarioServ: UsuarioService, public router: Router,
    public actRoute: ActivatedRoute, public citaServ: CitaService) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.traerAlumno();

    this.forma = new FormGroup({
      fecha: new FormControl('', Validators.required)
    });
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

  citar() {
    if (this.forma.invalid) {
      return;
    }

    const cita = new Cita(
      this.forma.value.fecha
    );

    this.citaServ.agendarCita(cita, this.id).subscribe(resp => {
      console.log(resp);
    });
  }

  onBack() {
    this.router.navigate(['/autenticado']);
  }

}
