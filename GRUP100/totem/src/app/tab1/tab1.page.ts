import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // inputNovaSenha: string = '';
  senha: any[];

  constructor (public senhasService: SenhasService, public passwordService: PasswordService) {
    this.senha = this.passwordService.senhas;
  }
}
