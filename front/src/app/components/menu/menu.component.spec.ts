import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from '@mocks/audio-control-component/menu-component.mocks';
import { RouterStub } from '@mocks/shared/router.mocks';
import { UserService } from '@services/user/user.service';
import { MenuDirective } from './directives/menu.directive';
import { MenuComponent } from './menu.component';
import { MenuType } from './types/MenuTypes';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent, MenuDirective],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceStub
        },
        {
          provide: Router,
          useValue: RouterStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should active explore menu item by url', () => {
    const item = {
      text: 'Explore',
      link: '/explore',
      active: false
    };

    component.currentUrl = '/explore';

    expect(component.activeItemByUrl(item)).toBeTruthy();
  })

  it('should active studio menu item by url', () => {
    const item = {
      text: 'studio',
      link: '/studio',
      active: false
    };

    component.currentUrl = '/studio';

    expect(component.activeItemByUrl(item)).toBeTruthy();
  });
  
  it('should active explore menu item by its name', () => {

    const menuItems: MenuType[] = [
      {
        text: 'ExploreTest',
        link: '/exploreTest',
        active: false,
      },
      {
        text: 'StudioTest',
        link: '/podbooksTest',
        active: false
      },
    ];

    component.menuItems = menuItems;

    const { text, link } = menuItems[0];

    component.selectItem(text, link);

    expect(menuItems[0].active).toBeTruthy();
    expect(menuItems[1].active).toBeFalsy();
  });

  it('should active studio menu item by its name', () => {

    const menuItems: MenuType[] = [
      {
        text: 'ExploreTest',
        link: '/exploreTest',
        active: false,
      },
      {
        text: 'StudioTest',
        link: '/podbooksTest',
        active: false
      },

    ];

    component.menuItems = menuItems;

    const { text, link } = menuItems[1];

    component.selectItem(text, link);

    expect(menuItems[1].active).toBeTruthy();
    expect(menuItems[0].active).toBeFalsy();
  });

  it('should not active menu item when call active select function with invalid params', () => {

    const spyNavigate = jest.spyOn(router, 'navigate');

    const itemName = '';
    const itemUrl = '/studio';

    component.selectItem(itemName, itemUrl);

    expect(spyNavigate).not.toHaveBeenCalled();
  });

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
