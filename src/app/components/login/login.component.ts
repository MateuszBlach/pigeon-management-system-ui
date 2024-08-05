import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {UserDTO} from "../../dto/user.dto";

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

  user: UserDTO = new UserDTO();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        this.authService.setLoggedInUser(response);
        this.router.navigate(['/']);
      },
      error => {
        alert('Login failed. Please try again.');
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
