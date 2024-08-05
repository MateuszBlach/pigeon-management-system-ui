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
export class AppComponent implements OnInit {

  constructor(protected authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
