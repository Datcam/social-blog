import { Injectable } from "@angular/core";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authorizationService.isLoggedInUser()) {
      this.router.navigate(['posts'])
      return false;
    } else {
      return true;
    }
  }
}
