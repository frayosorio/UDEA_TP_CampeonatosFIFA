import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from './shared/modulos/referencias-material.module';
import { MenuPrincipalComponent } from "./features/componentes/menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuPrincipalComponent,
    ReferenciasMaterialModule,
    MenuPrincipalComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampeonatosFifa';
}
