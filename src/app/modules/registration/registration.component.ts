import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormGroupDirective, FormControlDirective, NgForm} from '@angular/forms';
import { PasswordValidators } from './validators/password.validators';
import { UsersService } from "../../services/users.service";
import {IUsers} from "../../interfaces/users.interface";
import { randomInteger } from '../../helpers/randon-number.helper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public userList: Array<string> | undefined = [];
  public isUserNameTaken = false;
  public showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ) {}

  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  public ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: IUsers[]) => {
      this.userList = users.map((user: IUsers) => user.name);
    });
  }

  public registrationForm: FormGroup = this.formBuilder.group({
    id: randomInteger(1, 100000),
    name: ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  },
    {
      validators: PasswordValidators.matchValidator,
    });

  public submit(): void {
    if (this.userList?.includes(this.registrationForm.get('name')?.value)) {
      this.isUserNameTaken = true;

      return;
    }

    this.showSpinner = true;

    const body: IUsers = {
      id: this.registrationForm.get('id')?.value,
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
    };

    this.usersService.signUpUser(body)
      .subscribe((response) => {
        this.showSpinner = false;
        this.router.navigate(['login'])
        this.resetForm();
      })
  }

  public onUserNameChange(): void {
    this.isUserNameTaken = false;
  }

  public resetForm(): void {
    this.registrationForm.markAsPristine();
    this.registrationForm.markAsUntouched();
    this.registrationForm.reset();
  }

  get userNameRequired(): boolean | undefined {
    return this.registrationForm.get('name')?.hasError('required');
  }

  get userNameTouched(): boolean | undefined {
    return this.registrationForm.get('name')?.touched;
  }

  get maxUserNameLength(): boolean | undefined {
    return this.registrationForm.get('name')?.hasError('maxlength');
  }

  get minUserNameLength(): boolean | undefined {
    return this.registrationForm.get('name')?.hasError('minlength');
  }

  get emailValidation(): boolean | undefined {
    return this.registrationForm.get('email')?.hasError('email');
  }

  get emailRequired(): boolean | undefined {
    return this.registrationForm.get('email')?.hasError('required');
  }

  get emailTouched(): boolean | undefined {
    return this.registrationForm.get('email')?.touched;
  }

  get passwordRequired(): boolean | undefined {
    return this.registrationForm.get('password')?.hasError('required');
  }

  get passwordTouched(): boolean | undefined {
    return this.registrationForm.get('password')?.touched;
  }

  get confirmPasswordRequired(): boolean | undefined {
    return this.registrationForm.get('confirmPassword')?.hasError('required');
  }

  get confirmPasswordTouched(): boolean | undefined {
    return this.registrationForm.get('confirmPassword')?.touched;
  }

  get confirmationPasswordMinLengthValidation(): boolean | undefined {
    return this.registrationForm.get('confirmPassword')?.hasError('minlength');
  }

  get passwordMinLengthValidation(): boolean | undefined {
    return this.registrationForm.get('password')?.hasError('minlength');

  }

  get isMismatchPassword(): boolean | undefined {
    return this.registrationForm.get('confirmPassword')?.hasError('mismatch');
  }
}
