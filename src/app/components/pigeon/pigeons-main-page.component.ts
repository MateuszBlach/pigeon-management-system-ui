import { Component, OnInit } from "@angular/core";
import { PigeonService } from "../../services/pigeon/pigeon.service";
import { PigeonDTO } from "../../dto/pigeon.dto";
import { AuthService } from "../../services/auth/auth.service";
import { AddPigeonComponent } from "./add-pigeon/add-pigeon.component";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router"; // Import ColDef

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
      cellRenderer: () => {
        return `
          <button mat-button class="edit-btn">Edytuj</button>
          <button mat-button class="delete-btn">Usuń</button>
          <button mat-button class="redirect-btn">Wyświetl wyniki</button>
        `;
      },
      onCellClicked: (params) => this.handleActionClick(params)
    },
    {headerName: 'Numer obrączki', field: 'ring'},
    {headerName: 'Płeć', field: 'gender',  cellStyle: this.getGenderCellStyle},
    {headerName: 'Barwa', field: 'color', cellStyle: this.getColorCellStyle},
  ];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  getGenderCellStyle(params: any): any {
    if (params.value === "Samiec") {
      return { backgroundColor: 'lightblue' };
    } else if (params.value === "Samica") {
      return { backgroundColor: 'pink' };
    }
    return null;
  }

  getColorCellStyle(params: any): any {
    switch (params.value) {
      case 'Niebieska':
        return { backgroundColor: '#87CEEB' };
      case 'Niebieska nakrapiana':
        return { backgroundColor: '#ADD8E6' };
      case 'Ciemna nakrapiana':
        return { backgroundColor: '#778899' };
      case 'Ciemna':
        return { backgroundColor: '#2F4F4F' };
      case 'Czarna':
        return { backgroundColor: '#000000' };
      case 'Czerwona nakrapiana':
        return { backgroundColor: '#FF6347' };
      case 'Czerwona':
        return { backgroundColor: '#FF4500' };
      case 'Płowa':
        return { backgroundColor: '#FFD700' };
      case 'Biała':
        return { backgroundColor: '#FFFFFF' };
      case 'Szpakowata':
        return { backgroundColor: '#DCDCDC' };
      case 'Niebieska pstra':
        return { backgroundColor: '#B0E0E6' };
      case 'Niebieska nakrapiana pstra':
        return { backgroundColor: '#AFEEEE' };
      case 'Ciemna nakrapiana pstra':
        return { backgroundColor: '#708090' };
      case 'Ciemna pstra':
        return { backgroundColor: '#2E8B57' };
      case 'Czarna pstra':
        return { backgroundColor: '#696969' };
      case 'Czerwona nakrapiana pstra':
        return { backgroundColor: '#CD5C5C' };
      case 'Czerwona pstra':
        return { backgroundColor: '#DC143C' };
      case 'Płowa pstra':
        return { backgroundColor: '#DAA520' };
      case 'Szpakowata pstra':
        return { backgroundColor: '#A9A9A9' };
      case 'Czerwona szpakowata':
        return { backgroundColor: '#B22222' };
      default:
        return null;
    }
  }

  openAddPigeonDialog() {
    this.dialog.open(AddPigeonComponent, {
      width: '250px',
      height: '500px',
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
      width: '250px',
      height: '500px',
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
