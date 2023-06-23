/**
 * This class is to work with Authorized users
 */
import { Injectable } from "@angular/core";
import {IUsers} from "../interfaces/users.interface";
import {Observable, of, delay, tap} from 'rxjs';
import { STORAGE_MODE } from "../constants/local-seccion-storage.constant";

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  /**
   * This method saves user to local or session storage to keep user logged in
   *
   * @param user full user data
   * @param mode two modes local and session storage
   *
   * @return void
   */
  public saveUserToStorage(user: IUsers[], mode: number): void {
    if (mode === STORAGE_MODE.LOCAL) {
      localStorage.setItem('id', user[0].id);
      localStorage.setItem('name', user[0].name);
      localStorage.setItem('email', user[0].email);
      localStorage.setItem('password', user[0].password);
    } else if (mode === STORAGE_MODE.SESSION) {
      sessionStorage.setItem('id', user[0].id);
      sessionStorage.setItem('name', user[0].name);
      sessionStorage.setItem('email', user[0].email);
      sessionStorage.setItem('password', user[0].password);
    }
  }

  /**
   * This method logouts user
   *
   * @return Observable true to subscribe after all data will be cleaned
   */
  public logout(): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => {
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('password');

          sessionStorage.removeItem('id');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('password');
        }),
        delay(1000),
      );
  }

  /**
   * This method returns name from local or session storage
   *
   * @return user name from local or session storage
   */
  public getUserName(): string | null {
    return localStorage.getItem('name') || sessionStorage.getItem('name');
  }

  /**
   * This method returns id from local or session storage
   *
   * @return user id from local or session storage
   */
  public getUserId(): string | null {
    return localStorage.getItem('id') || sessionStorage.getItem('id');
  }

  /**
   * This method checks whether user logged in
   *
   * @return true or false
   */
  public isLoggedInUser(): boolean {
    return !!localStorage.getItem('id') || !!sessionStorage.getItem('id')
  }
}
