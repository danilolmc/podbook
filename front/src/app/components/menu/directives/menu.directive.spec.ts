import { Inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MenuDirective } from './menu.directive';

describe('MenuDirective', () => {
  it('should create an instance', () => {
    const directive = new MenuDirective();
    expect(directive).toBeTruthy();
  });
});
