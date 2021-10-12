import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignInRequestData, SignInResponseData } from './types/signin.service.types';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  signin(signinData: SignInRequestData) {

    console.log({ ...signinData });

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/sign-in`

    return this.http.post<SignInResponseData>(requestUrl, signinData);
  }
}
