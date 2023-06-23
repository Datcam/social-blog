/**
 * This class is to work with comments
 */
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {IComment} from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient,) {}

  /**
   * This method returns comments by post id
   *
   * @param id of post
   *
   * @return Observable with all comments of post
   */
  public getCommentsByPostId(id: string | null | undefined): Observable<IComment[]> {
    return this.http.get<IComment[]>(`http://localhost:3000/comments?postId=${id}`);
  }

  /**
   * This method posts comment by post id
   *
   * @param body set of comment's data
   *
   * @return Observable with comment
   */
  public postCommentsByPostId(body: any): Observable<IComment[]> {
    return this.http.post<IComment[]>(`http://localhost:3000/comments`, body);
  }
}
