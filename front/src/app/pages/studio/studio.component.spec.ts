import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonControlModule } from '@components/button-control/button-control.module';
import { CardsContainerModule } from '@components/cards-container/cards-container.module';
import { FloatButtonModule } from '@components/float-button/float-button.module';
import { TabModule } from '@components/tab/tab.module';
import { StudioComponent } from './studio.component';


describe('StudioComponent', () => {
  let component: StudioComponent;
  let fixture: ComponentFixture<StudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudioComponent],
      imports: [
        TabModule,
        ButtonControlModule,
        CardsContainerModule,
        RouterTestingModule,
        FloatButtonModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
