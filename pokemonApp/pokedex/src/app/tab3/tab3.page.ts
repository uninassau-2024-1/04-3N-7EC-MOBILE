import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  capturedPokemons: any[] = [];

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.loadCapturedPokemons();
  }

  loadCapturedPokemons() {
    this.capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
  }
}
