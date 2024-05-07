import { Component, OnInit } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  senhaChamada: string = ''; // Variável para armazenar a senha chamada

  constructor(public senhasService: SenhasService) {}

  ngOnInit() {
    // Inicialize a senha chamada ao carregar o componente
    this.atualizarSenhaChamada();
  }

  // Método para atualizar a senha chamada
  atualizarSenhaChamada() {
    console.log('Atualizando senha chamada...');
    this.senhaChamada = this.senhasService.chamarSenha();
    console.log('Senha chamada:', this.senhaChamada);
  }
}
