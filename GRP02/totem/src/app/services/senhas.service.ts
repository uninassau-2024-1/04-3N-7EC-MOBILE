import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
 

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string ='';

senhasArray: { [key: string]: string[] } = { SG: [], SP: [], SE: [] };


constructor() { }

somaGeral() { this.senhasGeral++;this.senhasTotal++; }
somaPrior() { this.senhasPrior++;this.senhasTotal++; }
somaExame() { this.senhasExame++;this.senhasTotal++; }
 
  novaSenha(tipoSenha: string = ''){
    if (tipoSenha=='SG'){
     this.somaGeral();
     this.inputNovaSenha= 
     new Date().getFullYear().toString().substring(2,4)+
     new Date().getMonth().toString().padEnd(2,'0')+
     new Date().getDate().toString().padStart(2,'0')+
     '-'+
     tipoSenha+
     (this.senhasArray['SG'].length+1).toString().padStart(2, '0');
     this.senhasArray['SG'].push(this.inputNovaSenha);
    } 
    else  if (tipoSenha=='SP'){
     this.somaPrior();
     this.inputNovaSenha= 
     new Date().getFullYear().toString().substring(2,4)+
     new Date().getMonth().toString().padEnd(2,'0')+
     new Date().getDate().toString().padStart(2,'0')+
     '-'+
     tipoSenha+
     (this.senhasArray['SP'].length+1).toString().padStart(2, '0');
     this.senhasArray['SP'].push(this.inputNovaSenha);
    } 
    else  if (tipoSenha=='SE'){
     this.somaExame();
     this.inputNovaSenha= 
     new Date().getFullYear().toString().substring(2,4)+
     new Date().getMonth().toString().padEnd(2,'0')+
     new Date().getDate().toString().padStart(2,'0')+
     '-'+
     tipoSenha+
     (this.senhasArray['SE'].length+1).toString().padStart(2, '0');
    this.senhasArray['SE'].push(this.inputNovaSenha);
    }
     } 

  emitirSenha(){
    // console.log(this.senhasArray);
    console.log('Senhas SG:', this.senhasArray['SG']);
    console.log('Senhas SP:', this.senhasArray['SP']);
    console.log('Senhas SE:', this.senhasArray['SE']);
   }

  chamarSenha(){
    //
  }
  
  
}