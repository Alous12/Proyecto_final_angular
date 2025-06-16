import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoEncontrontadaComponent } from './pagina-no-encontrontada.component';

describe('PaginaNoEncontrontadaComponent', () => {
  let component: PaginaNoEncontrontadaComponent;
  let fixture: ComponentFixture<PaginaNoEncontrontadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEncontrontadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNoEncontrontadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
