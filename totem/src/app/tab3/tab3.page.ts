import { Component} from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  relatorioDoDia: any[] = [];

  constructor(public senhasService: SenhasService) {
  }

  gerarRelatorioDoDia() {
    this.relatorioDoDia = [];
    let numeracao = 1;
  
    Object.keys(this.senhasService.horaAtendimento).forEach(senha => {
      const dataHoraAtendimento = this.senhasService.horaAtendimento[senha];
      const dataHoraFormatada = dataHoraAtendimento ? this.formatarDataHora(dataHoraAtendimento) : 'Não realizado';
      this.relatorioDoDia.push({
        numeracao: numeracao++,
        senha: senha,
        dataHoraAtendimento: dataHoraFormatada
      });
    });
  
    Object.keys(this.senhasService.senhasArray).forEach(tipoSenha => {
      this.senhasService.senhasArray[tipoSenha].forEach(senha => {
        if (!this.relatorioDoDia.some(item => item.senha === senha)) {
          this.relatorioDoDia.push({
            numeracao: numeracao++,
            senha: senha,
            dataHoraAtendimento: 'Não realizado'
          });
        }
      });
    });
  }
  
  formatarDataHora(data: Date): string {
    return data.toLocaleString('pt-BR');
  }


}





