import {Component} from "@angular/core";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatChip} from "@angular/material/chips";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";
import {ResetPasswordDTO} from "../../dto/reset-password.dto";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: "password-reset",
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatChip,
    MatCardTitle,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: "./password-reset.component.html",
})
export class PasswordResetComponent{

  email: string = ''
  isTokenRequestSent: boolean = false
  resetPasswordDTO: ResetPasswordDTO = {
    token: 0,
    newPassword: ''
  }

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  requestResetPassword() {
    this.userService.requestResetPassword(this.email);
    this.isTokenRequestSent = true;
    this.alertService.showAlert(AlertType.Success, "Kod potrzebny do zresetowania hasła został wysłany na email.");
  }

  resetPassword() {
    this.userService.resetPassword(this.resetPasswordDTO).subscribe(
      response => {
        if(response) {
          this.alertService.showAlert(AlertType.Success, "Pomyślnie zmieniono hasło.")
          this.backToLogin();
        } else {
          this.alertService.showAlert(AlertType.Error, "Nie udało się zmienić hasła.")
        }
      }
    )
  }

  backToLogin() {
    this.router.navigate(["/login"]);
  }

}
