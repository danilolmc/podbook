import { Component } from '@angular/core';

@Component({
  selector: 'pod-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  readonly signupTotalSteps = 2;

  steps = [
    { active: true, name: 'Personal Data' },
    { active: false, name: 'Password' },
  ]

  fieldsValidators = {
    name: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
    email: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    },
    {
      validationName: 'email',
      validationErrorMessage: 'Email inválido'
    }]
  };

  currentStep = 1;

  nextStep(event: Event) {
    event.preventDefault();
    this.currentStep += 1;
    this.steps[this.currentStep - 1].active = true;
  }

  prevStep(event: Event) {
    event.preventDefault();
    this.steps[this.currentStep - 1].active = false;
    this.currentStep -= 1;
    this.steps[this.currentStep - 1].active = true;

  }
}
