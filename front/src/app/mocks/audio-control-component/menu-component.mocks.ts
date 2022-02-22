import { UserRawData, UserToken } from '@typing/user/user';
import { BehaviorSubject, of } from 'rxjs';


class TokenService {

    token = '';

    setToken(token: string) {
        this.token = token;
    }

    removeToken() {
        this.token = '';
    }

    hasToken() {
        return !!this.token;
    }
}


export const UserServiceStub = {

    userSubject: new BehaviorSubject<UserToken | null>(null),
    userRawDataSubject: new BehaviorSubject<UserRawData | null>(null),

    tokenService: new TokenService(),

    getUser() {
        return of('user');
    },
    getUserRawDat() {
        return 'userData';
    },

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    },

    decodeAndNotify() { },

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
        this.userRawDataSubject.next(null);
    },

    isLogged() {
        return this.tokenService.hasToken();
    }
}
