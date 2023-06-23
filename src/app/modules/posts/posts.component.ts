import {Component, OnInit} from '@angular/core';
import { AuthorizationService } from "../../services/authorization.service";
import {IPost} from "../../interfaces/post.interface";
import { PostService } from "../../services/post.service";
import { mergeMap, from, map, switchMap, forkJoin, toArray, concatMap } from "rxjs";
import {UsersService} from "../../services/users.service";
import {IUsers} from "../../interfaces/users.interface";
import {TableModeEnum} from "../../enums/table-mode.enum";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public userName: string | null = '';
  public postList: { id: any; title: any; body: any; userId: number; user: any; }[] | undefined;
  public tableMode = TableModeEnum;

  constructor(
    private authorizationService: AuthorizationService,
    private postService: PostService,
    private userService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.userName = this.authorizationService.getUserName();
    this.postService.getPosts()
      .subscribe((posts: IPost[]) => {
        from(posts)
          .pipe(
            concatMap((obj) => this.userService.getUserById(obj.userId)
              .pipe(
                map((user) => ({
                  userId: obj.userId,
                  id: obj.id,
                  title: obj.title,
                  body: obj.body, user
                })))),
            map((result) => ({
              userId: parseInt(result.userId),
              id: result.id,
              title: result.title,
              body: result.body,
              user: result.user[0]
            })),
            toArray()
          )
          .subscribe((posts) => {
            this.postList = posts;
          });
      })
  }
}
