import {Component, OnInit} from "@angular/core";
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

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadPigeons();
  }

  private loadPigeons() {
    this.pigeonService.getPigeons(this.authService.getLoggedUserId()).subscribe(
      respone => {
        this.pigeons = respone;
        if(this.pigeons.length === 0){
          this.alertService.showAlert(AlertType.Warning, "Nie posiadasz żadnych gołębi.")
        }
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
    console.log(this.tree)
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

}
