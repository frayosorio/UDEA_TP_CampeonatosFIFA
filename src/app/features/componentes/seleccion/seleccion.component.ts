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
  private seleccionEscogida: Seleccion | undefined;
  private indiceSeleccionEscogida: number = -1;
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

  public escoger(evt: any) {
    if (evt.type == "click") {
      this.seleccionEscogida = evt.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
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
    if (this.textBusqueda) {
      this.seleccionServicio.buscar(this.textBusqueda).subscribe({
        next: respuesta => {
          this.selecciones = respuesta;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogoEdicion = this.dialogServicio.open(SeleccionEditarComponent, {
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

    dialogoEdicion.afterClosed().subscribe({
      next: data => {
        if (data) {
          this.seleccionServicio.agregar(data.seleccion).subscribe({
            next: respuesta => {
              this.seleccionServicio.buscar(respuesta.nombre).subscribe({
                next: respuesta => {
                  this.selecciones = respuesta;
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
      },
      error: error => {
        window.alert(error.message);
      }
    });

  }

  public modificar() {
    if (this.seleccionEscogida) {
      const dialogoEdicion = this.dialogServicio.open(SeleccionEditarComponent, {
        width: "500px",
        height: "300px",
        disableClose: true,
        data: {
          encabezado: `Modificando la Selección ${this.seleccionEscogida?.nombre}`,
          seleccion: this.seleccionEscogida
        }
      });

      dialogoEdicion.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.seleccionServicio.modificar(data.seleccion).subscribe({
              next: respuesta => {
                this.selecciones[this.indiceSeleccionEscogida] = respuesta;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });

    }
    else {
      window.alert("Debe escoger una Selección");
    }
  }

  public verificarEliminar() {

  }

}
