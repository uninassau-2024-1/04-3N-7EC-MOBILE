import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private httpClient: HttpClient) { }
  getPokeAPIService(id: number = Math.floor(Math. random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  } 
}
