import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// import swal from "sweetalert";

@Injectable({
    // tslint:disable-next-line:quotemark
    providedIn: "root"
})
export class SolicitudesService {

    public identity;

    private urlSolicitud = 'http://localhost:3000/solicitud';

    constructor(private http: HttpClient) { }

    getSolicitudes() {
        const get = this.http.get(this.urlSolicitud);
        return get;
    }

    getSolicitud(id: string) {
        return this.http.get(this.urlSolicitud + '/' + id).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }


}
