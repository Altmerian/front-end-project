import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouteReuseStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId = this.userService.currentUser?.id + '';
    const urlUserId = next.params.userId;
    return (userId === urlUserId) ? true : false;
  }
}
