import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first, take, takeLast } from 'rxjs/operators';
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
      active: false
    },
    {
      text: 'Studio',
      link: '/studio',
      active: false
    },
    {
      text: 'Sign In',
      link: '/account',
      active: false,
      className: '--signin'
    }];

  currentUrl = "";

  constructor(private route: Router) {

    this.subscription = this.route.events
      .subscribe(event => event instanceof NavigationEnd ? this.currentUrl = event.url : '');
  }

  selectItem(itemToActive: string, itemLink: string) {
    this.menuItems.map(item => {
      itemToActive === item.text ? item.active = true : item.active = false;
    });

    this.route.navigate([itemLink]);

  }

  activeItemByUrl(item: MenuType){
    return this.currentUrl.includes(item.link);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
