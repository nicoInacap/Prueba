import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Autores, AutoresService } from "../../services/autores.service";


@Component({
  selector: "app-autores",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./autores.html",
  styleUrl: "./autores.css"
})
export class AutoresComponent implements OnInit {
  autores: Autores[] = [];
  autorNuevo: Autores = {
    nombre: '',
    nacionalidad: ''
  };
  modoEdicion = false;
  idAutorEditando: number | null = null;

  constructor(private autoresSrv: AutoresService) {}

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.autoresSrv.obtenerAutores().subscribe({
      next: (data: Autores[]) => {
        this.autores = data;
      },
      error: (err: any) => {
        console.error('Error al cargar los autores:', err);
      }
    });
  }

  guardarAutor(): void {
    if (this.modoEdicion && this.idAutorEditando != null) {
      // Actualizar autor existente
      this.autoresSrv
        .actualizarAutores(this.idAutorEditando, this.autorNuevo)
        .subscribe(() => {
          this.cargarAutores();
          this.resetFormulario();
        });
    } else {
      // Crear nuevo autor
      this.autoresSrv
        .crearAutores(this.autorNuevo)
        .subscribe(() => {
          this.cargarAutores();
          this.resetFormulario();
        });
    }
  }

  editarAutor(autor: Autores): void {
    this.modoEdicion = true;
    this.idAutorEditando = autor.id_autor || null;
    this.autorNuevo = { ...autor }; // Clonar el autor para editar
  }

  eliminarAutor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      this.autoresSrv.eliminarAutores(id).subscribe(() => {
        this.cargarAutores();
      });
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idAutorEditando = null;
    this.autorNuevo = { nombre: '', nacionalidad: ''};
  }
}

