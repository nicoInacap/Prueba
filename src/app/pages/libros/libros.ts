import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libros, LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class LibrosComponent implements OnInit {
  li: Libros[] = [];
  libroNuevo: Libros = {
    titulo: '',
    id_autor: ''
  };
  modoEdicion = false;
  idLibroEditando: number | null = null;

  constructor(private librosSrv: LibrosService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.librosSrv.obtenerLibros().subscribe({
      next: (data: Libros[]) => {
        this.li = data;
      },
      error: (err: any) => {
        console.error('Error al cargar el libro:', err);
      }
    });
  }

  guardarLibros(): void {
    if (this.modoEdicion && this.idLibroEditando != null) {
      // Actualizar usuario existente
      this.librosSrv
        .editarLibros(this.idLibroEditando, this.libroNuevo)
        .subscribe(() => {
          this.cargarLibros();
          this.resetFormulario();
        });
    } else {
      // Crear nuevo usuario
      this.librosSrv
        .crearLibros(this.libroNuevo)
        .subscribe(() => {
          this.cargarLibros();
          this.resetFormulario();
        });
    }
  }

  editarLibros(libro: Libros): void {
    this.modoEdicion = true;
    this.idLibroEditando = libro.id ?? null;
    this.libroNuevo = { ...libro };
  }

  eliminarLibros(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.librosSrv.eliminarLibros(id).subscribe(() => {
        this.cargarLibros();
      });
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idLibroEditando = null;
    this.libroNuevo = {
      titulo: '',
      id_autor: ''
    };
  }
}
