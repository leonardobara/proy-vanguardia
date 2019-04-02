
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// import swal from "sweetalert";
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
    // tslint:disable-next-line:quotemark
    providedIn: "root"
})
export class UsuarioService {

    public identity;

    private urlLogin = 'http://localhost:3000/login';
    private urlAlumno = 'http://localhost:3000/usuario';

    constructor(private http: HttpClient, public router: Router) { }


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

    logout() {

        this.identity = null;
        localStorage.removeItem('identity');

        this.router.navigate(['/login']);

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

    postAlumno(usuario: Usuario): Observable<any> {
        return this.http.post(this.urlAlumno, usuario).pipe(
            map((resp: any) => {
                return resp;
            }),
            catchError((e: any) => throwError(e))
        );
    }

    getAlumno(id: string) {
        return this.http.get(this.urlAlumno + '/' + id).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }


}
