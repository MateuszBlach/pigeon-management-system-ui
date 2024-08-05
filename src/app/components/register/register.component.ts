import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserDTO} from "../../dto/user.dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Logika rejestracji (np. wysyłanie danych do backendu)
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('Registration successful!');
        this.navigateToLogin();
      },
      error => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
