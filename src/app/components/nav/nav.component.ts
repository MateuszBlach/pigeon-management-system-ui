import {Component, OnInit} from "@angular/core";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {UserDTO} from "../../dto/user.dto";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: "nav",
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: "./nav.component.html",
})
export class NavComponent implements OnInit{

  user: UserDTO = {};

  constructor(private authService: AuthService, private router: Router,private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.setUser()
  }

  setUser(): void {
    const user =this.localStorageService.getLoggedInUser()
    if(user !== null) {
      this.user = user
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
