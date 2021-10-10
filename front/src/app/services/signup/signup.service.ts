import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestData, SignupResponseData } from './types/signup.service.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(private http: HttpClient) { }

  signup(userData: SignupRequestData) {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/sign-up`

    return this.http.post<SignupResponseData>(requestUrl, userData);
  }

}
