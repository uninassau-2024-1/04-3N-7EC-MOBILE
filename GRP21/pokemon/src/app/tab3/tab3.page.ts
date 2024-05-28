import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemonsCapt: any[] = [];
  pokemon: any = {};

  constructor(private pokeApiService: PokeAPIService) {}

  ngOnInit() {
    this.carregarPokemonsCapt();
    this.carregarPokeAleatorio();
  }

  carregarPokemonsCapt() {
    this.pokemonsCapt = JSON.parse(localStorage.getItem('pokemonsCapt') || '[]');
  }

  carregarPokeAleatorio() {
    
    this.pokeApiService.getPokeAPIService().subscribe((data: any) => {
      this.pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        victories: Math.floor(Math.random() * 10), 
        defeats: Math.floor(Math.random() * 10), 
        draws: Math.floor(Math.random() * 10) 
      };
    });
  }
}