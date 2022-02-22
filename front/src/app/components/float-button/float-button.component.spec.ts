import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatButtonComponent } from './float-button.component';

describe('FloatButtonComponent', () => {
  let component: FloatButtonComponent;
  let fixture: ComponentFixture<FloatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call callback function passed on parameter', () => {

    const fn = jest.fn(() => 'test');

    component.callback = fn;
    
    component.executeCallback();

    expect(fn).toHaveBeenCalled();

  })

  it('should set callback Funcion', () => {
    const fn = jest.fn(() => 'testFn');

    component.callback = fn;

    expect(component.callback).toBe(fn);
  })

  it('should get callback Function', () => {
    const fn = () => 'test';

    component.callback = fn;

    expect(component.callback).toBe(fn);
  })
});
