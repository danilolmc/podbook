import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestData, SignupResponseData } from './types/signup.service.types';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  signup(userData: SignupRequestData) {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/sign-up`

    return this.http
      .post<SignupResponseData>(requestUrl, userData, { observe: 'response' })
      .pipe(tap(res => {

        const authToken = <string> res.headers.get('x-auth-token');

        this.userService.setToken(authToken);

      }));
  }

}
