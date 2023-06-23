import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './registration.routes';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [RegistrationComponent],
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class RegistrationModule { }
