import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from '@mocks/audio-control-component/menu-component.mocks';
import { RouterStub } from '@mocks/shared/router.mocks';
import { UserService } from '@services/user/user.service';
import { MenuDirective } from './directives/menu.directive';
import { MenuComponent } from './menu.component';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let userService: UserService;
  let router: Router;
  let loaction: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent, MenuDirective],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceStub
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should active item by url', () => {
    const item = {
      text: 'Explore',
      link: '/explore',
      active: false
    };

    component.currentUrl = '/explore';

    expect(component.activeItemByUrl(item)).toBeTruthy();
  })

  it('should unsubscribe from obervable when destroy component', () => {
    const unsubscriptionSpy = jest.spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscriptionSpy).toHaveBeenCalled();
  })

  it('should logout navigate to signin page', () => {
    
    const spyRouterNavigate = jest.spyOn(router, 'navigate');

    component.logout();

    expect(spyRouterNavigate).toHaveBeenCalledWith(["/sign-in"]);
  })

  it('should logout call userService logout method', () => {

    const spyOnUserServiceLogout = jest.spyOn(userService, 'logout');

    component.logout();

    expect(spyOnUserServiceLogout).toHaveBeenCalled();
  })
});
