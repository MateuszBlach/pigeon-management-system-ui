import {Component, OnInit} from "@angular/core";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {FlightRecordService} from "../../services/flight-record/flight-record.service";
import {AuthService} from "../../services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {PigeonResultDTO} from "../../dto/pigeon-results.dto";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef} from "ag-grid-community";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";


@Component({
  standalone: true,
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
  templateUrl: "./pigeon-results.component.html",
})
export class PigeonResultsComponent implements OnInit {

  pigeons: PigeonDTO[] = [];
  selectedPigeon!: PigeonDTO;
  records: PigeonResultDTO[] = []

  recordsLoaded: boolean = false;

  columnDefs: ColDef[] = [
    { headerName: 'Miasto',field: 'city', width: 120},
    { headerName: 'Data',field: 'flightDate', width: 120},
    { headerName: 'Coefic',field: 'coefic', width: 100},
    { headerName: 'Punkty',field: 'points', width: 100},
    { headerName: 'Dystans [km]',field: 'flightRecordDistance', width: 150},
  ]


  constructor(
    private authService: AuthService,
    private pigeonService: PigeonService,
    private flightRecordsService: FlightRecordService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.loadPigeons();
    if(this.route.snapshot.queryParams['ring']){
      this.selectedPigeon = {
        ring: this.route.snapshot.queryParams['ring'],
      }
      this.loadFlightRecords(this.selectedPigeon.ring);
    }
  }

  private loadPigeons(): void {
    this.pigeonService.getPigeons(this.authService.getLoggedUserId()).subscribe(
      response => {
        this.pigeons = response;
        if(this.pigeons.length === 0){
          this.alertService.showAlert(AlertType.Warning, "Nie posiadasz żadnych gołębi.")
        }
      },
      error => {
        this.alertService.showAlert(AlertType.Error, "Nie udało się załadować gołębi.")
      }
    )
  }

  private loadFlightRecords(ring: string): void {
    this.flightRecordsService.getFlightRecordsByRing(ring).subscribe(
      response => {
        this.records = response;
        this.recordsLoaded = true
        if(this.records.length === 0){
          this.alertService.showAlert(AlertType.Warning, "Ten gołąb nie posiada żadnych zapisanych wyników.")
        }
      },
      error => {
        this.alertService.showAlert(AlertType.Error, "Nie udało się załadować wyników.")
      }
    )
  }

  submitForm() {
    this.loadFlightRecords(this.selectedPigeon.ring)
  }

}

