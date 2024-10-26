import { Component, OnInit } from "@angular/core";
import { PigeonService } from "../../services/pigeon/pigeon.service";
import { PigeonDTO } from "../../dto/pigeon.dto";
import { AuthService } from "../../services/auth/auth.service";
import { AddPigeonComponent } from "./add-pigeon/add-pigeon.component";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

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
    {headerName: 'Numer obrączki', field: 'ring', width: 220},
    {headerName: 'Płeć', field: 'gender', width: 200},
    {headerName: 'Barwa', field: 'color', width: 220},
  ];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openAddPigeonDialog() {
    this.dialog.open(AddPigeonComponent, {
      width: '300px',
      height: '400px',
      data: {
        mode: "add",
        pigeon: {}
      }
    })
    .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadPigeons(this.authService.getLoggedUserId());
      }
    });
  }

  ngOnInit(): void {
    this.loadPigeons(this.authService.getLoggedUserId());
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
    } else if (clickedElement.classList.contains('redirect-btn')) {
      this.router.navigate(['pigeon-results'], { queryParams: { ring: rowData.ring } });
    }
  }

  editPigeon(pigeon: PigeonDTO): void {
    this.dialog.open(AddPigeonComponent, {
      width: '300px',
      height: '400px',
      data: {
        mode: "edit",
        pigeon: pigeon
      }
    })
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadPigeons(this.authService.getLoggedUserId());
      }
    });
  }


  deletePigeon(pigeon: PigeonDTO): void {
    if (confirm(`Czy ma pewno chcesz usunąć gołębia o numerze obrączki ${pigeon.ring} ?`)) {
      this.pigeonService.deletePigeon(pigeon.ring).subscribe(
        response => {
          console.log(response)
          this.loadPigeons(this.authService.getLoggedUserId());
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
}
