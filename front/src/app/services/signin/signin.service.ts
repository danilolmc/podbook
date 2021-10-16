import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { last, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignInRequestData, SignInResponseData } from './types/signin.service.types';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  signin(signinData: SignInRequestData) {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/sign-in`

    return this.http
      .post<any>(requestUrl, signinData, { observe: 'response' })
      .pipe(tap(res => {

        const authToken = <string> res.headers.get('x-auth-token');
  
        this.userService.setToken(authToken);

      }));
  }
}
