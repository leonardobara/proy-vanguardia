
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// import swal from "sweetalert";
import { Usuario } from '../models/usuario.model';

@Injectable({
    // tslint:disable-next-line:quotemark
    providedIn: "root"
})
export class UsuarioService {

    public identity;

    private urlLogin = 'http://localhost:3000/login';
    private urlAlumno = 'http://localhost:3000/usuario';

    constructor(private http: HttpClient) { }


    login(usuario: Usuario) {

        return this.http.post(this.urlLogin, usuario)
            .pipe(
                map((resp: any) => {
                    localStorage.setItem('identity', JSON.stringify(resp.usuario));
                    return resp;

                }),
                catchError((e: any) => throwError(e))
            );
    }

    getIdentity() {
        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getAlumno(id: string) {
        return this.http.get(this.urlAlumno + '/' + id).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }


}
