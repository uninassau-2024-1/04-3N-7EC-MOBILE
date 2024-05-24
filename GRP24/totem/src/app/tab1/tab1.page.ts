import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string = ''; 
  codigoAleatorio: string = ''; 

  constructor(public senhasService: SenhasService) {} 
  
  emitirSenha(tipo: string) {
    this.inputNovaSenha = this.senhasService.novaSenha(tipo);
    this.codigoAleatorio = this.gerarCodigoAleatorio(); 
  }

  gerarCodigoAleatorio(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let codigo = '';
    for (let i = 0; i < length; i++) {
      codigo += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return codigo;
  }
  
}
