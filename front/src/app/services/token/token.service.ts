import { Injectable } from '@angular/core';

const localStorageKey = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return window.localStorage.getItem(localStorageKey);
  }

  setToken(token: string) {
    window.localStorage.setItem(localStorageKey, token);
  }

  removeToken() {
    window.localStorage.removeItem(localStorageKey);
  }
}
