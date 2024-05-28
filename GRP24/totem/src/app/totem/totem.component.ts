import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.scss']
})
export class TotemComponent implements OnInit {
  senha: string = '';
  senhaEmitida: boolean = false;
  senhaChamada: boolean = false;

  constructor(private senhasService: SenhasService) { }

  ngOnInit() {
    // Verificar se a senha foi chamada quando o componente é inicializado
    this.verificarChamada();
  }

  emitirSenha() {
    this.senha = this.senhasService.novaSenha();
    this.senhaEmitida = true;
  }

  // Método para verificar se a senha foi chamada no painel
  verificarChamada() {
    // Aqui você precisa implementar a lógica para verificar se a senha foi chamada
    // Isso pode ser feito através de uma chamada ao serviço ou qualquer outro método que você esteja usando para rastrear as senhas chamadas
    // Por enquanto, vamos apenas simular que a senha foi chamada após 5 segundos
    setTimeout(() => {
      this.senhaChamada = true;
    }, 5000);
  }
}
