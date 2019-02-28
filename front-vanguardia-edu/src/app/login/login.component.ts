import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioServ: UsuarioService) {

    this.usuario = new Usuario(null, '', '');

  }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {

    // const usuario = new Usuario(null, forma.value.email, forma.value.password);
    console.log(forma);

    this.usuarioServ.login(this.usuario)
      .subscribe((resp: any) => {
        console.log(resp);
        this.router.navigate(['/autenticado']);
      });


  }

}


