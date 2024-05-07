import { Component, NgZone } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { Senha } from '../services/senha.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public botaoEstaDesabilitado: boolean = false;
  public senhaEmAtendimento: Senha | null = null;
  public ultimaSenha: string | undefined;

  constructor(public senhasService: SenhasService, private zone: NgZone) {
  }


  atenderSenha(event: any) {
    event.preventDefault();
    this.zone.run(() => {
      // Verifica se existe uma senha específica a ser atendida
      if (this.ultimaSenha) {
        const tipoProximaSenha = this.proximoTipoDeSenha(this.ultimaSenha);
        const index = this.senhasService.senhasOrdenadas.findIndex(item => item.tipoSenha === tipoProximaSenha);
        if (index !== -1) {
          this.senhaEmAtendimento = this.senhasService.senhasOrdenadas.splice(index, 1)[0];
        } else {
          this.senhaEmAtendimento = this.senhasService.senhasOrdenadas.shift() || null;
        }
      } else {
        // Pega a primeira senha da lista se não houver 'ultimaSenha'
        this.senhaEmAtendimento = this.senhasService.senhasOrdenadas.shift() || null;
      }

      this.ultimaSenha = this.senhaEmAtendimento?.tipoSenha;
      if (this.senhaEmAtendimento) {
        this.senhasService.ultimasSenhas.push(this.senhaEmAtendimento);
      }
    });
  }

  proximoTipoDeSenha(tipoAtual: string): string {
    if (tipoAtual === 'SP') return 'SE';
    if (tipoAtual === 'SE') return 'SG';
    return 'SP'; // Volta ao início ou cobre outros casos
  }

  encerrarSenha() {
    this.botaoEstaDesabilitado = false;
    this.ultimaSenha = undefined;  // Resetando a ultima senha para permitir recomeçar o ciclo
  }
}
