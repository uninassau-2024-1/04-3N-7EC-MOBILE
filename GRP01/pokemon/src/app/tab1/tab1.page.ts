import { ViaCepService } from './../services/via-cep.service';
import { PokeApiService } from './../services/poke-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string=  '';
  areaBuscar: any = {
    bairro:'',
    localidade:'',
    logradouro: '',
    uf:''
  };
  public pokemon:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''

  }

  constructor(
    private PokeApiService: PokeApiService,
    private ViaCepService: ViaCepService
  ) { }
    
  buscarPokemon() {
    this.ViaCepService.getViaCepService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBuscar.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBuscar.bairro= ', '+ JSON.parse(JSON.stringify(value))["bairro"];
      this.areaBuscar.localidade= ' - '+JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBuscar.uf= '-'+JSON.parse(JSON.stringify(value)) ['uf'];
    });

    this.PokeApiService.getPokeApiService()
    .subscribe((value)=>{
      this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
      this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemon.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
      this.PokeApiService.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
      this.PokeApiService.pokemon.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
   
// agora atividade 7
      this.PokeApiService.lastPokemonAbility = this.pokemon.abilities;
      this.PokeApiService.pokemon.vitorias = 0
      this.PokeApiService.pokemon.derrotas = 0
      this.PokeApiService.pokemon.empates = 0
      this.PokeApiService.pokemons.push({
        name:JSON.parse(JSON.stringify(value))['name'],
        image:JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default,
        vitorias:0,
        empates:0,
        derrotas:0
      });
    });
  }
}
