import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserDTO} from "../../dto/user.dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AuthTokenService} from "../../services/auth-token/auth-token.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user: UserDTO = new UserDTO();
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router, private authTokenService: AuthTokenService) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.authTokenService.setAuthToken(response.token);
        this.authService.setLoggedInUser(response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
