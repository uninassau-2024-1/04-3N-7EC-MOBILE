import { Component } from '@angular/core';
import { PokeApiService } from "../services/poke-api.service";
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  pokemonData: any = {};

  constructor(
    private pokeApiService: PokeApiService,
    private viaCEPService: ViaCEPService
  ) {}

  // Função para buscar informações do CEP e do Pokémon
  buscarPokemon() {
    // Buscar informações do CEP
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value: any) => {
      this.areaBusca.logradouro = value.logradouro;
      this.areaBusca.bairro = value.bairro;
      this.areaBusca.localidade = value.localidade;
      this.areaBusca.uf = value.uf;
    });

    // Buscar informações do Pokémon
    this.pokeApiService.getPokeApiService().subscribe((data: any) => {
      this.pokemonData = {
        name: data.name.toUpperCase(),
        image: data.sprites.other['official-artwork'].front_default,
        abilities: data.abilities.length,
        height: data.height,
        weight: data.weight,
      };
      this.saveCapturedPokemon();
    });
  }

  // Função para salvar o Pokémon capturado
  saveCapturedPokemon() {
    const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
    capturedPokemons.push({
      name: this.pokemonData.name,
      image: this.pokemonData.image,
      victories: Math.floor(Math.random() * 10),
      defeats: Math.floor(Math.random() * 10),
      draws: Math.floor(Math.random() * 10)
    });
    localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
    localStorage.setItem('tab1Abilities', this.pokemonData.abilities.toString());
  }
}
