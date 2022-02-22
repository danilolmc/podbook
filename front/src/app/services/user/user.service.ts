import { Injectable } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { UserRawData, UserToken } from '@typing/user/user';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserToken | null>(null);
  private userRawDataSubject = new BehaviorSubject<UserRawData | null>(null);

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
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

  private decodeAndNotify() {

    const token = <string>this.tokenService.getToken();
    const { user_id, email, name } = <UserRawData>jwtDecode(token);

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
