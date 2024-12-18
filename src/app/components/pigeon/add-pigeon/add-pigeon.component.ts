import {Component, Inject, OnInit} from '@angular/core';
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
import {AlertService} from "../../../services/alert/alert.service";
import {AlertType} from "../../../models/alert.model";
import {NgForOf} from "@angular/common";

@Component({
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
    MatOption,
    NgForOf
  ],
  templateUrl: './add-pigeon.component.html'
})
export class AddPigeonComponent implements OnInit{

  pigeon: PigeonDTO;
  pigeons: PigeonDTO[] = [];
  potentialFathers: PigeonDTO[] = [];
  potentialMothers: PigeonDTO[] = [];
  mode: string = ''

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddPigeonComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = data.mode;
    this.pigeon = data.pigeon;
    this.pigeons = data.pigeons;
  }

  ngOnInit(): void {
    this.filterParents();
  }

  private filterParents(): void {
    this.potentialFathers = this.pigeons.filter(pigeon => pigeon.gender === 'Samiec');
    this.potentialMothers = this.pigeons.filter(pigeon => pigeon.gender === 'Samica');
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
        this.alertService.showAlert(AlertType.Error, "Nie udało się dodać nowego gołębia.")
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
        this.alertService.showAlert(AlertType.Error, "Nie udało się edytować danych gołębia.")
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
