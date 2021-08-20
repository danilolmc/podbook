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

  it('should call callback function passed by in parameter', () => {

    const myObj = {
 
      log(){
       return 'test';
      }
    }

    const spyLogFunction = jest.spyOn(myObj, 'log');

    component.callback = myObj.log;
    
    component.callback();

    expect(spyLogFunction).toHaveBeenCalled();

  })
});
