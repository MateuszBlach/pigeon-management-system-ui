import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {UserDTO} from "../../dto/user.dto";
import {AuthTokenService} from "../../services/auth-token/auth-token.service";

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
export class LoginComponent {

  user: UserDTO =  {};

  constructor(private authService: AuthService, private router: Router, private authTokenService: AuthTokenService) {}

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        this.authTokenService.setAuthToken(response.token)
        this.authService.setLoggedInUser(response);
        this.router.navigate(['/pigeon']);
      },
      error => {
        alert('Login failed. Please try again.');
      }
    );
  }
}
