import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCEPService {

  constructor(private httpClient: HttpClient) { }
  getViaCEPService(cep: string = '52011210') {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
