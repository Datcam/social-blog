import {Component, Input, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TableModeEnum} from "../../enums/table-mode.enum";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    NgIf,
    RouterLink,
    NgClass
  ]
})
export class TableComponent {
  public dataSource: any = [];
  public tableMode: TableModeEnum | undefined;
  public mode = TableModeEnum;

  @Input() public set dataPosts(posts: any) {
    this.dataSource = new MatTableDataSource(posts);
    this.dataSource.paginator = this.paginator;
  };

  @Input() public set displayMode(mode: TableModeEnum) {
    this.tableMode = mode;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  public displayedColumns: string[] = ['image', 'content'];

  constructor() {}
}

