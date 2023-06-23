import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './new-post.routes';
import {HeaderComponent} from "../../components/header/header.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [NewPostComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    HeaderComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class NewPostModule { }
