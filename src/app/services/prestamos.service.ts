import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Prestamos {
  id?: number;
  id_libro: string;
  id_usuario: string;
  fecha_prestamo: string;
  fecha_devolucion: string;
}
@Injectable({
  providedIn: "root"
})
export class PrestamosService {
  private apiUrl = "https://apiclases.inacode.cl/biblioteca/prestamos";

  constructor(private http: HttpClient) {}

  obtenerPrestamos(): Observable<Prestamos[]> {
    return this.http.get<Prestamos[]>(this.apiUrl);
  }

  crearPrestamos(prestamo: Prestamos): Observable<any> {
    return this.http.post(this.apiUrl, prestamo);
  }

  editarPrestamos(id: number, prestamo: Prestamos): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, prestamo);
  }

  eliminarPrestamos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
    