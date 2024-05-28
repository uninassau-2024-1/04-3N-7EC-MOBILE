import { Component } from '@angular/core';
import { PokeApiService } from "../services/poke-api.service";
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
    private pokeApiService: PokeApiService,
    private viaCEPService: ViaCEPService
  ) {}

  // Função para buscar informações do CEP e do Pokémon
  buscarPokemon() {
    const formattedCEP = this.formatCEP(this.areaBuscarPokemon);
    if (!this.isValidCEP(formattedCEP)) {
      alert('Por favor, insira um CEP válido no formato 00000-000 ou 00000000.');
      return;
    }

    // Buscar informações do CEP
    this.viaCEPService.getViaCEPService(formattedCEP).subscribe((value: any) => {
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

  // Função para formatar o CEP
  formatCEP(cep: string): string {
    return cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }

  // Função para validar o CEP
  isValidCEP(cep: string): boolean {
    return /^[0-9]{8}$/.test(cep);
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
