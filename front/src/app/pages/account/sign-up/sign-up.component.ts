import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { validateFields } from '@core/validation/validation.utils';
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

  unsubscriber = new Subject();
  passwordsMatch = false;

  @ViewChild('password') passwordField!: FormFieldComponent;
  @ViewChild('repeatPassword') repeatPasswordField!: FormFieldComponent;

  formValues = {
    name: '',
    email: '',
    password: '',
    repeatedPassword: ''
  };

  readonly signupTotalSteps = 2;
  readonly passwordMinSize = 8;

  formErrorMessage = '';
  currentStep = 1;

  readonly stepMissingMessage = 'Esse passo não existe';


  steps = [
    { active: true, name: 'Personal Data', finished: false },
    { active: false, name: 'Password', finished: false }
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

  constructor(
    private signupService: SignupService,
    private router: Router) { }

  ngOnInit() {

    this.steps.map((step, index) => {
      if (index + 1 < this.currentStep) {
        step.active = true;
        step.finished = true;
      }
    })
    this.activeStep(this.currentStep);
  }

  submit(event: Event, fields: FormFieldComponent[]) {

    const itCanNotSubmit = [
      !this.validateBeforeGoToNextStep(event, fields),
      !Boolean(this.formErrorMessage === ''),
      !this.passwordsMatch].some(condition => condition === true);


    if (itCanNotSubmit) return;

    const [password, repeatedPassword] = fields.map(field => field.value);

    this.formValues = { ...this.formValues, password, repeatedPassword };

    const { name, email, password: pass } = this.formValues;

    const signupData = { name, email, password: pass };

    this.signupService.signup(signupData)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((response: any) => {
        if (response.body.auth) this.router.navigate(['/podbooks'])
      },
        ({ error }) => this.formErrorMessage = error.message
      );

  }

  checkPasswordMatch(password: string, repeatedPassword: string) {

    const pass = password.toString()
    const repeatedPass = repeatedPassword.toString();

    const minSizeValid = (pass.length >= this.passwordMinSize && repeatedPass.length >= this.passwordMinSize);

    const passwordsMatch = pass === repeatedPass;

    this.formValues = { ...this.formValues, password: pass, repeatedPassword: repeatedPass };

    this.passwordsMatch = passwordsMatch;

    if (!minSizeValid || this.passwordsMatch) {

      this.formErrorMessage = '';
    }

    if (minSizeValid && !this.passwordsMatch) {

      this.formErrorMessage = 'As senhas estão diferentes';
    }

  }

  nextStep(event: Event, fields: FormFieldComponent[]) {

    if (!this.validateBeforeGoToNextStep(event, fields)) return;

    this.finishCurrentStep(this.currentStep);

    const goToNextStep = () => {

      this.currentStep += 1;
      this.activeStep(this.currentStep);
      setTimeout(() => this.passwordField.fieldRef.nativeElement.focus(), 10)
    }

    const [name, email] = fields.map(field => field.input.value);

    this.formValues = { ...this.formValues, name, email };

    goToNextStep();
  }

  validateBeforeGoToNextStep(event: Event, fields: FormFieldComponent[]) {

    event.preventDefault()

    return validateFields(fields);
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
    if (step > this.steps.length || step < 1) {
      return this.stepMissingMessage;
    };

    this.steps[step - 1].active = true;
    return;
  }

  disableStep(step: number) {
    if (step > this.steps.length || step < 1) {
      return this.stepMissingMessage;
    };

    this.steps[step - 1].active = false;
    return;
  }

  finishCurrentStep(currentStep: number) {
    if (currentStep > this.steps.length || currentStep < 1) {
      return this.stepMissingMessage;
    };

    this.steps[currentStep - 1].finished = true;
    return;
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
