import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from "./services/auth/auth.service";
import { NgIf } from "@angular/common";
import { UserDTO } from "./dto/user.dto";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
      console.log(this.loggedIn);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
