import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  constructor() {}
  static matchValidator(control: AbstractControl): null | void {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!confirmPassword?.length) {
      return null;
    }

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({mismatch: true})
    } else {
      return null;
    }
  }
}
