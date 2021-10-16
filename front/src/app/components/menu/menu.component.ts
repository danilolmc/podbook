import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MenuType } from './types/MenuTypes';

@Component({
  selector: 'pod-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {

  private subscription: Subscription;

  menuItems: MenuType[] = [
    {
      text: 'Explore',
      link: '/explore',
      active: false,
    },
    {
      text: 'Studio',
      link: '/podbooks',
      active: false
    },

  ];

  currentUrl = "";

  get userAuthenticated() {
    return this.userService.getUser();
  }

  constructor(private route: Router, private userService: UserService) {

    this.subscription = this.route.events
      .subscribe(event => event instanceof NavigationEnd ? this.currentUrl = event.url : '');
  }

  selectItem(itemToActive: string, itemLink: string) {
    this.menuItems.map(item => {
      itemToActive === item.text ? item.active = true : item.active = false;
    });

    this.route.navigate([itemLink]);

  }

  activeItemByUrl(item: MenuType) {
    return this.currentUrl.includes(item.link);
  }

  logout(){
    this.userService.logout();
    this.route.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
