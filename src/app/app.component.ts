import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from "./services/auth/auth.service";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedIn: boolean = false;
  lastClickedButton: string = '';
  currentYear: number = 0;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigate(route: string) {
    this.lastClickedButton = route;
    this.router.navigate([route]);
  }

  protected readonly Date = Date;
}
