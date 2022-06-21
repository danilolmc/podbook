import { Injectable } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { UserRawData, UserToken } from '@typing/user/user';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<UserToken | null>(null);
  userRawDataSubject = new BehaviorSubject<UserRawData | null>(null);

  constructor(private tokenService: TokenService) {
    const hasToken = this.tokenService.hasToken();

    if(!hasToken) return;

    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getUserRawData() {
    return this.userRawDataSubject.value;
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  decodeAndNotify() {

    const token = <string>this.tokenService.getToken();
    const { user_id, email, name } = jwtDecode(token) as UserRawData;

    this.userSubject.next({user_id, email});
    this.userRawDataSubject.next({user_id, email, name});
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
    this.userRawDataSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }
}
