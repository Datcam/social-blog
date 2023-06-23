import { Injectable } from "@angular/core";
import {CanLoad, Route, UrlSegment, CanActivate} from "@angular/router";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CanLoadGuard implements CanLoad {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.authorizationService.isLoggedInUser()) {
      this.router.navigate(['login'])
      return false;
    } else {
      return true;
    }
  }
}
