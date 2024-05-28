import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }
  getViaCepService(cep: string ='52011210'){
    return this.httpClient.get(`http://viacep.com.br/ws/${cep}/json/`);
  }
}