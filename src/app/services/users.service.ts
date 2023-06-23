/**
 * This class is to work with Users
 */

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { IUsers } from "../interfaces/users.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
  ) {}

  /**
   * This method returns  all users
   *
   * @return Observable with users data set
   */
  public getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`http://localhost:3000/users`);
  }

  /**
   * This method returns user by name
   *
   * @param name to find user in the database
   *
   * @return Observable with user data set
   */
  public getUserByName(name: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`http://localhost:3000/users?name=${name}`);
  }

  /**
   * This method return s user by id
   *
   * @param id of searched user
   *
   * @return Observable with user data set
   */
  public getUserById(id: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`http://localhost:3000/users?id=${id}`);
  }

  /**
   * This method signs up user in system
   *
   * @param body object with all data of user
   *
   * @return Observable with user data set
   */
  public signUpUser(body: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(`http://localhost:3000/users`, body);
  }
}
