import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  public identity;
  constructor(public http: HttpClient) {

  }

  subirArchivo(arc: File, alumno: string) {

    const url = 'http://localhost:3000' + '/upload3/' + alumno;

    const formData = new FormData();
    formData.append('pdf', arc, arc.name);
    this.http.post(url, formData).subscribe();

  }
  subirArchivoPlan(arc: File, carrera: string) {

    const url = 'http://localhost:3000' + '/upload/' + carrera;

    const formData = new FormData();
    formData.append('pdf', arc, arc.name);
    this.http.put(url, formData).subscribe();

  }
  subirArchivoBolsa(arc: File, carrera: string, bolsa: string) {

    const url = 'http://localhost:3000' + '/upload2/' + carrera + '/' + bolsa;

    const formData = new FormData();
    formData.append('pdf', arc, arc.name);
    this.http.put(url, formData).subscribe();

  }
}
