import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  getPokemonRandomData() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}
    getPokeApiService(id: number = Math.floor(Math.random() * 100) + 1) {
      return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
  }
