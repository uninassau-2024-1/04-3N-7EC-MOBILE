import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { RelatorioService } from '../services/relatorio.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public senhasService: SenhasService, public relatorioService: RelatorioService) {}

  public diaIniciado: boolean = false;

  iniciarDia() {
    this.diaIniciado = true;
    this.senhasService.ultimasSenhas = [];
  }

  encerrarDia() {
    this.diaIniciado = false;
    this.relatorioService.criarRelatorio();
  }

}
