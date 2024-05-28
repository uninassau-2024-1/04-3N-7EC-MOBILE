import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemons: any[] = []; 

  constructor(private pokeAPIService: PokeAPIService) {}

  ngOnInit() {
    this.loadMultiplePokemonData();
  }

  loadMultiplePokemonData() {
    for (let i = 0; i < 6; i++) { 
      this.pokeAPIService.getRandomPokemon().subscribe((data: any) => {
        this.pokemons.push({
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default
          },
          victories: Math.floor(Math.random() * 10), 
          defeats: Math.floor(Math.random() * 10),   
          draws: Math.floor(Math.random() * 10)      
        });
      }, error => {
        console.error('Erro ao carregar Pokémon:', error);
      });
    }
  }
}
