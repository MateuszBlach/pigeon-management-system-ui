import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserDTO} from "../../dto/user.dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../services/user/user.service";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";

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

  user: UserDTO = {}
  confirmPassword = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      this.alertService.showAlert(AlertType.Error, "Hasła się różnią.")
      return;
    }

    this.userService.register(this.user).subscribe(
      response => {
        this.alertService.showAlert(AlertType.Success, "Rejestracja przebiegła pomyślnie.");
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.showAlert(AlertType.Error, `Rejestracja nie powiodła się. ${error}`)
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
