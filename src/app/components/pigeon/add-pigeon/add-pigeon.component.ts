import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {PigeonDTO} from "../../../dto/pigeon.dto";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PigeonService} from "../../../services/pigeon/pigeon.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-add-pigeon',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatLabel,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './add-pigeon.component.html'
})
export class AddPigeonComponent {

  pigeon: PigeonDTO = new PigeonDTO();

  constructor(private pigeonService: PigeonService, private authService: AuthService) {
  }

  addNewPigeon() {
    this.pigeon.userId = this.authService.getLoggedUserId()
    this.pigeonService.addPigeon(this.pigeon).subscribe(
      response => {
        alert("dodano golebia")
      },
      error => {
        console.log(error)
      }
    )
  }
}
