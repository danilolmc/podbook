import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('card should have class --default when cardType its default', () => {
    component.cardType = 'default';

    const selector = `.${component.selector}`;    
    const cardWrapper : HTMLDivElement = fixture.debugElement.query(By.css(selector)).nativeElement;
    
    component.getCardTypeClass();
    fixture.detectChanges();

    expect(cardWrapper.classList.contains(component.getCardTypeClass())).toBeTruthy();
  });

  it('card should have class --inline when cardType its inline', () => {
    component.cardType = 'inline';

    const selector = `.${component.selector}`;    
    const cardWrapper : HTMLDivElement = fixture.debugElement.query(By.css(selector)).nativeElement;
    
    component.getCardTypeClass();
    fixture.detectChanges();

    expect(cardWrapper.classList.contains(component.getCardTypeClass())).toBeTruthy();
  });
});
