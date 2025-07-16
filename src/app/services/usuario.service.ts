import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuarios {
  id?: number;
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

  crearUsuarios(usr: Usuarios): Observable<any> {
    return this.http.post(this.apiUrl, usr);
  }

  editarUsuarios(id: number, usr: Usuarios): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usr);
  }

  eliminarUsuarios(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
