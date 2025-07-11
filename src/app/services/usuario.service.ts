import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuarios {
  id_usuario?: number;
  nombre: string;
  correo: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  crearUsuarios(cliente: Usuarios): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  actualizarUsuarios(id: number, cliente: Usuarios): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarUsuarios(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
