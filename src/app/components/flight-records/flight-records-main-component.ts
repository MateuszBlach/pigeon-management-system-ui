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
import {FlightRecordDTO} from "../../dto/flight-record.dto";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef} from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {AddFlightRecordComponent} from "./add-flight-record/add-flight-record.component";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {MatInput} from "@angular/material/input";


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
    MatButton,
    AgGridAngular,
    MatInput
  ],
  templateUrl: "./flight-records-main-component.html",
})
export class FlightRecordsMainComponent implements OnInit{

  flights!: FlightDTO[];
  selectedFlight!: FlightDTO;

  flightRecords!: FlightRecordDTO[];
  recordsLoaded: boolean = false;

  columnDefs: ColDef[] = [
    {
      headerName: 'Akcje',
      field: 'actions',
      width: 170,
      cellRenderer: () => {
        return `
          <button mat-button class="edit-btn grid-btn">Edytuj</button>
          <button mat-button class="delete-btn grid-btn">Usuń</button>
        `;
      },
      onCellClicked: (params) => this.handleActionClick(params)
    },
    {headerName: 'Numer obrączki', field: 'pigeonRing', width: 220},
    {headerName: 'Pozycja na liście', field: 'position', width: 180},
    {headerName: 'Coefic', field: 'coefic',width: 100},
    {headerName: 'Punkty', field: 'points',width: 100}
  ]
  gridQuickFilter: string = '';

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private flightRecordService: FlightRecordService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadFlights()
  }

  private readQueryParams(): void {
    if(this.route.snapshot.queryParams['id']){
      this.loadFlightRecords(this.route.snapshot.queryParams['id']);
      this.selectedFlight = <FlightDTO>this.flights.find(flight => flight.id === Number(this.route.snapshot.queryParams['id']));
    }
  }

  private loadFlights(): void {
    this.flightService.getAllFlights(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.flights = response;
        if(this.flights.length === 0) {
          this.alertService.showAlert(AlertType.Warning,"Nie masz jeszcze żadnych lotów.")
        }
        this.readQueryParams();
      }
    )
  }

  private loadFlightRecords(flightId: number): void {
    this.flightRecordService.getFlightRecords(flightId).subscribe(
      response => {
        this.flightRecords = response;
        this.recordsLoaded = true;
        if(this.flightRecords.length === 0) {
          this.alertService.showAlert(AlertType.Warning,"Nie masz jeszcze żadnych wyników dla tego lotu.")
        }
      }
    )
  }

  submitForm() {
    this.loadFlightRecords(this.selectedFlight.id)
  }

  openAddFlightRecordDialog() {
    this.dialog.open(AddFlightRecordComponent, {
      width: '250px',
      height: '500px',
      data: {
        mode: "add",
        flightRecord: {},
        flightId: this.selectedFlight.id
      }
    })
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.alertService.showAlert(AlertType.Success, `Pomyślnie dodano wynik lotu.`)
        this.loadFlightRecords(this.selectedFlight.id);
      }
    })
  }

  onGridQuickFilterChanged(event: any) {
    this.gridQuickFilter = event.target.value;
  }

  private  handleActionClick(params: any): void {
    const clickedElement = params.event.target;
    const rowData = params.data;

    if (clickedElement.classList.contains('edit-btn')) {
      this.editFlightRecord(rowData);
    } else if (clickedElement.classList.contains('delete-btn')) {
      this.deleteFLightRecord(rowData);
    }
  }

  private editFlightRecord(flightRecord: FlightRecordDTO): void {
    this.dialog.open(AddFlightRecordComponent, {
      width: '250px',
      height: '500px',
      data: {
        mode: "edit",
        flightRecord: flightRecord,
        flightId: this.selectedFlight.id
      }
    })
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.alertService.showAlert(AlertType.Success, `Pomyślnie edytowano wynik lotu.`)
        this.loadFlightRecords(this.selectedFlight.id);
      }
    });
  }

  private deleteFLightRecord(flightRecord: FlightRecordDTO): void {
    this.dialog.open(ConfirmationComponent, {
      height: '140px',
      width: '700px',
      data: {
        message: `Czy ma pewno chcesz usunąć wynik lotu dla gołębia o numerze obrączki ${flightRecord.pigeonRing}  ?`
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result && flightRecord.id != null) {
        this.flightRecordService.deleteFlightRecord(flightRecord.id).subscribe(
          response => {
            this.loadFlightRecords(this.selectedFlight.id);
            this.alertService.showAlert(AlertType.Success, 'Pomyślnie usunięto wynik lotu.')
          },
          error => {
            this.alertService.showAlert(AlertType.Success, 'Nie udało się usunąć wynik lotu.')
          }
        )
      }
    })
  }
}
