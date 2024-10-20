import {Component, OnInit} from "@angular/core";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {FlightRecordService} from "../../services/flight-record/flight-record.service";
import {FlightRecordDTO} from "../../dto/flight-record.dto";
import {AuthService} from "../../services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";


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
    MatButton
  ],
  templateUrl: "./pigeon-results.component.html",
})
export class PigeonResultsComponent implements OnInit {

  pigeons: PigeonDTO[] = [];
  selectedPigeon!: PigeonDTO;
  records: FlightRecordDTO[] = []

  recordsLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private pigeonService: PigeonService,
    private flightRecordsService: FlightRecordService,
    private route: ActivatedRoute
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
      }
    )
  }

  private loadFlightRecords(ring: string): void {
    this.flightRecordsService.getFlightRecordsByRing(ring).subscribe(
      response => {
        this.records = response;
        this.recordsLoaded = true
      }
    )
  }

  submitForm() {
    this.loadFlightRecords(this.selectedPigeon.ring)
  }

}

