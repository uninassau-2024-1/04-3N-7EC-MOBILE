import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemon: any = {
    name: '',
    image: '',
    abilities: '',
    height: '',
    weight: ''
  };
  public pokemonAdversary: any = {
    name: '',
    image: '',
    vitorias: '0',
    empates: '0',
    derrotas: '0'
  };
  public pokemons: { name: '', image: '', vitorias: 0, empates: 0, derrotas: 0 }[] = [];

  constructor(private PokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokemonAdversary.name = this.PokeApiService.pokemon.name;
    this.pokemonAdversary.image = this.PokeApiService.pokemon.image;
    this.pokemonAdversary.vitorias = this.PokeApiService.pokemon.vitorias;
    this.pokemonAdversary.empates = this.PokeApiService.pokemon.empates;
    this.pokemonAdversary.derrotas = this.PokeApiService.pokemon.derrotas;
  }

  ionViewDidEnter() {
    this.pokemonAdversary.name = this.PokeApiService.pokemon.name;
    this.pokemonAdversary.image = this.PokeApiService.pokemon.image;
    this.pokemonAdversary.vitorias = this.PokeApiService.pokemon.vitorias;
    this.pokemonAdversary.empates = this.PokeApiService.pokemon.empates;
    this.pokemonAdversary.derrotas = this.PokeApiService.pokemon.derrotas;
    this.pokemons = this.PokeApiService.pokemons;
  }

  buscarPokemon() {
    this.PokeApiService.getPokeApiService().subscribe((value) => {
      this.pokemonAdversary.weight = JSON.parse(JSON.stringify(value))['weight'];
      this.pokemonAdversary.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemonAdversary.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemonAdversary.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemonAdversary.image = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
    });
  }
}