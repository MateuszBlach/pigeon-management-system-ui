import { Component, OnInit } from "@angular/core";
import { PigeonService } from "../../services/pigeon/pigeon.service";
import { PigeonDTO } from "../../dto/pigeon.dto";
import { AuthService } from "../../services/auth/auth.service";
import { AddPigeonComponent } from "./add-pigeon/add-pigeon.component";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button"; // Import ColDef

@Component({
  selector: "pigeon",
  standalone: true,
  imports: [
    AddPigeonComponent,
    AgGridAngular,
    MatButton
  ],
  templateUrl: "./pigeons-main-page.component.html"
})
export class PigeonsMainPageComponent implements OnInit {
  pigeons: PigeonDTO[] = [];

  // Explicitly type the columnDefs array as ColDef[]
  columnDefs: ColDef[] = [
    { headerName: 'Numer obrączki', field: 'ring' },
    { headerName: 'Płeć', field: 'gender' },
    { headerName: 'Kolor oczu', field: 'eyeColor' },
    { headerName: 'Kolor upierzenia', field: 'plumageColor' },
  ];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  openAddPigeonDialog() {
    const dialogRef = this.dialog.open(AddPigeonComponent, {
      width: '250px',
      height: '500px',
    })
  }

  ngOnInit(): void {
    let loggedUserId: number;
    if (this.authService.loggedInUser !== null && this.authService.loggedInUser.id) {
      loggedUserId = this.authService.loggedInUser.id;
      this.loadPigeons(loggedUserId);
    }
  }

  private loadPigeons(userId: number): void {
    this.pigeonService.getPigeons(userId).subscribe(
      response => {
        this.pigeons = response;
      },
      error => {
        this.pigeons = [];
      }
    );
  }
}
