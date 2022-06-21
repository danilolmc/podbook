 import { TestBed } from '@angular/core/testing';
import { TokenServiceStub } from '@mocks/token-service/token-service';
import { TokenService } from '../token/token.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: TokenService,
          useClass: TokenServiceStub
        } 
      ]
    });
    service = TestBed.inject(UserService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    
    jest.spyOn(service, 'decodeAndNotify').mockImplementation(() => {});
    expect(service).toBeTruthy();
  });

  it('should check if user are logged and return false in case it does not', () => {
    const userToken = '';

    jest.spyOn(service, 'decodeAndNotify').mockImplementation(() => {});

    service.setToken(userToken);

    const userIsLogged = service.isLogged();

    expect(userIsLogged).toBeFalsy();
  });

  it('should check if user are logged and return false in case it does', () => {
    const userToken = 'randomUserToken';

    jest.spyOn(service, 'decodeAndNotify').mockImplementation(() => {});

    service.setToken(userToken);

    const userIsLogged = service.isLogged();

    expect(userIsLogged).toBeTruthy();
  });
});
