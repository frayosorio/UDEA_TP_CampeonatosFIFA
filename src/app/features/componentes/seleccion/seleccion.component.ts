import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
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

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Selección", prop: "nombre" },
    { name: "Entidad dirigente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  private seleccionEscogida: Seleccion | undefined;

  constructor(private servicio: SeleccionService,
    private servicioDialogo: MatDialog
  ) {
    this.listar()
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
    }
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
    const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
      width: "400px",
      height: "300px",
      data: {
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        },
        encabezado: "Agregando Selección de Fútbol"
      },
      disableClose: true,
    });

    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicio.agregar(datos.seleccion).subscribe({
            next: response => {
              this.servicio.buscar(datos.seleccion.nombre).subscribe({
                next: response => {
                  this.selecciones = response;
                },
                error: error => {
                  window.alert(error.message);
                }
              });
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      }
    });
  }

  modificar() {
    if (this.seleccionEscogida) {
      const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
        width: "400px",
        height: "300px",
        data: {
          seleccion: this.seleccionEscogida,
          encabezado: `Editando la Selección de Fútbol [${this.seleccionEscogida.nombre}]`
        },
        disableClose: true,
      });
    }
    else {
      window.alert("Debe escoger una Selección para la operación");
    }
  }

  verificarEliminar() {

  }

}
