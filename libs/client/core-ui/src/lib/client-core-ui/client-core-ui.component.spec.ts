import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCoreUiComponent } from './client-core-ui.component';

describe('ClientCoreUiComponent', () => {
  let component: ClientCoreUiComponent;
  let fixture: ComponentFixture<ClientCoreUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientCoreUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCoreUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
