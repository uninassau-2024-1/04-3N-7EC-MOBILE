import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private pokemonList: any[] = [];

  constructor() {}

  addPokemon(pokemon: any) {
    const existingPokemon = this.pokemonList.find(p => p.name === pokemon.name);
    if (existingPokemon) {
      existingPokemon.count += 1;
    } else {
      pokemon.victories = 0;
      pokemon.defeats = 0;
      pokemon.draws = 0;
      this.pokemonList.push(pokemon);
    }
  }

  getPokemonList() {
    return this.pokemonList;
  }

  getLastPokemon() {
    return this.pokemonList.length > 0 ? this.pokemonList[this.pokemonList.length - 1] : null;
  }

  updatePokemonStats(pokemon: any, result: 'win' | 'lose' | 'draw') {
    if (pokemon) {
      if (result === 'win') {
        pokemon.victories += 1;
      } else if (result === 'lose') {
        pokemon.defeats += 1;
      } else if (result === 'draw') {
        pokemon.draws += 1;
      }
    }
  }
}