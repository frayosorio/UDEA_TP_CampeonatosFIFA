import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Campeonato } from '../../../core/entidades/campeonato';
import { CampeonatoService } from '../../servicios/campeonato.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { SeleccionService } from '../../servicios/seleccion.service';
import { Seleccion } from '../../../core/entidades/seleccion';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {
  public textBusqueda: string = "";
  public campeonatos: Campeonato[] = [];
  public selecciones: Seleccion[] = [];
  private campeonatoEscogido: Campeonato | undefined;
  private indiceCampeonatoEscogido: number = -1;
  public columnas = [
    { name: "Campeonato", prop: "nombre" },
    { name: "Año", prop: "año" },
    { name: "País", prop: "pais.nombre" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private campeonatoServicio: CampeonatoService,
    private seleccionServicio: SeleccionService,
    private dialogServicio: MatDialog) {
    this.listar();
    this.listarSelecciones();
  }

  public escoger(evt: any) {
    if (evt.type == "click") {
      this.campeonatoEscogido = evt.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato == this.campeonatoEscogido);
    }
  }

  public listar() {
    this.campeonatoServicio.listar().subscribe({
      next: respuesta => {
        this.campeonatos = respuesta;
        this.campeonatos.map(item => { item.year = item.año; });
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public listarSelecciones() {
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
      this.campeonatoServicio.buscar(this.textBusqueda).subscribe({
        next: respuesta => {
          this.campeonatos = respuesta;
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
    const dialogoEdicion = this.dialogServicio.open(CampeonatoEditarComponent, {
      width: "500px",
      height: "400px",
      disableClose: true,
      data: {
        encabezado: "Agregando nuevo Campeonato Mundial",
        campeonato: {
          id: 0,
          nombre: "",
          año: 0,
          pais: {
            id: 0,
            nombre: "",
            entidad: ""
          }
        },
        selecciones: this.selecciones
      }
    });

    dialogoEdicion.afterClosed().subscribe({
      next: data => {
        if (data) {
          this.campeonatoServicio.agregar(data.campeonato).subscribe({
            next: respuesta => {
              this.campeonatoServicio.buscar(respuesta.nombre).subscribe({
                next: respuesta => {
                  this.campeonatos = respuesta;
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
    if (this.campeonatoEscogido) {
      const dialogoEdicion = this.dialogServicio.open(CampeonatoEditarComponent, {
        width: "500px",
        height: "400px",
        disableClose: true,
        data: {
          encabezado: `Modificando el campeonato ${this.campeonatoEscogido?.nombre}`,
          campeonato: this.campeonatoEscogido,
          selecciones: this.selecciones
        }
      });

      dialogoEdicion.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.campeonatoServicio.modificar(data.campeonato).subscribe({
              next: respuesta => {
                this.campeonatos[this.indiceCampeonatoEscogido] = respuesta;
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
      window.alert("Debe escoger un Campeonato");
    }
  }

  public verificarEliminar() {
    if (this.campeonatoEscogido) {
      const dialogoEdicion = this.dialogServicio.open(DecidirComponent, {
        width: "400px",
        height: "200px",
        disableClose: true,
        data: {
          mensaje: `Eliminando el Campeonato ${this.campeonatoEscogido?.nombre}. Está seguro?`,
          id: this.campeonatoEscogido.id
        }
      });

      dialogoEdicion.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.campeonatoServicio.eliminar(data.id).subscribe({
              next: respuesta => {
                if (respuesta) {
                  this.campeonatos.splice(this.indiceCampeonatoEscogido, 1);
                  this.campeonatos = [...this.campeonatos];
                }
                else {
                  window.alert("No se pudo eliminar el Campeonato");
                }
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
      window.alert("Debe escoger un Campeonato");
    }
  }

}
