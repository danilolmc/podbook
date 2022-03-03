import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardStyleMappingEnum } from '@enums/cardComponent/CardSstyleMappingEnum';
import { CardTypeStyleStratergy } from '@stratergy/CardComponent/cardStratergy';
import { CardComponent } from './card.component';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
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
    component.cardType = CardStyleMappingEnum.DEFAULT;

    const selector = `.${component.selector}`;
    const cardWrapper: HTMLDivElement = fixture.debugElement.query(By.css(selector)).nativeElement;

    const typeClass = component.cardTypeClass;
    fixture.detectChanges();

    expect(cardWrapper.classList.contains(typeClass)).toBeTruthy();
  });

  it('card should have class --inline when cardType its inline', () => {
    component.cardType = CardStyleMappingEnum.INLINE;

    const selector = `.${component.selector}`;
    const cardWrapper: HTMLDivElement = fixture.debugElement.query(By.css(selector)).nativeElement;

    const typeClass = component.cardTypeClass;
    fixture.detectChanges();

    expect(cardWrapper.classList.contains(typeClass)).toBeTruthy();
  });


  it('should replace missing image', () => {
    component.imgUrl = 'imageurl';

    component.imgUrlMissingReplace = 'imageToReplace';

    component.handleMissingImage();

    expect(component.imgUrlMissingReplace).toBe('imageToReplace');
    expect(component.imgElement.nativeElement.classList).toContain('--image-not-found');
  })

  it('should define callbackFunction when call click with a defined callback param', () => {
    const callBackFn = () => 'fn';

    component.click = callBackFn;

    expect(component.callbackFunction).toBe(callBackFn);
  })

  it('should call defined callbackFunction', () => {
    const callBackFn = jest.fn(() => 'fn');

    component.click = callBackFn;

    component.callbackFunction();

    expect(callBackFn).toHaveBeenCalled();
  })

  it('should define generic callbackFunction when call click with a undefined param', () => {

    component.click = undefined;

    expect(component.callbackFunction).toBeDefined();
  })

  it('should return cardTypeClass equals to --inline when card style is inline', () => {
    component.cardType = CardStyleMappingEnum.INLINE;

    const typeCardClass = component.cardTypeClass;

    expect(typeCardClass).toBe(CardTypeStyleStratergy.inline);
  })
  
  it('should return cardTypeClass equals to --default when card style is default', () => {
    component.cardType = CardStyleMappingEnum.DEFAULT;
    
    const typeCardClass = component.cardTypeClass;
    
    expect(typeCardClass).toBe(CardTypeStyleStratergy.default);
  });
  
});
