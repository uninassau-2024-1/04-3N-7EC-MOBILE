import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SenhasService {

  constructor() { }

  private horaInicioExpediente: number = 7;
  private horaFimExpediente: number = 22;
  public horaAtendimento: { [senha: string]: Date } = {};

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public senhasAtendidas: number = 0;
  public senhasAtendidasPriorSP: number = 0;

  public inputNovaSenha: string = '';
  public senhaChamada: string = '';
  public atendimentoEmAndamento: boolean = false;
  public senhaAtual: string | null = null;
  public tempoRestante: number = 0;
  public senhasChamadas: string[] = [];

  horaCriacaoSenha: { [senha: string]: Date } = {};

  public tempoMedioSP: number = 0;
  public tempoMedioSG: number = 0;
  public tempoMedioSE: number = 0;


   public senhasArray: { [key: string]: string[] } = {
    'SG': [],
    'SP': [],
    'SE': []
  };

  expedienteEmAndamento(): boolean {
    const horaAtual = new Date().getHours();
    return horaAtual >= this.horaInicioExpediente && horaAtual < this.horaFimExpediente;
  }

  iniciarAtendimento(senha: string) {
    this.senhaAtual = senha;
  }

  finalizarAtendimento() {
    this.senhaAtual = null;
  }

  atualizarTempoRestante(tempoRestante: number) {
    this.tempoRestante = tempoRestante;
  }

  registrarAtendimento() {
    this.senhasAtendidas++;
  }

  registrarAtendimentoPriorSP() {
    this.senhasAtendidasPriorSP++;
  }

  descartarSenhasForaExpediente(): void {
    if (!this.expedienteEmAndamento()) {
      this.senhasArray = {
        'SG': [], 'SP': [],'SE': []
      };
    }
  }

  somaGeral(tipoSenha: string) {
    this.senhasGeral++;
    this.senhasTotal++;
    this.novaSenha(tipoSenha);
  }

  somaPrior(tipoSenha: string) {
    this.senhasPrior++;
    this.senhasTotal++;
    this.novaSenha(tipoSenha);
  }

  somaExame(tipoSenha: string) {
    this.senhasExame++;
    this.senhasTotal++;
    this.novaSenha(tipoSenha);
  }

  novaSenha(tipoSenha: string = '') {
    if (this.expedienteEmAndamento()) {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear().toString().substring(2, 4);
      const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
      const dia = dataAtual.getDate().toString().padStart(2, '0');
      const hora = dataAtual.getHours().toString().padStart(2, '0');
      const minuto = dataAtual.getMinutes().toString().padStart(2, '0');
      const segundos = dataAtual.getSeconds().toString().padStart(2, '0');

      const numeroSenha = (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');

      this.inputNovaSenha = `${ano}${mes}${dia}-${tipoSenha}${numeroSenha}`;
      this.senhasArray[tipoSenha].push(this.inputNovaSenha);

      this.horaCriacaoSenha[this.inputNovaSenha] = new Date();
    } else {
      this.descartarSenhasForaExpediente();
    }
  }

  pegaProximaSenha(): string | undefined {

    if (this.senhasArray['SP'].length > 0) {
      return this.senhasArray['SP'].shift();
    }
    else if (this.senhasArray['SE'].length > 0) {
      return this.senhasArray['SE'].shift();
    }
    else if (this.senhasArray['SG'].length > 0) {
      return this.senhasArray['SG'].shift();
    }
    else {
      return undefined;
    }
}

atualizarSenhaChamada(senha: string) {
  this.senhaChamada = senha;
  this.senhasChamadas.unshift(senha);
}

calcularTempoEsperaParaSenha(senha: string): number | null {
  const horaCriacaoSenha = this.horaCriacaoSenha[senha];
  if (horaCriacaoSenha) {
    const tempoEspera = (new Date().getTime() - horaCriacaoSenha.getTime()) / 1000;
    console.log(`Tempo de espera para a senha ${senha}: ${tempoEspera} segundos`);
    return tempoEspera;
  } else {
    console.error("Horário de criação da senha não encontrado:", senha);
    return null;
  }
}

calcularTempoMedioSP(): number {
  const senhasSP = this.senhasArray['SP'];
  if (senhasSP.length === 0) {
    return 0;
  }

  const somaTempos = senhasSP.reduce((total, senha) => {
    const tempoEspera = this.calcularTempoEsperaParaSenha(senha);
    return total + (tempoEspera !== null ? tempoEspera : 0);
  }, 0);

  this.tempoMedioSP = somaTempos / senhasSP.length;
  return this.tempoMedioSP;
}


calcularTempoMedioSE(): number {
  const senhasSE = this.senhasArray['SE'];
  if (senhasSE.length === 0) {
    return 0;
  }

  const somaTempos = senhasSE.reduce((total, senha) => {
    const tempoEspera = this.calcularTempoEsperaParaSenha(senha);
    return total + (tempoEspera !== null ? tempoEspera : 0);
  }, 0);

  this.tempoMedioSE = somaTempos / senhasSE.length;
  return this.tempoMedioSE;
}


calcularTempoMedioSG(): number {
  const senhasSG = this.senhasArray['SG'];
  if (senhasSG.length === 0) {
    return 0;
  }

  const somaTempos = senhasSG.reduce((total, senha) => {
    const tempoEspera = this.calcularTempoEsperaParaSenha(senha);
    return total + (tempoEspera !== null ? tempoEspera : 0);
  }, 0);

  this.tempoMedioSG = somaTempos / senhasSG.length;
  return this.tempoMedioSG;
}

formatarTempoEspera(tempo: number): string {

  return tempo.toFixed(2);
}

}
