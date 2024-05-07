import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  itens: string[] = ['Item 1', 'Item 2', 'Item 3'];

  constructor() { }

  senhas = [
    {
      icon: 'accessibility',
      color: 'primary',
      senha: '240401-SP01',
      tm_geracao: '2024-04-01 19:10:09',
    },
    {
      icon: 'document',
      color: 'warning',
      senha: '240401-SE01',
      tm_geracao: '2024-04-01 19:10:09',
    },
    {
      icon: 'home',
      color: 'dark',
      senha: '240401-SG01',
      tm_geracao: '2024-04-01 19:10:09',
    },
  ]
}
