import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pod-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  fieldsValidators = {
    email: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    },
    {
      validationName: 'email',
      validationErrorMessage: 'Email inválido'
    }],
    passowrd: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
  };
}
