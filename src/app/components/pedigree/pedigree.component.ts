import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {AuthService} from "../../services/auth/auth.service";
import {AlertService} from "../../services/alert/alert.service";
import {AlertType} from "../../models/alert.model";
import {MatTable} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {CommonModule, NgForOf} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {PedigreeTreeNode} from "../../models/pedigree-tree.node";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {UserDTO} from "../../dto/user.dto";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  standalone: true,
  selector: 'pedigree',
  imports: [
    MatTable,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    CommonModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: "./pedigree.component.html",
  styleUrl: "./pedigree.component.css"
})
export class PedigreeComponent implements OnInit {

  pigeons: PigeonDTO[] = [];
  selectedPigeon!: PigeonDTO;
  tree!: PedigreeTreeNode;
  isTreeBuilt: boolean = false;
  isPdfBuilt: boolean = false;
  user!: UserDTO;

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadPigeons();
    this.setUser();
  }

  private readQueryParams() {
    if(this.route.snapshot.queryParams['ring']){
      this.selectedPigeon = <PigeonDTO>this.pigeons.find(pigeon => pigeon.ring === this.route.snapshot.queryParams['ring'])
    }
  }



  private loadPigeons() {
    this.pigeonService.getPigeons(this.authService.getLoggedUserId()).subscribe(
      respone => {
        this.pigeons = respone;
        if(this.pigeons.length === 0){
          this.alertService.showAlert(AlertType.Warning, "Nie posiadasz żadnych gołębi.")
        }
        this.readQueryParams();
      }
    )
  }

  submitForm() {
    this.createPedigreeTree()
  }

  private createPedigreeTree() {
    this.tree = {
      pigeon: this.selectedPigeon
    }
    this.tree = this.findAncestors(this.tree);
    this.isTreeBuilt = true;
  }

  private findAncestors(node: PedigreeTreeNode): PedigreeTreeNode {
    if (node.pigeon.fatherRing) {
      const fatherPigeon = this.pigeons.find(pigeon => pigeon.ring === node.pigeon.fatherRing);
      if (fatherPigeon) {
        node.father = {
          pigeon: fatherPigeon
        };
        node.father = this.findAncestors(node.father);
      }
    }
    if (node.pigeon.motherRing) {
      const motherPigeon = this.pigeons.find(pigeon => pigeon.ring === node.pigeon.motherRing);
      if (motherPigeon) {
        node.mother = {
          pigeon: motherPigeon
        };
        node.mother = this.findAncestors(node.mother);
      }
    }
    return node;
  }

  generatePDF() {
    this.isPdfBuilt = true
    this.changeDetectorRef.detectChanges()
    const dataElement = document.getElementById('pdf-content');
    if (dataElement) {
      html2canvas(dataElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = 260;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        pdf.save(`${this.selectedPigeon.ring}.pdf`);
      });
    }
    this.isPdfBuilt = false;
    this.changeDetectorRef.detectChanges()
    this.alertService.showAlert(AlertType.Success,"Rodowód jest pobierany i zostanie otworzony, gdy pobieranie się zakończy.")
  }

  private setUser() {
    const user = this.localStorageService.getLoggedInUser();
    if (user) {
      this.user = user;
    }
  }

}
