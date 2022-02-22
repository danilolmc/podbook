import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hasUncaughtExceptionCaptureCallback } from 'process';

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

});
