import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhas: any[] = [];
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhaArray: { [key: string]: string[] } = {
    'SG': [],
    'SP': [],
    'SE': []
  };

  constructor() { }

  adicionarSenha(senha: any) {
    this.senhas.push(senha);
  }

  
}
