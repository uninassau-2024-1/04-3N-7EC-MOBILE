import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from '../services/shared.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any = {};
  comparisonResult: string = '';
  comparisonColor: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private sharedService: SharedService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadRandomPokemon();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  loadRandomPokemon() {
    const tab1Pokemon = this.sharedService.getLastPokemon();
    if (!tab1Pokemon) {
      this.presentToast('Por favor, capture um Pokémon na Tab1 antes de batalhar.');
      return;
    }

    const randomId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(randomId).subscribe((data: any) => {
      this.pokemon = data;
      this.comparePokemonAbilities();
    });
  }

  comparePokemonAbilities() {
    const tab1Pokemon = this.sharedService.getLastPokemon();
    const tab1PokemonAbilities = tab1Pokemon?.abilities?.length || 0;
    const tab1PokemonHeight = tab1Pokemon?.height || 0;
    const tab1PokemonWeight = tab1Pokemon?.weight || 0;

    const tab2PokemonAbilities = this.pokemon?.abilities?.length || 0;
    const tab2PokemonHeight = this.pokemon?.height || 0;
    const tab2PokemonWeight = this.pokemon?.weight || 0;

    if (tab2PokemonAbilities === tab1PokemonAbilities && 
        tab2PokemonHeight === tab1PokemonHeight && 
        tab2PokemonWeight === tab1PokemonWeight) {
      this.comparisonResult = 'Empate';
      this.comparisonColor = 'yellow';
      this.sharedService.updatePokemonStats(tab1Pokemon, 'draw');
    } else if (tab2PokemonAbilities > tab1PokemonAbilities ||
               tab2PokemonHeight > tab1PokemonHeight ||
               tab2PokemonWeight > tab1PokemonWeight) {
      this.comparisonResult = 'Ganhou';
      this.comparisonColor = 'red';
      this.sharedService.updatePokemonStats(tab1Pokemon, 'win');
    } else {
      this.comparisonResult = 'Perdeu';
      this.comparisonColor = 'green';
      this.sharedService.updatePokemonStats(tab1Pokemon, 'lose');
    }
}

}
