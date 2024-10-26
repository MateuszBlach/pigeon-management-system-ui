import {Component, OnInit} from "@angular/core";

@Component({
  selector: "footer",
  standalone: true,
  imports: [],
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit{

  currentYear: number = 0;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
