import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open combobox', () => {
    component.isOpen = false;

    component.openCombobox();

    expect(component.isOpen).toBeTruthy();
  })

  it('should close combobox', () => {
    component.isOpen = true;

    component.closeCombobox();

    expect(component.isOpen).toBeFalsy();
  })

  it('should toggleSelect call openCombobox when isOpen is false', () => {
    component.isOpen = false;
    
    const openComboboxSpy = jest.spyOn(component, 'openCombobox');
    const closeComboboxSpy = jest.spyOn(component, 'closeCombobox');
    
    component.toggleSelect();
    
    expect(component.isOpen).toBeTruthy();
    expect(openComboboxSpy).toHaveBeenCalled();
    expect(closeComboboxSpy).not.toHaveBeenCalled();
  })
  
  it('should toggleSelect call closeCombobox when isOpen is true', () => {
    component.isOpen = true;
    
    const openComboboxSpy = jest.spyOn(component, 'openCombobox');
    const closeComboboxSpy = jest.spyOn(component, 'closeCombobox');

    component.toggleSelect();

    expect(component.isOpen).toBeFalsy();
    expect(openComboboxSpy).not.toHaveBeenCalled();
    expect(closeComboboxSpy).toHaveBeenCalled();
  })

  it('should call required when required input property is set true', ()=> {

    component.required = true;

    component.ngOnInit();

    expect(component.input.validator).toBeDefined()
  })
});
