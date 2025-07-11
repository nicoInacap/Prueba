import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuarios } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios implements OnInit {
  clientes: Usuarios[] = [];
  clienteNuevo: Usuarios = {
    nombre: '',
    correo: '',
    contraseña: ''
  };
  modoEdicion = false;
  idClienteEditando: number | null = null;

  constructor(private clienteService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerUsuarios().subscribe({
      next: data    => this.clientes = data,
      error: err    => console.error('Error al cargar clientes:', err)
    });
  }

  guardarCliente(): void {
    if (this.modoEdicion && this.idClienteEditando != null) {
      // ACTUALIZAR
      this.clienteService
        .actualizarUsuarios(this.idClienteEditando, this.clienteNuevo)
        .subscribe(() => {
          this.cargarClientes();
          this.resetFormulario();
        });
    } else {
      // CREAR NUEVO
      this.clienteService
        .crearUsuarios(this.clienteNuevo)
        .subscribe(() => {
          this.cargarClientes();
          this.resetFormulario();
        });
    }
  }

  editarCliente(cliente: Usuarios): void {
    this.modoEdicion = true;
    this.idClienteEditando = cliente.id_cliente ?? null;
    this.clienteNuevo = { ...cliente };
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarUsuarios(id).subscribe(() => {
        this.cargarClientes();
      });
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idClienteEditando = null;
    this.clienteNuevo = {
      nombre: '',
      correo: '',
      contraseña: ''
    };
  }
}
