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
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[] = [];
  usuarioNuevo: Usuarios = {
    nombre: '',
    correo: '',
    contraseña: ''
  };
  modoEdicion = false;
  idUsuarioEditando: number | null = null;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data: Usuarios[]) => {
        this.usuarios = data;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  guardarUsuario(): void {
    if (this.modoEdicion && this.idUsuarioEditando != null) {
      // Actualizar usuario existente
      this.usuarioService
        .editarUsuarios(this.idUsuarioEditando, this.usuarioNuevo)
        .subscribe(() => {
          this.cargarUsuarios();
          this.resetFormulario();
        });
    } else {
      // Crear nuevo usuario
      this.usuarioService
        .crearUsuarios(this.usuarioNuevo)
        .subscribe(() => {
          this.cargarUsuarios();
          this.resetFormulario();
        });
    }
  }

  editarUsuario(usuario: Usuarios): void {
    this.modoEdicion = true;
    this.idUsuarioEditando = usuario.id ?? null;
    this.usuarioNuevo = { ...usuario };
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuarios(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idUsuarioEditando = null;
    this.usuarioNuevo = {
      nombre: '',
      correo: '',
      contraseña: ''
    };
  }
}
