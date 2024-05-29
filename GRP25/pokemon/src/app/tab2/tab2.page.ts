import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  pokemonAdversary:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''

  }
  resultado:string = ''


  constructor(
    private PokeApiService:PokeApiService,
    public photoService:PhotoService
  ){ }
  ngOnInit(): void {
  }

  buscarPokemon(){
    this.PokeApiService.getPokeApiService()
      .subscribe(value => {
        this.pokemonAdversary.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonAdversary.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAdversary.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAdversary.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemonAdversary.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        this.PokeApiService.adversaryAbility = this.pokemonAdversary.abilities;
        console.log(this.PokeApiService.lastPokemonAbility)
        console.log(this.PokeApiService.adversaryAbility)
        this.setResultado();
      });
  }
  ionViewDidEnter(){
    this.buscarPokemon()
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery()
  }

  setResultado(){
     if(this.PokeApiService.adversaryAbility === this.PokeApiService.lastPokemonAbility){
        this.resultado = 'Empate'
        this.PokeApiService.pokemon.empates = this.PokeApiService.pokemon.empates+1
        this.PokeApiService.pokemons[this.PokeApiService.pokemons.length-1].empates++ 
     }else if(this.PokeApiService.adversaryAbility > this.PokeApiService.lastPokemonAbility){
        this.resultado = 'Você perdeu'
        this.PokeApiService.pokemon.derrotas = this.PokeApiService.pokemon.derrotas+1
        this.PokeApiService.pokemons[this.PokeApiService.pokemons.length-1].derrotas++
     }else{
        this.resultado = 'Você venceu '
        this.PokeApiService.pokemon.vitorias = this.PokeApiService.pokemon.vitorias+1
        this.PokeApiService.pokemons[this.PokeApiService.pokemons.length-1].vitorias++
     }
  }

}