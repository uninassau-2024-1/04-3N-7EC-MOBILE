import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = `https://pokeapi.co/api/v2/pokemon`;

  constructor(private httpClient: HttpClient) { }

  // Método para obter um Pokémon aleatório
  getRandomPokemon(): Observable<any> {
    const id = Math.floor(Math.random() * 100) + 1; // Adiciona 1 para evitar o ID zero
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
}
