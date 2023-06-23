import {Component, OnInit} from '@angular/core';
import { AuthorizationService } from "../../services/authorization.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {IPost} from "../../interfaces/post.interface";
import {randomInteger} from "../../helpers/randon-number.helper";
import { PostService } from "../../services/post.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  public userName: string | null = '';
  public showSpinner = false;

  constructor(
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) {}

  public newPostForm: FormGroup = this.formBuilder.group({
    id: randomInteger(1, 100000),
    userId: this.authorizationService.getUserId(),
    title: ['', [Validators.maxLength(50), Validators.required]],
    body: ['', [Validators.maxLength(300), Validators.required]],
  });

  public ngOnInit(): void {
    this.userName = this.authorizationService.getUserName();
  }

  public submit(): void {
    this.showSpinner = true;
    this.postService.createPost(this.newPostForm.value).subscribe((post:IPost) => {
      this.resetForm();
      this.showSpinner = false;
      this.router.navigate(['posts']);
    })
  }

  public resetForm(): void {
    this.newPostForm.markAsPristine();
    this.newPostForm.markAsUntouched();
    this.newPostForm.reset();
  }

  get titleMaxLength(): boolean | undefined {
    return this.newPostForm.get('title')?.hasError('maxlength');
  }

  get bodyMaxLength(): boolean | undefined {
    return this.newPostForm.get('body')?.hasError('maxlength');
  }
}
