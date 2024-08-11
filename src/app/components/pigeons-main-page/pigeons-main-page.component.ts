import {Component, OnInit} from "@angular/core";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {Observable} from "rxjs";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: "pigeons-main-page",
  standalone: true,
  templateUrl: "./pigeons-main-page.html"
})
export  class PigeonsMainPageComponent implements OnInit {

  pigeons: PigeonDTO[] = [];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadPigeons(1)
  }

  private loadPigeons(userId: number): void {
    this.pigeonService.getPigeons(userId).subscribe(
      response => {
        this.pigeons = response;
      },
      error => {
        this.pigeons = []
      }
    )
  }

}
