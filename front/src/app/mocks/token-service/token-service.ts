
export let fakeLocalStorage = {} as any;

const localStorageKey = 'authToken';

export class TokenServiceStub {

    hasToken() {
        return !!this.getToken();
    }

    getToken() {
        return fakeLocalStorage[localStorageKey];
    }

    setToken(token: string) {
        fakeLocalStorage = {
            [localStorageKey]: token
        };
    }

    removeToken() {
        const { authToken, ...rest } = fakeLocalStorage;
        fakeLocalStorage = rest;
    }
}
