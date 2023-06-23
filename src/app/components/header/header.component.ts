import {Component, Input} from '@angular/core';
import { AuthorizationService } from "../../services/authorization.service";
import { Router } from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule
  ]
})
export class HeaderComponent {
  @Input() public userName: string | null | undefined;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  public logout(): void {
    this.authorizationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    })
  }
}
