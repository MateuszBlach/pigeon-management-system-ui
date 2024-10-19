import {Component, OnInit} from "@angular/core";
import {FlightService} from "../../services/flight/flight.service";
import {FlightDTO} from "../../dto/flight.dto";
import {AuthService} from "../../services/auth/auth.service";
import { AgGridAngular } from "ag-grid-angular";
import {ColDef} from "ag-grid-community";


@Component({
  selector: "flight",
  standalone: true,
  imports: [
    AgGridAngular,
  ],
  templateUrl: "./flight-main-page.component.html"
})
export class FlightMainPageComponent implements OnInit{

  flights: FlightDTO[] = []
  gridQuickFilter: string = '';

  columnDefs: ColDef[] = [
    {
      headerName: 'Akcje',
      field: 'actions',
      cellRenderer: () => {
        return `
          <button mat-button class="edit-btn">Edytuj</button>
          <button mat-button class="delete-btn">Usuń</button>
        `;
      },
      onCellClicked: (params) => this.handleActionClick(params)
    },
    {headerName: 'Miasto', field: 'city'},
    {headerName: 'Dystans [km]', field: 'distance'},
    {headerName: 'Data', field: 'date'},
    {headerName: 'Pogoda', field: 'weather'},
    {headerName: 'Kierunek wiatru', field: 'windDirection'},
    {headerName: 'Prędkość wiatru [km/h]', field: 'windSpeed'},
  ]

  constructor(
    private flightService:FlightService,
    private authService: AuthService,
  ){}

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

  private  handleActionClick(params: any): void {
    const clickedElement = params.event.target;
    const rowData = params.data;

    if (clickedElement.classList.contains('edit-btn')) {
      this.editFlight(rowData);
    } else if (clickedElement.classList.contains('delete-btn')) {
      this.deleteFLight(rowData);
    }
  }

  private editFlight(rowData: FlightDTO): void {

  }

  private deleteFLight(rowData: FlightDTO): void {

  }

  onGridQuickFilterChanged(event: any) {
    this.gridQuickFilter = event.target.value;
  }
}
