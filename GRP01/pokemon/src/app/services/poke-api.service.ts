import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  public id: number = 0;
  public lastPokemonAbility: number = 0
  public adversaryAbility: number = 0
  public pokemon:any ={
      name:'',
      image:'',
      vitorias:'0',
      empates:'0',
      derrotas:'0'
    }
    public pokemons:{ name:'',image:'',vitorias:0,empates:0,derrotas:0}[]
    =[
    ]


  constructor(private httpClient: HttpClient) { }

  getPokeApiService() : Observable<any> {
    this.id = Math.floor(Math.random() * 100)
    if(this.id==0){
      this.id = 1;
    }
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
  }
}