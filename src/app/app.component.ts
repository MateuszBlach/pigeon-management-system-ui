import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { AuthService } from "./services/auth/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {NavComponent} from "./components/nav/nav.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }
}
