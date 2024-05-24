import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string ='';
  senhaGerada: string = '';

  constructor(public senhasService: SenhasService) {}
  
  gerarSenha(tipoSenha: string) {
    this.senhasService.novaSenha(tipoSenha);
    this.senhaGerada = this.senhasService.inputNovaSenha;
    setTimeout(() => {
      this.senhaGerada = ''; // Limpa a senha gerada após 5 segundos
    }, 1000);
  }

}
