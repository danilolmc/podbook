import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlButtonStyleStrategy } from '@stratergy/Control-button/control-button-strategy';
import { ButtonControlComponent } from './button-control.component';


const callback = () => { };

describe('ButtonControlComponent', () => {
  let component: ButtonControlComponent;
  let fixture: ComponentFixture<ButtonControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonControlComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set callback function', () => {

    component.callback = callback;

    expect(component.callBackFunction).toBe(callback);
  })

  it('should execute callback', () => {

    component.callback = jest.fn(callback);

    const callbackFn = component.callBackFunction;
    const toggleFunctionSpy = jest.spyOn(component, 'toggleControl');

    component.executeCallback();

    expect(callbackFn).toHaveBeenCalled();
    expect(toggleFunctionSpy).toHaveBeenCalled();
  })

  it('should toggle control status', () => {
    component.isOn = false;
    component.toggleControl();
    expect(component.isOn).toBeTruthy();

    component.isOn = true;
    component.toggleControl();
    expect(component.isOn).toBeFalsy();
  })

  it('should switch isOn to false when its true and toggleControl is called', () => {
    component.isOn = true;

    component.toggleControl();

    expect(component.isOn).toBeFalsy()
  })

  it('should switch isOn to true when its false and toggleControl is called', () => {
    component.isOn = false;

    component.toggleControl();

    expect(component.isOn).toBeTruthy()
  })

  it('should get --on css class when isOn is true', () => {
    component.isOn = true;

    const cssClass = component.currentStyleClass;

    expect(cssClass).toBe(ControlButtonStyleStrategy[1])
  })

  it('should get --off css class when isOn is false', () => {
    component.isOn = false;

    const cssClass = component.currentStyleClass;

    expect(cssClass).toBe(ControlButtonStyleStrategy[0])
  })

  it('should get first icon from onOffIcons when isOn is false', () => {
    component.isOn = false;

    component.onOffIcons = ['icon1', 'icon2'];

    const currentIcon = component.currentIcon;

    expect(currentIcon).toBe(component.onOffIcons[0]);
  })

  it('should get last icon from onOffIcons when isOn is true', () => {
    component.isOn = true;

    component.onOffIcons = ['icon1', 'icon2'];

    const currentIcon = component.currentIcon;

    expect(currentIcon).toBe(component.onOffIcons[1]);
  })

});
