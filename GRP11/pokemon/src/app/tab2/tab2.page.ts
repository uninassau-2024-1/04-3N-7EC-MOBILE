import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemon: any = {};
  battleResult: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  loadRandomPokemon() {
    this.pokeApiService.getPokeApiService().subscribe((data: any) => {
      this.pokemon = {
        name: data.name.toUpperCase(),
        image: data.sprites.other['official-artwork'].front_default,
        abilities: data.abilities.length,
        height: data.height,
        weight: data.weight,
      };
      this.comparePokemon();
    });
  }

  comparePokemon() {
    const tab1Abilities = parseInt(localStorage.getItem('tab1Abilities') || '0', 10);
    const pokemonNameElement = document.getElementById('pokemonName');
    if (pokemonNameElement) {
      if (this.pokemon.abilities > tab1Abilities) {
        this.battleResult = `${this.pokemon.name} Ganhou`;
        pokemonNameElement.style.color = 'red';
      } else if (this.pokemon.abilities < tab1Abilities) {
        this.battleResult = `${this.pokemon.name} Perdeu`;
        pokemonNameElement.style.color = 'green';
      } else {
        this.battleResult = `${this.pokemon.name} Empate`;
        pokemonNameElement.style.color = 'yellow';
      }
    }
  }
}
