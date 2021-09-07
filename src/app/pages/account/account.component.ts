import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pod-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent{

  tabSignInCallback = () => {
    this.route.navigate(['account'])
    this.currentUrl = '/account'
  };
  tabSignUpCallback = () => {
    this.route.navigate(['/account/sign-up']);
    this.currentUrl = '/account/sign-up'
  };

  currentUrl = '';

  constructor(private route: Router) { }


  isSelected(url: string) {
    return this.currentUrl === url;
  }

}
