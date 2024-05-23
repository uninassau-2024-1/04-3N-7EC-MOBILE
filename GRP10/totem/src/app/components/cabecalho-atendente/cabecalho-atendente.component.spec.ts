import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CabecalhoAtendenteComponent } from './cabecalho-atendente.component';

describe('CabecalhoAtendenteComponent', () => {
  let component: CabecalhoAtendenteComponent;
  let fixture: ComponentFixture<CabecalhoAtendenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecalhoAtendenteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CabecalhoAtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
