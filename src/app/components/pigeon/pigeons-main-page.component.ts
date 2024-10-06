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

  loggedUserId: number;
  pigeons: PigeonDTO[] = [];

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
  ) {
    this.loggedUserId = -1
  }

  openAddPigeonDialog() {
    const dialogRef = this.dialog.open(AddPigeonComponent, {
      width: '250px',
      height: '500px',
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadPigeons(this.loggedUserId);
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.loggedInUser !== null && this.authService.loggedInUser.id) {
      this.loggedUserId = this.authService.loggedInUser.id;
      this.loadPigeons(this.loggedUserId);
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

  handleActionClick(params: any): void {
    const clickedElement = params.event.target;
    const rowData = params.data;

    if (clickedElement.classList.contains('edit-btn')) {
      this.editPigeon(rowData);
    } else if (clickedElement.classList.contains('delete-btn')) {
      this.deletePigeon(rowData);
    }
  }

  editPigeon(pigeon: PigeonDTO): void {
    console.log("edit", pigeon)
  }


  deletePigeon(pigeon: PigeonDTO): void {
    if (confirm(`Czy ma pewno chcesz usunąć gołębia o numerze obrączki ${pigeon.ring} ?`)) {
      this.pigeonService.deletePigeon(pigeon).subscribe(
        response => {
          console.log(response)
          this.loadPigeons(this.loggedUserId);
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
