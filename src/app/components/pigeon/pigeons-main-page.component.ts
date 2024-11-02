import {Component, OnInit} from "@angular/core";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {AuthService} from "../../services/auth/auth.service";
import {AddPigeonComponent} from "./add-pigeon/add-pigeon.component";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef} from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: "pigeon",
  standalone: true,
  imports: [
    AddPigeonComponent,
    AgGridAngular,
    MatButton,
    MatCard,
    MatCardTitle
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
      width: 275,
      cellRenderer: () => {
        return `
          <button class="edit-btn grid-btn">Edytuj</button>
          <button class="delete-btn grid-btn">Usuń</button>
          <button class="results-btn grid-btn">Wyniki</button>
          <button class="pedigree-btn grid-btn">Rodowód</button>
        `;
      },
      onCellClicked: (params) => this.handleActionClick(params)
    },
    {headerName: 'Numer obrączki', field: 'ring', width: 220},
    {headerName: 'Płeć', field: 'gender', width: 140},
    {headerName: 'Barwa', field: 'color', width: 170},
    {headerName: 'Ojciec', field: 'fatherRing', width: 220},
    {headerName: 'Matka', field: 'motherRing', width: 220},
    {headerName: 'Opis', field: 'description', width: 400},
  ];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService
  ) {}

  openAddPigeonDialog() {
    this.dialog.open(AddPigeonComponent, {
      width: '500px',
      height: '700px',
      data: {
        mode: "add",
        pigeon: {},
        pigeons: this.pigeons,
      }
    })
    .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadPigeons(this.authService.getLoggedUserId());
        this.alertService.showAlert(AlertType.Success, "Pomyślnie dodano nowego gołębia.")
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
        if(this.pigeons.length === 0) {
          this.alertService.showAlert(AlertType.Warning, "Nie posiadasz żadnych gołębi.")
        }
      },
      error => {
        this.pigeons = [];
        this.alertService.showAlert(AlertType.Error, "Nie udało się załadować gołębi.")
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
    } else if (clickedElement.classList.contains('results-btn')) {
      this.router.navigate(['pigeon-results'], { queryParams: { ring: rowData.ring } });
    } else if (clickedElement.classList.contains('pedigree-btn')) {
      this.router.navigate(['pedigree'], { queryParams: { ring: rowData.ring } });
    }
  }

  editPigeon(pigeon: PigeonDTO): void {
    this.dialog.open(AddPigeonComponent, {
      width: '500px',
      height: '700px',
      data: {
        mode: "edit",
        pigeon: pigeon,
        pigeons: this.pigeons,
      }
    })
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadPigeons(this.authService.getLoggedUserId());
        this.alertService.showAlert(AlertType.Success, "Pomyślnie edytowano dane gołębia.")
      }
    });
  }


  deletePigeon(pigeon: PigeonDTO): void {
    if (confirm(`Czy ma pewno chcesz usunąć gołębia o numerze obrączki ${pigeon.ring} ?`)) {
      this.pigeonService.deletePigeon(pigeon.ring).subscribe(
        response => {
          this.loadPigeons(this.authService.getLoggedUserId());
          this.alertService.showAlert(AlertType.Success,"Pomyślnie usunięto gołębia.")
        },
        error => {
          this.alertService.showAlert(AlertType.Error, "Nie udało się usunąć gołębia.")
        }
      )
    }
  }

  onGridQuickFilterChanged(event: any) {
    this.gridQuickFilter = event.target.value;
  }
}
