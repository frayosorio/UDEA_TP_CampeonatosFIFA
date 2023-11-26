import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Campeonato } from "../entidades/campeonato";

@Injectable({
    providedIn: 'root'
})
export class CampeonatoService {

    url: string;

    constructor(
        private http: HttpClient
    ) {
        this.url = `${environment.urlAPI}campeonatos`;
    }

    public listar(): Observable<Campeonato[]> {
        let urlT = `${this.url}/listar`;
        return this.http.get<Campeonato[]>(urlT);
    }


}