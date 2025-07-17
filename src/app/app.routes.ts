import { Routes } from '@angular/router';
import { LibrosComponent } from './pages/libros/libros';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { PrestamosComponent } from './pages/prestamos/prestamos';
import { AutoresComponent } from './pages/autores/autores';


export const routes: Routes = [
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'libros', component: LibrosComponent},
    {path: 'autores', component: AutoresComponent},
    {path: 'prestamos', component: PrestamosComponent}
];

