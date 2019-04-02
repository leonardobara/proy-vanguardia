import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// import swal from "sweetalert";
import { Cita } from '../models/cita.model';

@Injectable({
    // tslint:disable-next-line:quotemark
    providedIn: "root"
})
export class CitaService {

    public identity;

    private urlCita = 'http://localhost:3000/cita';

    constructor(private http: HttpClient) { }


    agendarCita(cita: Cita, id: string): Observable<any> {

        return this.http.post(this.urlCita + '/' + id, cita)
            .pipe(
                map((resp: any) => {
                    return resp.fecha;
                }),
                catchError((e: any) => throwError(e))
            );
    }

}
