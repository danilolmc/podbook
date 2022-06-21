import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if exists a token at localstorage and return false when it does not', () => {
    jest.spyOn(service, 'getToken').mockReturnValue('');
    const hasToken = service.hasToken();

    expect(hasToken).toBeFalsy();
  })

  it('should check if exists a token at localstorage and return false when it does', () => {
    jest.spyOn(service, 'getToken').mockReturnValue('randomtoken');
    const hasToken = service.hasToken();

    expect(hasToken).toBeTruthy();
  })

  it('should return token from localStorage', () => {

    const tokenRandom = 'randomtoken';

    service.setToken(tokenRandom);

    const token = service.getToken();

    expect(token).toBe(tokenRandom);
  })

  it('should set a token value to localStorage', () => {

    const tokenRandom = 'randomtoken';

    const spySetToken = jest.spyOn(service, 'setToken');
    service.setToken(tokenRandom);

    const token = service.getToken();

    expect(spySetToken).toHaveBeenCalledWith(tokenRandom);
    expect(token).toBe(tokenRandom);
  })

  it('should remove token from localStorage', () => {

    const tokenRandom = 'randomtoken';

    service.setToken(tokenRandom);

    service.removeToken();

    const token = service.getToken();

    expect(token).toBeNull();
  })
});
