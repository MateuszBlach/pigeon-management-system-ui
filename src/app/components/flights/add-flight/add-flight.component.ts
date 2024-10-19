import {Component, Inject} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {FlightDTO} from "../../../dto/flight.dto";
import {AuthService} from "../../../services/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlightService} from "../../../services/flight/flight.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";


@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: "./add-flight.component.html",
})
export class AddFlightComponent {

  flight: FlightDTO;
  mode: string = ''

  constructor(
    private flightService: FlightService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddFlightComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = data.mode;
    this.flight = data.flight
  }

  submitForm() {
    if (this.mode === 'add') {
      this.addNewFlight()
    }else {
      this.editFlight()
    }
  }

  addNewFlight() {
    this.flight.userId = this.authService.getLoggedUserId()
    this.flightService.addFlight(this.flight).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
        console.log(error)
      }
    )
  }

  editFlight() {
    this.flightService.updateFlight(this.flight).subscribe(
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
