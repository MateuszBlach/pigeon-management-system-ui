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
    AgGridAngular
  ],
  templateUrl: "./flight-records-main-component.html",
})
export class FlightRecordsMainComponent implements OnInit{

  flights!: FlightDTO[];
  selectedFlight!: FlightDTO;

  flightRecords!: FlightRecordDTO[];

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
    {headerName: 'Numer obrączki', field: 'pigeonRing'},
    {headerName: 'Dystans [km]', field: 'distance'},
    {headerName: 'Coefic', field: 'coefic'},
    {headerName: 'Punkty', field: 'points'}
  ]
  gridQuickFilter: string = '';

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private flightRecordService: FlightRecordService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadFlights()
    if(this.route.snapshot.queryParams['id']){
      this.loadFlightRecords(this.route.snapshot.queryParams['id']);
    }
  }

  private loadFlights(): void {
    this.flightService.getAllFlights(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.flights = response;
      }
    )
  }

  private loadFlightRecords(flightId: number): void {
    this.flightRecordService.getFlightRecords(flightId).subscribe(
      response => {
        this.flightRecords = response;
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
      this.deleteFLightRecord(rowData.id);
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
        this.loadFlightRecords(this.selectedFlight.id);
      }
    });
  }

  private deleteFLightRecord(flightRecordId: number): void {
    this.flightRecordService.deleteFlightRecord(flightRecordId).subscribe(
      response => {
        this.loadFlightRecords(this.selectedFlight.id);
      }
    )
  }
}
