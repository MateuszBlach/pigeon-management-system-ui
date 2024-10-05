import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {PigeonDTO} from "../../../dto/pigeon.dto";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PigeonService} from "../../../services/pigeon/pigeon.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MatDialogRef} from "@angular/material/dialog";

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

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddPigeonComponent>
  ) {
  }

  addNewPigeon() {
    this.pigeon.userId = this.authService.getLoggedUserId()
    this.pigeonService.addPigeon(this.pigeon).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
        console.log(error)
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
