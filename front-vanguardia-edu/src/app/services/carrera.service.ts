import { Carrera } from './../models/carrera.model';

import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// import swal from "sweetalert";

@Injectable({
  // tslint:disable-next-line:quotemark
  providedIn: "root"
})
export class CarreraService {
  private urlCarrera = 'http://localhost:3000/carrera';
  constructor(private http: HttpClient) { }

  getCarreras() {
    const get = this.http.get(this.urlCarrera);

    return get;
  }

  getCarrera(id: string) {
    return this.http.get(this.urlCarrera + '/' + id).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  crearCarrera(carrera: Carrera): Observable<any> {
    return this.http.post(this.urlCarrera, carrera).pipe(
      map((resp: any) => {
        return resp.nombre;
      }),
      catchError((e: any) => throwError(e))
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
