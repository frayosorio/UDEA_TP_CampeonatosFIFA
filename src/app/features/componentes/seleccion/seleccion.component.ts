import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Selección", prop: "nombre" },
    { name: "Entidad dirigente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private servicio: SeleccionService) {
    this.listar()
  }

  listar() {
    this.servicio.listar().subscribe({
      next: response => {
        this.selecciones = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  buscar() {

  }

  agregar() {

  }

  modificar() {

  }

  verificarEliminar() {

  }

}
