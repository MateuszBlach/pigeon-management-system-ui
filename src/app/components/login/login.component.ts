import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {UserDTO} from "../../dto/user.dto";
import {UserService} from "../../services/user/user.service";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  user: UserDTO =  {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pigeon']);
    }
  }

  login() {
    this.userService.login(this.user).subscribe(
      response => {
        this.authService.setLoggedInUser(response);
        this.router.navigate(['/pigeon']);
      },
      error => {
        this.alertService.showAlert(AlertType.Error, "Nie udało się zalogować.")
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
