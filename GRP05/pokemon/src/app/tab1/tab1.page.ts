import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedService } from '../services/shared.service';
import { ToastController } from '@ionic/angular';

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
    formatado: ''
  };
  pokemon: any = {};

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedService: SharedService,
    private toastController: ToastController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  formatCep(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 5) {
      input = input.substring(0, 5) + '-' + input.substring(5, 8);
    }
    this.areaBuscarPokemon = input;
  }

  buscarPokemon() {
    if (!this.areaBuscarPokemon || this.areaBuscarPokemon.length < 9) {
      this.presentToast('Por favor, insira um CEP válido.');
      return;
    }

    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value: any) => {
      this.areaBusca.logradouro = value.logradouro;
      this.areaBusca.bairro = value.bairro;
      this.areaBusca.localidade = value.localidade;
      this.areaBusca.uf = value.uf;

      this.areaBusca.formatado = `${this.areaBusca.logradouro}, ${this.areaBusca.bairro}, ${this.areaBusca.localidade} - ${this.areaBusca.uf}.`;
    });

    this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
      this.pokemon = data;
      this.sharedService.addPokemon(this.pokemon); // Armazene o Pokémon no serviço compartilhado
    });
  }
}
