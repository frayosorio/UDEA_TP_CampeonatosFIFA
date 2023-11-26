import { Component, OnInit } from '@angular/core';
import { Campeonato } from 'src/app/entidades/campeonato';

import { CampeonatoService } from 'src/app/servicios/campeonato.service';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.css']
})
export class TablaPosicionesComponent implements OnInit {

  public idCampeonato: number = 0;
  public campeonatos: Campeonato[] = [];


  constructor(private campeonatoService: CampeonatoService,
  ) {
  }

  ngOnInit(): void {
    this.listarCampeonatos();
  }

  public listarCampeonatos() {
    this.campeonatoService.listar()
      .subscribe(data => {
        this.campeonatos = data;
      },
        err => {
          window.alert(err.message)
        });
  }


}
