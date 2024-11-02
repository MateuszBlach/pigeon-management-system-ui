import {Component, Inject, OnInit} from "@angular/core";
import {FlightRecordDTO} from "../../../dto/flight-record.dto";
import {AuthService} from "../../../services/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlightRecordService} from "../../../services/flight-record/flight-record.service";
import {PigeonDTO} from "../../../dto/pigeon.dto";
import {PigeonService} from "../../../services/pigeon/pigeon.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {AlertType} from "../../../models/alert.model";
import {AlertService} from "../../../services/alert/alert.service";
import {MatButton} from "@angular/material/button";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: "./add-flight-record.component.html",
})
export class AddFlightRecordComponent implements OnInit {

  flightRecord!: FlightRecordDTO;
  mode: string = '';

  pigeons!: PigeonDTO[];

  constructor(
    private flightRecordService: FlightRecordService,
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddFlightRecordComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = data.mode;
    this.flightRecord = data.flightRecord || this.initializeFlightRecord();
    this.flightRecord.flightId = data.flightId;
  }

  ngOnInit(): void {
    this.loadPigeons();
  }

  private initializeFlightRecord(): FlightRecordDTO {
    return {
      pigeonRing: '',
      distance: 0,
      coefic: 0,
      points: 0
    };
  }

  submitForm() {
    if (this.mode === 'add') {
      this.addNewFlightRecord();
    } else {
      this.editFlightRecord();
    }
  }

  addNewFlightRecord() {
    this.flightRecordService.addFlightRecord(this.flightRecord).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
        this.alertService.showAlert(AlertType.Error, 'Nie udało się dodać nowego wyniku lotu.' )
      }
    );
  }

  editFlightRecord() {
    this.flightRecordService.updateFlightRecord(this.flightRecord).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
        this.alertService.showAlert(AlertType.Error, 'Nie udało się edytować wyniku lotu.' )
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  private loadPigeons() {
    this.pigeonService.getPigeons(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.pigeons = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
