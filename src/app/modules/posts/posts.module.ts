import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './posts.routes';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "../../components/header/header.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TableComponent} from "../../components/table/table.component";
import { DetailsPostComponent } from "./details-post/details-post.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [PostsComponent, DetailsPostComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HeaderComponent,
    MatPaginatorModule,
    MatTableModule,
    TableComponent,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class PostsModule { }
