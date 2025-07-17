import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Autores {
  id_autor?: number;
  nombre: string;
  nacionalidad: string;
}
@Injectable({
  providedIn: "root"
})
export class AutoresService {
  private apiUrl = "https://apiclases.inacode.cl/biblioteca/autores";

  constructor(private http: HttpClient) {}

  obtenerAutores(): Observable<Autores[]> {
    return this.http.get<Autores[]>(this.apiUrl);
  }

  crearAutores(autor: Autores): Observable<any> {
    return this.http.post(this.apiUrl, autor);
  }

  actualizarAutores(id: number, autor: Autores): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, autor);
  }

  eliminarAutores(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
