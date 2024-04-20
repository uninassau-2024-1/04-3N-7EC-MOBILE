import { Injectable } from '@angular/core';
import { SenhasService } from './senhas.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(public senhasService: SenhasService) { }

  public dia: number = 0;
  public relatorios: any[] = [];
  public relatorio: [] = [];

  criarRelatorio() {
    this.relatorios = [
      {
        senhasEmitidas: 0,
        senhasGeral: 0,
        senhasPrior: 0,
        senhasExame: 0
      }
    ]

    this.relatorios.push(this.relatorio);
    console.log(this.relatorios)
  }
}
