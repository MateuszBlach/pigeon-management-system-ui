import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {PigeonDTO} from "../../../dto/pigeon.dto";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PigeonService} from "../../../services/pigeon/pigeon.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";

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
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './add-pigeon.component.html'
})
export class AddPigeonComponent {

  pigeon: PigeonDTO = new PigeonDTO();
  mode: string = ''

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddPigeonComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = data.mode;
    this.pigeon = data.pigeon;
  }

  submitForm() {
    if (this.mode === 'add') {
      this.addNewPigeon()
    }else {
      this.editPigeon()
    }
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

  editPigeon() {
    this.pigeonService.updatePigeon(this.pigeon).subscribe(
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
