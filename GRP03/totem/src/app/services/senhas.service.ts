import { Injectable, Component, ChangeDetectorRef  } from '@angular/core';
import { Senha } from './senha.interface';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})


export class SenhasService {

  // YYMMDD-{tipo de senha}{numero da senha}
  public now: Date | string = new Date();

  public senhas: Senha[] = [];

  public inputNovaSenha: string = '';
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhasOrdenadas: Senha[] = [

  ];
  public ultimasSenhas: Senha[] = [];

  constructor() { }

  ordenarSenhas() {
    this.senhasOrdenadas = this.senhas.sort((a, b) => {
      return a.prioridade - b.prioridade;
    })
  }

  formatarSenha(tipoSenha: string, contadorTipoSenha: number): string {
    const novaSenha = new Date().getFullYear().toString().substring(2, 4) +
      (new Date().getMonth() + 1).toString().padStart(2, '0') +
      new Date().getDate().toString().padStart(2, '0') +
      '-' +
      tipoSenha +
      contadorTipoSenha.toString().padStart(2, '0');

    return novaSenha;
  }

  formatarDataAtual(): string {
    return format(this.now, 'yyyy-MM-dd HH:mm:ss');
  }

  adicionarSenha(senha: any) {
    this.senhas.push(senha);
  }

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }

  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }

  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  novaSenha(tipoSenha: string = '') {
    let senhaFormatada: string = '';
    if (tipoSenha == 'SG') {
      this.somaGeral();
      senhaFormatada = this.formatarSenha(tipoSenha, this.senhasGeral);
      // this.senhaArray['SG'].push(novaSenha);
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      senhaFormatada = this.formatarSenha(tipoSenha, this.senhasPrior);
      // this.senhaArray[tipoSenha].push(novaSenha);
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      senhaFormatada = this.formatarSenha(tipoSenha, this.senhasExame);
      // this.senhaArray[tipoSenha].push(novaSenha);
    }

    const senha: Senha = {
      icon: this.selecionaIcone(tipoSenha),
      color: this.selecionaCor(tipoSenha),
      codigo: senhaFormatada,
      tm_geracao: this.formatarDataAtual(),
      tipoSenha: tipoSenha,
      prioridade: this.selecionaPrioridade(tipoSenha),
      tempoMedio: this.selecionarTempoMedio(tipoSenha).toString()
    };

    console.log(senha)
    this.senhas.push(senha);
  }

  selecionarTempoMedio(tipoSenha: string): number {
    switch (tipoSenha) {
      case 'SG':
        return Math.floor(Math.random() * 7) + 2;;
      case 'SE':
        return Math.random() < 0.95 ? 1 : 5;
      case 'SP':
        return Math.floor(Math.random() * 11) + 10;;
    }
    return 0;
  }

  selecionaPrioridade(tipoSenha: string): number {
    switch (tipoSenha) {
      case 'SG':
        return 2;
      case 'SE':
        return 3;
      case 'SP':
        return 1;
    }
    return 0;
  }

  selecionaIcone(tipoSenha: string): string {
    let icone: string = '';
    switch (tipoSenha) {
      case 'SG':
        return icone = 'home';
      case 'SE':
        return icone = 'document';
      case 'SP':
        return icone = 'accessibility';
    }
    return icone;
  }

  selecionaCor(tipoSenha: string): string {
    let icone: string = '';
    switch (tipoSenha) {
      case 'SG':
        return icone = 'dark';
        break;
      case 'SE':
        return icone = 'warning';
      case 'SP':
        return icone = 'primary';
    }
    return icone;
  }

  selecionaCodigo(tipoSenha: string): string {
    return '';
  }
}