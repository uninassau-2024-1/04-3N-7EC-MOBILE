import { Camera, CameraResultType } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{

  pokemonColor: string = 'black';
  resultado: string = '';

  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }

  pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  }
ngOnInit(): void{ }

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) { }


  buscarPokemonAleatorio() {
    // this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
    //   .subscribe((value) => {
    //     this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
    //     this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
    //     this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
    //     this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
    //   });

    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.name          = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemon.abilities     = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.height        = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.weight        = JSON.parse(JSON.stringify(value))['weight'];
        this.compararHabilidades();
        // console.log('Quantidade de itens no array:', this.pokeAPIService.pokemonResults.length);
        console.log('Pokemon: ',  this.pokemon.name);
        
      });
  }

//   compararHabilidades() {
//     const pokemonTab1 = this.pokeAPIService.pokemonResults[this.pokeAPIService.pokemonResults.length - 1];
    

//     if (pokemonTab1) {
//       const habilidadesTab1 = pokemonTab1.abilities.length;
//       const habilidadesTab2 = this.pokemon.abilities.length;

//       if (habilidadesTab2 === habilidadesTab1) {
//         this.pokemonColor = 'yellow';
//         this.resultado = 'Empate';
//       } else if (habilidadesTab2 > habilidadesTab1) {
//         this.pokemonColor = 'red';
//         this.resultado = 'Ganhou';
//       } else {
//         this.pokemonColor = 'green';
//         this.resultado = 'Perdeu';
//       }
//     }
// }

compararHabilidades() {
  // const pokemonTab1 = this.pokeAPIService.pokemonResults[this.pokeAPIService.pokemonResults.length - 1];
  const pokemonTab1 = this.pokeAPIService.pokemonResults;
  const pokemonTab2 = this.pokeAPIService.pokemonResults;

  if (pokemonTab1) {
    const habilidadesTab1 = pokemonTab1.length-1;
    const habilidadesTab2 = pokemonTab2.length;

    if (habilidadesTab2 === habilidadesTab1) {
      this.pokemonColor = 'yellow';
      this.resultado = `Empate (${habilidadesTab2})`;
    } else if (habilidadesTab2 > habilidadesTab1) {
      this.pokemonColor = 'green';
      this.resultado = `Ganhou (${habilidadesTab2})`;
    } else {
      this.pokemonColor = 'red';
      this.resultado = `Perdeu (${habilidadesTab2})`;
    }
  }
}
}