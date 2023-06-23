import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AuthorizationService} from "../../../services/authorization.service";
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../interfaces/post.interface";
import {concatMap, from, map, switchMap, toArray} from "rxjs";
import {UsersService} from "../../../services/users.service";
import {IUsers} from "../../../interfaces/users.interface";
import { IComment } from "../../../interfaces/comment.interface";
import {CommentService} from "../../../services/comment.service";
import {TableModeEnum} from "../../../enums/table-mode.enum";
import {randomInteger} from "../../../helpers/randon-number.helper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as stream from "stream";

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss'],
})
export class DetailsPostComponent implements OnInit {
  public postId: string | null | undefined;
  public post: IPost | undefined;
  public userName: string | null = '';
  public userFromPost: IUsers | undefined;
  public commentList: IComment[] | undefined;
  public tableMode = TableModeEnum;
  public showSpinner = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private userService: UsersService,
    private postService: PostService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
  ) {}

  public commentForm = this.buildForm();

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      id: randomInteger(1, 100000),
      userId: this.authorizationService.getUserId(),
      postId: this.activatedRoute.snapshot.paramMap.get('id'),
      body: ['', [Validators.maxLength(300), Validators.required]],
    });
  }

  public resetForm(): void {
    this.commentForm?.markAsPristine();
    this.commentForm?.markAsUntouched();
    this.commentForm = this.buildForm();
  }

  public submit(): void {
    this.showSpinner = true;
    this.commentService.postCommentsByPostId(this.commentForm.value).subscribe(() => {
      this.resetForm();
      this.showSpinner = false;
      this.getCommentsByPostId();
    })
  }

  public ngOnInit(): void {
    this.userName = this.authorizationService.getUserName();
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.postId) {
      this.postService.getPostById(this.postId)
        .pipe(
          switchMap((post: IPost) => {
            this.post = post;
            return this.userService.getUserById(post.userId);
          })
        )
        .subscribe((user: IUsers[]) => {
          this.userFromPost = user[0];
        });

      this.getCommentsByPostId();
    }
  }

  public getCommentsByPostId(): void {
    this.commentService.getCommentsByPostId(this.postId)
      .subscribe((comments: IComment[]) => {
        from(comments)
          .pipe(
            concatMap((obj: IComment) => this.userService.getUserById(obj.userId)
              .pipe(
                map((user: IUsers[]) => ({
                  userId: obj.userId,
                  id: obj.id,
                  postId: obj.postId,
                  body: obj.body, user
                })))),
            map((result): IComment => {
              return {
                userId: result.userId,
                id: result.id,
                postId: result.postId,
                body: result.body,
                user: result.user[0]
              }
            }),
            toArray()
          )
          .subscribe((comments) => {
            this.commentList = comments;
          });
      })
  }
}
