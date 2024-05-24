import { Injectable } from '@angular/core';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public tipoSenhas: string[] = []
  public tipoSenhaAtual: string = '';

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public inputNovaSenha: string = '';

  public atendendo: boolean = false;
  public senhaFoiChamada: boolean = false;

  public spjaFoi: boolean = false;
  public sgjaFoi: boolean = false;
  public sejaFoi: boolean = false;

  public nextSenha: string ='';

  public numeroSG: number = 0;
  public numeroSP: number = 0;
  public numeroSE: number = 0;
  
  public mediaSg: number = 0;
  public mediaSp: number = 0;
  public mediaSe: number = 0;
  
  public finalAtendimento: number = 0;
  public inicioAtendimento: number = 0;
  public diferencaTempos: number = 0;

  public senhasArray: { [key: string]: string[] } = {
    'SG': [], // Senhas Gerais
    'SP': [], // Senhas PrioritÃ¡rias
    'SE': []  // Senhas de Exame
  };

  public tempoAtendimentoSg: number[] = [];
  public tempoAtendimentoSp: number[] = [];
  public tempoAtendimentoSe: number[] = [];

  
  public listaSenhasGeradas: string[] = [];

  constructor() { }

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

  novaSenha(tipoSenhas: string = '') {

    if (tipoSenhas == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSG +1).toString().padStart(2, '0');
      this.senhasArray['SG'].unshift(this.inputNovaSenha);
      this.numeroSG ++ ;
      this.tipoSenhaAtual = tipoSenhas
    } else if (tipoSenhas == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSP +1).toString().padStart(2, '0');
      this.senhasArray['SP'].unshift(this.inputNovaSenha);
      this.numeroSP ++ ;
      this.tipoSenhaAtual = tipoSenhas
    } else if (tipoSenhas == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSE + 1).toString().padStart(2, '0');
      this.senhasArray['SE'].unshift(this.inputNovaSenha);
      this.numeroSE ++ ;
      
      
    }
    console.log(this.senhasArray);
  }

  chamarProximaSenha(): string | null {
    const inicio = new Date().getTime();
    if (this.senhasArray['SP'].length > 0 && this.spjaFoi == false  ) 
      {
      this.nextSenha=
       this.senhasArray['SP'][this.senhasArray['SP'].length - 1];
       this.listaSenhasGeradas.unshift(this.nextSenha);
       this.senhasArray['SP'].pop();
       this.spjaFoi = true;
       this.sgjaFoi = false;
       this.sejaFoi = false;
       this.tipoSenhas.unshift('SP')
       this.tipoSenhaAtual = 'SP'

    } else if (this.senhasArray['SE'].length > 0 && this.sejaFoi == false) {
      this.nextSenha=
      this.senhasArray['SE'][this.senhasArray['SE'].length - 1];
      this.listaSenhasGeradas.unshift(this.nextSenha);
      this.senhasArray['SE'].pop();
       this.spjaFoi = false;
       this.sgjaFoi = false;
       this.sejaFoi = true;
       this.tipoSenhas.unshift('SE')
       this.tipoSenhaAtual = 'SE'

    } else if (this.senhasArray['SG'].length > 0 && this.sgjaFoi == false) {
      this.nextSenha=
      this.senhasArray['SG'][this.senhasArray['SG'].length - 1];
      this.listaSenhasGeradas.unshift(this.nextSenha);
      this.senhasArray['SG'].pop();
       this.spjaFoi = false;
       this.sgjaFoi = true;
       this.sejaFoi = false;
       this.tipoSenhas.unshift('SG')
       this.tipoSenhaAtual = 'SG'

    } else {
      this.spjaFoi = false;
       this.sgjaFoi = false;
       this.sejaFoi = false;
      return null;
    }
    this.senhaFoiChamada = true;
    return this.nextSenha;
  }

  inicarAtendimento(){

    var tempoInicio = Math.floor(Date.now() / 1000);
    this.inicioAtendimento = tempoInicio;
    this.atendendo = true;
    this.tipoSenhaAtual = this.tipoSenhas[this.tipoSenhas.length - 1]
  }

  encerrarAtendimento(){
    var tempoFinalizado = Math.floor(Date.now() / 1000);
    this.finalAtendimento = tempoFinalizado;
    var diferencaTempo = this.finalAtendimento - this.inicioAtendimento;
    if (this.tipoSenhas.length > 0) { // Verifica se há elementos na lista
        if (this.tipoSenhas[this.tipoSenhas.length - 1] == 'SG') {
            this.tempoAtendimentoSg.unshift(diferencaTempo);
        } else if (this.tipoSenhas[this.tipoSenhas.length - 1] == 'SP') {
            this.tempoAtendimentoSp.unshift(diferencaTempo);
        } else if (this.tipoSenhas[this.tipoSenhas.length - 1] == 'SE') {
            this.tempoAtendimentoSe.unshift(diferencaTempo);
        }
        this.tipoSenhas.shift(); // Remove o primeiro elemento da lista
    }

    this.atendendo = false;
    console.log('SG' + this.tempoAtendimentoSg);
    console.log('SP' +this.tempoAtendimentoSp);
    console.log('SE' +this.tempoAtendimentoSe);
    console.log(this.tipoSenhas);

    var somaSg = 0;
    var somaSp = 0;
    var somaSe = 0;

    for (var i = 0; i < this.tempoAtendimentoSg.length; i++) {
      somaSg += this.tempoAtendimentoSg[i];
    }
    this.mediaSg = this.tempoAtendimentoSg.length > 0 ? somaSg / this.tempoAtendimentoSg.length : 0;
    this.mediaSg = Math.round(this.mediaSg);

    for (var i = 0; i < this.tempoAtendimentoSp.length; i++) {
      somaSp += this.tempoAtendimentoSp[i];
    }
    this.mediaSp = this.tempoAtendimentoSp.length > 0 ? somaSp / this.tempoAtendimentoSp.length : 0;
    this.mediaSp =Math.round(this.mediaSp);

    for (var i = 0; i < this.tempoAtendimentoSe.length; i++) {
      somaSe += this.tempoAtendimentoSe[i];
    }
    this.mediaSe = this.tempoAtendimentoSe.length > 0 ? somaSe / this.tempoAtendimentoSe.length : 0;
    this.mediaSe =Math.round(this.mediaSe);
    this.senhaFoiChamada = false;
  }
  

}

  

