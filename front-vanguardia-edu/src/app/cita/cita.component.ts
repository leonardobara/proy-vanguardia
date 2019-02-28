import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  public id;
  alumno: any;

  constructor(public usuarioServ: UsuarioService, public router: Router, public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.traerAlumno();
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

}
