import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  getPokeAPIService(id: number) {
    const timestamp = new Date().getTime(); 
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}?timestamp=${timestamp}`);
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 100) + 1; 
    return this.getPokeAPIService(randomId);
  }
}
