import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCEPService {

  constructor(private httpClient: HttpClient) { }

  getViaCEPService(cep: string = '54589230') {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
