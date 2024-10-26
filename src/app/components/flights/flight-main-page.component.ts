import {Component, OnInit} from "@angular/core";
import {FlightService} from "../../services/flight/flight.service";
import {FlightDTO} from "../../dto/flight.dto";
import {AuthService} from "../../services/auth/auth.service";
import { AgGridAngular } from "ag-grid-angular";
import {ColDef} from "ag-grid-community";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddFlightComponent} from "./add-flight/add-flight.component";
import {Router} from "@angular/router";


@Component({
  selector: "flight",
  standalone: true,
  imports: [
    AgGridAngular,
    MatButton,
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
      width: 270,
      cellRenderer: () => {
        return `
          <button mat-button class="edit-btn grid-btn">Edytuj</button>
          <button mat-button class="delete-btn grid-btn">Usuń</button>
          <button mat-button class="redirect-btn grid-btn">Wyświetl wyniki</button>
        `;
      },
      onCellClicked: (params) => this.handleActionClick(params)
    },
    {headerName: 'Miasto', field: 'city', width: 120},
    {headerName: 'Dystans [km]', field: 'distance', width: 150},
    {headerName: 'Data', field: 'date', width: 120},
    {headerName: 'Pogoda', field: 'weather', width: 120},
    {headerName: 'Kierunek wiatru', field: 'windDirection', width: 185},
    {headerName: 'Prędkość wiatru [km/h]', field: 'windSpeed', width: 195},
  ]

  constructor(
    private flightService:FlightService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
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
    } else if (clickedElement.classList.contains('redirect-btn')) {
      this.router.navigate(
        ["flight-records"],
        { queryParams: { id: rowData.id }}
        )
    }
  }

  private editFlight(flight: FlightDTO): void {
    this.dialog.open(AddFlightComponent, {
      width: '300px',
      height: '560px',
      data: {
        mode: "edit",
        flight: flight
      }
    })
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadFlights();
      }
    });
  }

  private deleteFLight(flight: FlightDTO): void {
    if (confirm(`Czy ma pewno chcesz usunąć lot z miasta ${flight.city} ?`)) {
      this.flightService.deleteFlight(flight.id).subscribe(
        response => {
          console.log(response)
          this.loadFlights();
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  onGridQuickFilterChanged(event: any) {
    this.gridQuickFilter = event.target.value;
  }

  openAddFlightDialog() {
    this.dialog.open(AddFlightComponent, {
      width: '300px',
      height: '560px',
      data: {
        mode: "add",
        flight: {}
      }
    })
      .afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.loadFlights();
        }
    })
  }
}
