import { Component } from '@angular/core';
import { PokeAPIService } from "../services/poke-api.service";
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  pokemonData: any = {};

  constructor(
    private pokeApiService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) {}

  // Função para buscar informações do CEP e do Pokémon
  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro     = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf         = '-' + JSON.parse(JSON.stringify(value))['uf'];
    });
    this.pokeApiService.getPokeAPIService()
    .subscribe((data: any) => {
      this.pokemonData = {
        name: data.name.toUpperCase(),
        image: data.sprites.other['official-artwork'].front_default,
        abilities: data.abilities.length,
        height: data.height,
        weight: data.weight,
      };
      this.salvarPokemonsCapt();
    });
  }

  salvarPokemonsCapt() {
    const pokemonsCapt = JSON.parse(localStorage.getItem('pokemonsCapt') || '[]');
    pokemonsCapt.push({
      name: this.pokemonData.name,
      image: this.pokemonData.image,
      victories: Math.floor(Math.random() * 10),
      defeats: Math.floor(Math.random() * 10),
      draws: Math.floor(Math.random() * 10)
    });
    localStorage.setItem('pokemonsCapt', JSON.stringify(pokemonsCapt));
    localStorage.setItem('tab1Abilities', this.pokemonData.abilities.toString());
  }
}