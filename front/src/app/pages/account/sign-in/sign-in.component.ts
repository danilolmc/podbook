import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { validateFields } from '@core/validation/validation.utils';
import { SigninService } from '@services/signin/signin.service';
import { FieldsValidators } from '@typing/fieldsValidators/fieldsValidators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pod-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private unsubscriber = new Subject();

  private fromUrl = '';

  authenticationErrorMessage = '';

  fieldsValidators: FieldsValidators = {
    email: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    },
    {
      validationName: 'email',
      validationErrorMessage: 'Email inválido'
    }],
    password: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
  };

  constructor(
    private signinService: SigninService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => this.fromUrl = params['fromUrl']);
  }

  submit(event: Event, credentials: FormFieldComponent[]) {

    event.preventDefault();

    const credentialsIsValid = this.validateSignInValues(credentials);

    if (!credentialsIsValid) return;

    const [email, password] = credentials.map(field => field.value);

    this.signinService
      .signin({ email, password })
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(response => {
        if(response.body.authenticated) this.router.navigate(['/podbooks'])
      },
        ({ error }) => this.authenticationErrorMessage = error.message
      );
  }


  validateSignInValues(fields: FormFieldComponent[]) {

    return validateFields(fields);
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
