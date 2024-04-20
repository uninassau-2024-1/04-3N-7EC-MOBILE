import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  proximaSenha: string = '';
alertButtons: any;

  constructor(public senhasService: SenhasService, private alertController: AlertController) {}

  ionViewDidEnter() {
    if (!this.senhasService.expedienteEmAndamento()) {
      this.exibirAlerta();
    }
  }
  
  async exibirAlerta() {
    const alert = await this.alertController.create({
      header: 'O Sistema está fechado.',
      subHeader: 'Horário de atendimento: 7h às 17h.',
      message: 'Volte amanhã para pegar uma nova ficha.',
      buttons: ['Confirmar']
    });
  
    await alert.present();
  }
}


