import { Component,OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Prestamos, PrestamosService } from "../../services/prestamos.service";

@Component({
  selector: "app-prestamos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./prestamos.html",
  styleUrl: "./prestamos.css"
})
export class PrestamosComponent implements OnInit {
  prestamos: Prestamos[] = [];
  prestamoNuevo: Prestamos = {
    id_libro: '',
    id_usuario: '',
    fecha_prestamo: '',
    fecha_devolucion: ''
  };
  modoEdicion = false;
  idPrestamoEditando: number | null = null;

  constructor(private prestamosSrv: PrestamosService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.prestamosSrv.obtenerPrestamos().subscribe({
      next: (data: Prestamos[]) => {
        this.prestamos = data;
      },
      error: (err: any) => {
        console.error('Error al cargar los préstamos:', err);
      }
    });
  }

  guardarPrestamos(): void {
    if (this.modoEdicion && this.idPrestamoEditando != null) {
      // Actualizar préstamo existente
      this.prestamosSrv
        .editarPrestamos(this.idPrestamoEditando, this.prestamoNuevo)
        .subscribe(() => {
          this.cargarPrestamos();
          this.resetFormulario();
        });
    } else {
      // Crear nuevo préstamo
      this.prestamosSrv
        .crearPrestamos(this.prestamoNuevo)
        .subscribe(() => {
          this.cargarPrestamos();
          this.resetFormulario();
        });
    }
  }

  editarPrestamos(prestamo: Prestamos): void {
    this.modoEdicion = true;
    this.idPrestamoEditando = prestamo.id ?? null;
    this.prestamoNuevo = { ...prestamo };
  }

  eliminarPrestamos(id: number): void {
    this.prestamosSrv.eliminarPrestamos(id).subscribe(() => {
      this.cargarPrestamos();
    });
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idPrestamoEditando = null;
    this.prestamoNuevo = {
      id_libro: '',
      id_usuario: '',
      fecha_prestamo: '',
      fecha_devolucion: ''
    };
  }
}
