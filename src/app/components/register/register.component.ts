import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Logika rejestracji (np. wysyłanie danych do backendu)
    const registrationSuccess = this.authService.register(this.username, this.password);
    if (registrationSuccess) {
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
