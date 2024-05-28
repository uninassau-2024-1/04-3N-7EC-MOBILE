import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  pokemon: any = {
    name: '',
    front_default: '',
    abilities: [],
    height: '',
    weight: ''
  };
  // export class Tab3Page {
  //   pokemon: any = {
  //     name: '',
  //     front_default: '',
  //     abilities: [],
  //     height: '',
  //     weight: ''
  //   };
  ngOnInit(): void {
    
  }

  // public pokemonResults: any[] = [];
  constructor(public pokeAPIService: PokeAPIService) {}

  // ngOnInit() {
  //   this.carregarPokemon();
  // }
  // ngOnInit() {
  //   // this.carregarPokemon();
  //   this.pokeAPIService.getPokeAPIService().subscribe(data => {
  //     this.pokemonResults = data.results;
  //     console.log(this.pokemonResults);
  //   });}

  // carregarPokemon() {
  //   this.pokeAPIService.getPokeAPIService().subscribe((value) => {
  //     this.pokemon.name          = JSON.parse(JSON.stringify(value))['name'];
  //       this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
  //       this.pokemon.abilities     = JSON.parse(JSON.stringify(value))['abilities'].length;
  //       this.pokemon.height        = JSON.parse(JSON.stringify(value))['height'];
  //       this.pokemon.weight        = JSON.parse(JSON.stringify(value))['weight'];
  //   });
  // }


}
