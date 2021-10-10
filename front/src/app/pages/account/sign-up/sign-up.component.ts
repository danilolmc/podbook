import { isNgContainer } from '@angular/compiler';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { SignupService } from '@services/signup/signup.service';

@Component({
  selector: 'pod-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

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

    if(this.passwordDoNotMatch) return;

    const [password, repeatedPassword] = fields.map(field => field.input.value);

    this.formValues = { ...this.formValues, password, repeatedPassword };

    const { name, email, password : pass } = this.formValues

    const signupData = { name, email, password: pass };

    this.signupService.signup(signupData).subscribe(user => console.log(user));

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

    const goToNextStep = () => {
      this.currentStep += 1;
      this.activeStep(this.currentStep)
    }

    goToNextStep();

    const [name, email] = fields.map(field => field.input.value);

    this.formValues = { ...this.formValues, name, email };
  }

  validateBeforeGoToNextStep(event: Event, fields: FormFieldComponent[]) {

    event.preventDefault()

    const allFieldsIsValid = fields.every(field => field.input.valid);

    const invalidField = fields.filter(field => field.input.invalid);

    if (!!invalidField.length) invalidField[0].fieldRef.nativeElement.focus();

    if (!allFieldsIsValid) return false;

    return allFieldsIsValid;
  }

  prevStep(event: Event) {
    event.preventDefault();

    const enablePreviousStep = () => {

      this.currentStep -= 1;
      this.activeStep(this.currentStep)
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
}
