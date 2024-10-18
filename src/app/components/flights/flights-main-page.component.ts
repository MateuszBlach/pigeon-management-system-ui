import {Component, OnInit} from "@angular/core";
import {FlightService} from "../../services/flight/flight.service";
import {FlightDTO} from "../../dto/flight.dto";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: "flights",
  standalone: true,
  imports: [],
  templateUrl: "./flights-main-page.component.html"
})
export class FlightsMainPageComponent implements OnInit{

  flights: FlightDTO[] = []

  constructor(
    private flightService:FlightService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.flightService.getAllFlights(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.flights = response;
      },
      error => {
        console.log(error);
      }
    )
  }
}
