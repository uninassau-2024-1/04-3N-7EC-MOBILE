import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  // pokemonResults: any[] = [];
  public pokemonResults: any[] = [];

  constructor(private httpClient: HttpClient) { }

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      tap((pokemon: any) => {
        pokemon.abilities = pokemon.abilities.map((ability: any) => ability.ability.name);
        this.pokemonResults.push(pokemon);;
      })
    );
  }

}
