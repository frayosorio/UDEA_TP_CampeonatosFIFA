import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

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

  public textBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Selección de Fútbol", prop: "nombre" },
    { name: "Entidad gestora", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private seleccionServicio: SeleccionService,
    private dialogServicio: MatDialog) {
    this.listar();


  }

  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: respuesta => {
        this.selecciones = respuesta;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public buscar() {

  }

  public agregar() {
    this.dialogServicio.open(SeleccionEditarComponent, {
      width: "500px",
      height: "300px",
      disableClose: true,
      data: {
        encabezado: "Agregando nueva Selección de Fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      }
    });
  }

  public modificar() {

  }

  public verificarEliminar() {

  }

}
