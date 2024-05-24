import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhaChamada: string = '';
  public senhasArray: { [key: string]: string[] } = {
    'SG': [],
    'SP': [],
    'SE': []
  };
  public inputNovaSenha: string = '';
  public expedienteAberto: boolean = false;
  public tempoMedioAtendimentoPrior: number = 0; // Tempo médio de atendimento para senhas prioritárias
  public tempoMedioAtendimentoGeral: number = 0; // Tempo médio de atendimento para senhas gerais
  public ultimasSenhasChamadas: string[] = []; // Armazena as informações das últimas senhas chamadas no painel

  constructor() { }

  iniciarExpediente() {
    // Inicia o expediente de trabalho às 7 horas da manhã
    const horaAtual = new Date().getHours();
    this.expedienteAberto = horaAtual >= 7 && horaAtual < 17;
  }

  encerrarExpediente() {
    // Encerra o expediente de trabalho às 17 horas
    this.expedienteAberto = false;
    // Descartar senhas não atendidas
    this.descartarSenhasNaoAtendidas();
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

  novaSenha(tipoSenha: string = ''): string {
    if (!this.expedienteAberto) {
      console.log('O expediente não está aberto.');
      return ''; // Expediente não está aberto, não emite nova senha
    }

    if (tipoSenha === 'SG') {
      this.somaGeral();
    } else if (tipoSenha === 'SP') {
      this.somaPrior();
    } else if (tipoSenha === 'SE') {
      this.somaExame();
    }

    this.inputNovaSenha =
      new Date().getFullYear().toString().substring(2, 4) +
      (new Date().getMonth() + 1).toString().padStart(2, '0') +
      new Date().getDate().toString().padStart(2, '0') +
      '-' +
      tipoSenha + (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');

    this.senhasArray[tipoSenha].push(this.inputNovaSenha);

    // Atualiza as últimas senhas chamadas no painel
    this.atualizarUltimasSenhasChamadas();

    console.log(this.senhasArray);
    return this.inputNovaSenha;
  }

  descartarSenhasNaoAtendidas() {
    // Limpa todas as senhas não atendidas ao final do expediente
    this.senhasArray = {
      'SG': [],
      'SP': [],
      'SE': []
    };
  }

  atualizarUltimasSenhasChamadas() {
    // Atualiza as informações das últimas 5 senhas chamadas no painel
    const totalSenhasChamadas = this.ultimasSenhasChamadas.length;
    if (totalSenhasChamadas >= 5) {
      this.ultimasSenhasChamadas.shift(); // Remove a primeira senha se já houver 5
    }
    this.ultimasSenhasChamadas.push(this.inputNovaSenha); // Adiciona a nova senha chamada
  }

  calcularTempoMedioAtendimentoPrior(): number {
    if (this.senhasPrior === 0) {
      return 0; // Evitar divisão por zero
    }
    return this.tempoMedioAtendimentoPrior / this.senhasPrior;
  }

  calcularTempoMedioAtendimentoGeral(): number {
    if (this.senhasGeral === 0) {
      return 0; // Evitar divisão por zero
    }
    return this.tempoMedioAtendimentoGeral / this.senhasGeral;
  }

  atualizarTempoMedioAtendimento(tempoAtendimento: number, tipoSenha: string) {
    if (tipoSenha === 'SP') {
      this.tempoMedioAtendimentoPrior += tempoAtendimento;
    } else if (tipoSenha === 'SG') {
      this.tempoMedioAtendimentoGeral += tempoAtendimento;
    }
  }

  chamarSenha(): string {
    if (!this.expedienteAberto) {
      console.log('O expediente não está aberto.');
      return ''; // Expediente não está aberto, não chama nova senha
    }

    // Lógica para chamar a senha
    // Por exemplo:
    const senhaChamada = this.senhasArray['SP'].shift() || '';
    if (senhaChamada !== '') {
      // Armazenar a senha chamada
      this.senhaChamada = senhaChamada;
      // Atualizar as últimas senhas chamadas no painel
      this.atualizarUltimasSenhasChamadas();
    }
    return senhaChamada;
  }
}
