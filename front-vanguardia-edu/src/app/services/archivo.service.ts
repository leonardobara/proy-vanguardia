import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private urlArchivos = 'http://localhost:3000/';
  private urlBolsas = 'http://localhost:3000/bolsa';
  constructor(public http: HttpClient) { }


  getPlan(carrera: string, nombreArc: string) {



    return this.http.get(this.urlArchivos + 'planes/' + carrera + '/' + nombreArc, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((e: any) => throwError(e))
    );
  }


  obtenerBolsas() {
    const get = this.http.get(this.urlBolsas);

    return get;
  }

  getBolsa(bolsa: string, nombreArc: string) {



    return this.http.get(this.urlArchivos + 'bolsas/' + bolsa + '/' + nombreArc, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((e: any) => throwError(e))
    );
  }

  getBolsaAlumno(nombreArc: string) {

    return this.http.get(this.urlArchivos + 'request/todas/' + nombreArc, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(
      map((resp: any) => {
        return resp;
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
