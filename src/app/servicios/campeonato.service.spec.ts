import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CampeonatoService } from './campeonato.service';


describe('CampeonatoService', () => {
    let service: CampeonatoService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CampeonatoService]
        });
        service = TestBed.inject(CampeonatoService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Suplantar los datos de la API', () => {
        const mockResponse = [
            {
                "id": 1,
                "nombre": "FIFA World Cup 2010",
                "pais": {
                    "id": 3,
                    "nombre": "Sudáfrica",
                    "entidad": "Sin Entidad"
                },
                "año": 2010
            },
            {
                "id": 2,
                "nombre": "FIFA World Cup 2006",
                "pais": {
                    "id": 4,
                    "nombre": "Alemania",
                    "entidad": "Federación Alemana de Futbol"
                },
                "año": 2006
            },
            {
                "id": 3,
                "nombre": "FIFA World Cup 2002",
                "pais": {
                    "id": 5,
                    "nombre": "Japón",
                    "entidad": "Sin Entidad"
                },
                "año": 2002
            }];

            service.listar().subscribe(response => {
                expect(response).toEqual(mockResponse);
              });

              const request = httpTestingController.expectOne('http://localhost:8080/campeonatos/listar');

              expect(request.request.method).toEqual('GET');

              request.flush(mockResponse);
  
    })

    afterEach(() => {
        // Asegurarse de que no haya solicitudes HTTP pendientes
        httpTestingController.verify();
      });

});