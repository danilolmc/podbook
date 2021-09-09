import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pod-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  readonly signupTotalSteps = 2;

  steps = [
    {active: true, name: 'Personal Data'},
    {active: false, name: 'Password'},
  ]

  currentStep = 1;

  nextStep(event: Event){
    event.preventDefault();
    this.currentStep +=1;
    this.steps[this.currentStep - 1].active = true;
  }
  
  prevStep(event: Event){
    event.preventDefault();
    this.steps[this.currentStep - 1].active = false;
    this.currentStep -=1;
    this.steps[this.currentStep - 1].active = true;

  }
}
