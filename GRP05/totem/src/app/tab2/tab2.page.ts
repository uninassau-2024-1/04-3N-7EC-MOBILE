import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  constructor(public senhasService: SenhasService) {
  }

  chamarCliente() {
    const proximaSenha = this.senhasService.pegaProximaSenha();
    if (proximaSenha) {
      const tempoEspera = this.senhasService.calcularTempoEsperaParaSenha(proximaSenha);
      
      const tempoMedioSP = this.senhasService.calcularTempoMedioSP();
      console.log(`Tempo médio de espera para senhas do tipo "SP": ${tempoMedioSP} segundos`);

      const tempoMedioSE = this.senhasService.calcularTempoMedioSE();
      console.log(`Tempo médio de espera para senhas do tipo "SE": ${tempoMedioSE} segundos`);

      const tempoMedioSG = this.senhasService.calcularTempoMedioSG();
      console.log(`Tempo médio de espera para senhas do tipo "SG": ${tempoMedioSG} segundos`);
      
      const tipoSenhaMatch = proximaSenha.match(/[A-Z]+/);
      if (tipoSenhaMatch && tipoSenhaMatch.length > 0) {
        const tipoSenha = tipoSenhaMatch[0];
  
        this.senhasService.iniciarAtendimento(proximaSenha);
        this.senhasService.horaAtendimento[proximaSenha] = new Date();
  
        const intervalo = 1000;
        const timer = setInterval(() => {
          clearInterval(timer);
          this.senhasService.atualizarSenhaChamada(proximaSenha);
          const horaAtual = new Date();
          this.senhasService.finalizarAtendimento();
          this.senhasService.registrarAtendimento();
          if (tipoSenha === 'SP') {
            this.senhasService.registrarAtendimentoPriorSP();
          }
          
        }, intervalo);
  
      } else {
        console.error("Não foi possível identificar o tipo de senha:", proximaSenha);
      }
    } else {
      alert('Não há senhas na fila.');
    }
  }
  
}

