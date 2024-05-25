import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public pokemon: any;
  public resultText: string = '';
  public resultColor: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private tabsPage: TabsPage
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  async loadRandomPokemon() {
    try {
      const response: any = await this.pokeAPIService.getRandomPokemon().toPromise();
      this.pokemon = response;
      this.comparePokemonSkills();
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error);
    }
  }

  comparePokemonSkills() {
    const tab1Pokemon = this.tabsPage.tab1Pokemon;
    console.log('Pokémon carregado na Tab2 (Tab1 Pokémon):', tab1Pokemon);
    if (!tab1Pokemon) {
      this.resultText = 'Nenhum Pokémon carregado na Tab1';
      this.resultColor = 'white';
      return;
    }

    if (this.pokemon.abilities.length === tab1Pokemon.abilities.length) {
      this.resultText = 'Empate';
      this.resultColor = 'yellow';
    } else if (this.pokemon.abilities.length > tab1Pokemon.abilities.length) {
      this.resultText = 'Ganhou';
      this.resultColor = 'red';
    } else {
      this.resultText = 'Perdeu';
      this.resultColor = 'green';
    }
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
