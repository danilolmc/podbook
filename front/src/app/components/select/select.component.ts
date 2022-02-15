import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormFieldCommon } from '@typing/fieldsValidators/fieldsValidators';
import { Option } from './types/SelectTypes';

@Component({
  selector: 'pod-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, FormFieldCommon {

  @Output() change = new EventEmitter<Option>();

  @ViewChild('select_input') fieldRef!: ElementRef<HTMLInputElement>;

  @ViewChildren('option') optionsRef!: QueryList<ElementRef<HTMLLIElement>>;

  validationRequiredMessage = 'Nenhum item foi selecionado'

  isOpen = false;

  input = new FormControl('');

  @Input()
  options: Option[] = [];

  @Input()
  id = ''

  @Input()
  labelText = ''

  @Input()
  placeholder = ''

  @Input()
  required = false;

  value = '';

  constructor() {}

  ngOnInit(): void {
    const validators = {
      required: () => this.input.setValidators([Validators.required])
    }

    this.required && validators.required();
  
  }
  

  closeCombobox(){
    this.isOpen = false;
  }

  openCombobox(){
    this.isOpen = true;
  }

  toggleSelect() {
    this.isOpen ? this.closeCombobox() : this.openCombobox();
  }

  selectOption(option: Option) {
    this.input.setValue(option.name);
    this.value = option.cat_id;
    this.fieldRef.nativeElement.focus();
  }
}
