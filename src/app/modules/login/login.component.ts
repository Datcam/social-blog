import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {IUsers} from "../../interfaces/users.interface";
import { AuthorizationService } from "../../services/authorization.service";
import {STORAGE_MODE} from "../../constants/local-seccion-storage.constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showUserNotExists = false;
  public showUsernamePasswordIncorrect = false;
  public showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private authorizationService: AuthorizationService,
  ) {}

  public loginForm: FormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: null,
    });

  public submit(): void {
    this.showSpinner = true;

    this.usersService.getUserByName(this.loginForm.get('name')?.value).subscribe((user: IUsers[]) => {
      this.showSpinner = false;
      this.showUserNotExists = false;
      this.showUsernamePasswordIncorrect = false;

      if (!user.length) {
        this.showUserNotExists = true;
        return;
      }

      if (this.loginForm.get('password')?.value !== user[0].password) {
        this.showUsernamePasswordIncorrect = true;
        return;
      }

      if (this.loginForm.get('rememberMe')?.value) {
        this.authorizationService.saveUserToStorage(user, STORAGE_MODE.LOCAL);
      } else {
        this.authorizationService.saveUserToStorage(user, STORAGE_MODE.SESSION);
      }

      this.router.navigate(['posts']);
    });
  }

  get userNameRequired(): boolean | undefined {
    return this.loginForm.get('name')?.hasError('required');
  }

  get userNameTouched(): boolean | undefined {
    return this.loginForm.get('name')?.touched;
  }

  get passwordRequired(): boolean | undefined {
    return this.loginForm.get('password')?.hasError('required');
  }

  get passwordTouched(): boolean | undefined {
    return this.loginForm.get('password')?.touched;
  }
}
