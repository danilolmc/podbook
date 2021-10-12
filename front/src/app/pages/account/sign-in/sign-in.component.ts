import { Component } from '@angular/core';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { SigninService } from '@services/signin/signin.service';
import { FieldsValidators } from '@typing/fieldsValidators/fieldsValidators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pod-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  private unsubscriber = new Subject();

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

  constructor(private signinService: SigninService) { }

  submit(event: Event, credentials: FormFieldComponent[]) {

    event.preventDefault();

    const credentialsIsValid = this.validateSignInValues(credentials);

    if (!credentialsIsValid) return;

    const [email, password] = credentials.map(field => field.value);


    // TODO: make user flow after signin up 
    
    this.signinService
      .signin({ email, password })
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(response => {
        console.log(response)
      });
  }


  validateSignInValues(fields: FormFieldComponent[]) {

    const someFieldIsInvalid = fields.filter(field => field.input.invalid);

    if (!!someFieldIsInvalid.length) someFieldIsInvalid[0].fieldRef.nativeElement.focus();

    return !someFieldIsInvalid.length;
  }
}
