import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  capturedPokemons: any[] = [];
  pokemon: any = {};

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.loadCapturedPokemons();
    this.loadRandomPokemon();
  }

  loadCapturedPokemons() {
    this.capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
  }

  loadRandomPokemon() {
    // Chama o serviço para obter um Pokémon aleatório
    this.pokeApiService.getPokeApiService().subscribe((data: any) => {
      this.pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        victories: Math.floor(Math.random() * 10), // Apenas para fins de teste, gera um número aleatório
        defeats: Math.floor(Math.random() * 10), // Apenas para fins de teste, gera um número aleatório
        draws: Math.floor(Math.random() * 10) // Apenas para fins de teste, gera um número aleatório
      };
    });
  }
}
