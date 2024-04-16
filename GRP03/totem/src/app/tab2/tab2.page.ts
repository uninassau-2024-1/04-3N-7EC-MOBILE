import { Component, NgZone } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { Senha } from '../services/senha.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  public seconds: any;
  public botaoEstaDesabilitado: boolean = false;
  public senhaEmAtendimento: any;
  public senhaExame: any = 0;
  public ultimaSenha:  string | undefined;

  constructor(public senhasService: SenhasService, private zone: NgZone) {
  }

  atenderSenha() {

    this.zone.run(() => {
      if(this.senhaExame > 0) {
        this.senhaEmAtendimento = {...this.senhasService.senhasOrdenadas.splice(this.senhaExame, 1)[0]}
        this.senhaExame = 0;
        this.ultimaSenha = this.senhaEmAtendimento?.tipoSenha;
        this.senhasService.ultimasSenhas.push(this.senhaEmAtendimento);
        return;
      }
      if(this.ultimaSenha === "SP" ) {
        this.senhaExame = this.senhasService.senhasOrdenadas.findIndex(item => item.tipoSenha == 'SE');
        this.ultimaSenha = 'SE';
        this.senhasService.ultimasSenhas.push(this.senhaEmAtendimento);
        return;
      }
  
      if(this.ultimaSenha === "SE") {
        this.senhaExame = this.senhasService.senhasOrdenadas.findIndex(item => item.tipoSenha == 'SG');
        this.ultimaSenha = 'SG';
        this.senhasService.ultimasSenhas.push(this.senhaEmAtendimento);
        return;
      }
      console.log(this.senhaExame);
      console.log();
      
      console.log(1);
      this.senhaEmAtendimento = {...this.senhasService.senhasOrdenadas.shift()};
      this.ultimaSenha = this.senhaEmAtendimento.tipoSenha; 
  
      this.senhasService.ultimasSenhas.push(this.senhaEmAtendimento);
    })
    
  }

  encerrarSenha() {
    this.botaoEstaDesabilitado = false;
  }
}
