import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { SignupService } from '@services/signup/signup.service';
import { FieldsValidators } from '@typing/fieldsValidators/fieldsValidators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pod-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {

  private unsubscriber = new Subject();

  formValues = {
    name: '',
    email: '',
    password: '',
    repeatedPassword: ''
  };

  readonly signupTotalSteps = 2;
  readonly passwordMinSize = 8;

  passwordDoNotMatch = false;
  currentStep = 1;


  steps = [
    { active: true, name: 'Personal Data', finished: false },
    { active: false, name: 'Password', finished: false },
  ]

  fieldsValidators: FieldsValidators = {
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
    }],
    password: [
      {
        validationName: 'required',
        validationErrorMessage: 'Campo obrigatório'
      },
      {
        validationName: 'minLength',
        validatorRequiredParameter: this.passwordMinSize,
        validationErrorMessage: `A senha precisa ter pelo menos 8 caracteres`
      }
    ]
  };

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.activeStep(this.currentStep);
  }

  submit(event: Event, fields: FormFieldComponent[]) {

    if (!this.validateBeforeGoToNextStep(event, fields)) return;

    if (this.passwordDoNotMatch) return;

    const [password, repeatedPassword] = fields.map(field => field.value);

    this.formValues = { ...this.formValues, password, repeatedPassword };

    const { name, email, password: pass } = this.formValues;

    const signupData = { name, email, password: pass };

    this.finishCurrentStep();

    // TODO: finish user flow after signin up 

    this.signupService.signup(signupData).pipe(takeUntil(this.unsubscriber)).subscribe(user => console.log(user));

  }

  checkPasswordMatch(password: string | Event, repeatedPassword: string | Event) {

    const isEvent = password instanceof Event || repeatedPassword instanceof Event;

    if (!isEvent) {

      const pass = password.toString()
      const repeatedPass = repeatedPassword.toString();

      const minSizeValid = (pass.length + repeatedPass.length) >= this.passwordMinSize * 2;

      const passwordsMatch = pass === repeatedPass;

      this.formValues = { ...this.formValues, password: pass, repeatedPassword: repeatedPass };

      if ((!passwordsMatch) && minSizeValid) {
        this.passwordDoNotMatch = true;
        return;
      }

      this.passwordDoNotMatch = false;
    }
  }

  nextStep(event: Event, fields: FormFieldComponent[]) {

    if (!this.validateBeforeGoToNextStep(event, fields)) return;

    this.finishCurrentStep();
    
    const goToNextStep = () => {

      this.currentStep += 1;
      this.activeStep(this.currentStep)
    }

    
    const [name, email] = fields.map(field => field.input.value);
    
    this.formValues = { ...this.formValues, name, email };

    goToNextStep();
  }

  validateBeforeGoToNextStep(event: Event, fields: FormFieldComponent[]) {

    event.preventDefault()

    const someFieldIsInvalid = fields.filter(field => field.input.invalid);

    if (!!someFieldIsInvalid.length) someFieldIsInvalid[0].fieldRef.nativeElement.focus();

    return !someFieldIsInvalid.length;
  }

  prevStep(event: Event) {
    event.preventDefault();

    const enablePreviousStep = () => {

      this.currentStep -= 1;
      this.activeStep(this.currentStep)
      this.steps[this.currentStep - 1].finished = false;
    }

    this.disableStep(this.currentStep);
    enablePreviousStep();
  }

  activeStep(step: number) {
    this.steps[step - 1].active = true;
  }

  disableStep(step: number) {
    this.steps[step - 1].active = false;
  }

  finishCurrentStep(){
    this.steps[this.currentStep - 1].finished = true;
  }
  

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
