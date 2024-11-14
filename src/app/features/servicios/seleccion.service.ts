import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Seleccion } from '../../core/entidades/seleccion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}selecciones/`;
  }

  public listar(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(dato: string): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}buscar/${dato}`);
  }

  public agregar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.post<Seleccion>(`${this.url}agregar`, seleccion);
  }

  public modificar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.put<Seleccion>(`${this.url}modificar`, seleccion);
  }
}
