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
}
