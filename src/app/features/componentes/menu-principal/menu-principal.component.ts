import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    RouterModule,
    NgIf,
    NgFor
  ],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  public opciones=[
    { titulo: 'Selecciones', url: 'seleccion', icono: 'assets/iconos/Seleccion.png' },
    { titulo: 'Campeonatos', url: 'campeonato', icono: 'assets/iconos/Campeonato.png' },
    { titulo: 'Estadios', url: 'estadio', icono: 'assets/iconos/Estadio.png' },
  ];

}
