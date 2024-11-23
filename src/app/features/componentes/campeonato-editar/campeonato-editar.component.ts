import { Component, Inject } from '@angular/core';
import { Campeonato } from '../../../core/entidades/campeonato';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../../core/entidades/seleccion';
import { NgFor } from '@angular/common';

export interface DatosEdicionCampeonato {
  campeonato: Campeonato;
  selecciones: Seleccion[];
  encabezado: string;
}

@Component({
  selector: 'app-campeonato-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {

  constructor(public dialogRef: MatDialogRef<CampeonatoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosEdicionCampeonato
  ) {

  }

  public cerrar() {
    this.dialogRef.close();
  }

}
