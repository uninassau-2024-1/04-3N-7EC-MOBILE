import { Component, OnInit } from '@angular/core';
import { SenhasService } from './services/senhas.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private senhasService: SenhasService) {}

  ngOnInit() {
    this.senhasService.iniciarExpediente();
  }
}
