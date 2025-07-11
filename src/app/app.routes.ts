import { Routes } from '@angular/router';
import { libros } from './pages/libros/libros';
import { usuarios } from './pages/usuarios/usuarios';


export const routes: Routes = [
    {path: 'usuarios', component: usuarios},
    {path: 'libros', component: libros}
];

