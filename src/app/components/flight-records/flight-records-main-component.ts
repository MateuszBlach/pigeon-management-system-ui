import {Component, OnInit} from "@angular/core";
import {FlightDTO} from "../../dto/flight.dto";
import {FlightService} from "../../services/flight/flight.service";
import {FlightRecordService} from "../../services/flight-record/flight-record.service";
import {AuthService} from "../../services/auth/auth.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";


@Component({
  standalone:true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    MatButton
  ],
  templateUrl: "./flight-records-main-component.html",
})
export class FlightRecordsMainComponent implements OnInit{

  flights!: FlightDTO[];
  selectedFlight!: FlightDTO;

  showRecordsGrid: boolean = false;

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private flightRecordService: FlightRecordService,
  ) {}

  ngOnInit(): void {
    this.loadFlights()
  }

  private loadFlights(): void {
    this.flightService.getAllFlights(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.flights = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  submitForm() {
    console.log(this.selectedFlight);
  }
}
