import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsContainerModule } from '@components/cards-container/cards-container.module';
import { MyPodbooksComponent } from './my-podbooks.component';


describe('MyPodbooksComponent', () => {
  let component: MyPodbooksComponent;
  let fixture: ComponentFixture<MyPodbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPodbooksComponent ],
      imports: [CardsContainerModule, BrowserAnimationsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPodbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
