import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id_cliente?: number;
  nombre: string;
  correo: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/libros';

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}