import { Routes } from '@angular/router';
import { libros } from './pages/libros/libros';
import { UsuariosComponent } from './pages/usuarios/usuarios';


export const routes: Routes = [
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'libros', component: libros}
];

