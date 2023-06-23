/**
 * This class is to work with posts
 */

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPost} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * This method created a new post
   *
   * @param body with post's data
   *
   * @return Observable with created post
   */
  public createPost(body: IPost): Observable<IPost> {
    return this.http.post<IPost>(`http://localhost:3000/posts`, body);
  }

  /**
   * This method returns posts
   *
   * @return Observable with array posts
   */
  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`http://localhost:3000/posts`);
  }

  /**
   * This method returns post by id
   *
   * @param id of post
   *
   * @return Observable with post data
   */
  public getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`http://localhost:3000/posts/${id}`);
  }
}
