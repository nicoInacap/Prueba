import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libros {
  id?: number;
  titulo: string;
  id_autor: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/libros';

  constructor(private http: HttpClient) {}

  obtenerLibros(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.apiUrl);
  }

  crearLibros(usr: Libros): Observable<any> {
    return this.http.post(this.apiUrl, usr);
  }

  editarLibros(id: number, usr: Libros): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usr);
  }

  eliminarLibros(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
