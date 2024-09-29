import {Component, OnInit} from "@angular/core";
import {PigeonService} from "../../services/pigeon/pigeon.service";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {AuthService} from "../../services/auth/auth.service";
import {AddPigeonComponent} from "./add-pigeon/add-pigeon.component";

@Component({
  selector: "pigeon",
  standalone: true,
  imports: [
    AddPigeonComponent
  ],
  templateUrl: "./pigeons-main-page.component.html"
})
export  class PigeonsMainPageComponent implements OnInit {

  pigeons: PigeonDTO[] = [];

  constructor(
    private pigeonService: PigeonService,
    private authService: AuthService,
  ) {
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
        this.pigeons = []
      }
    )
  }

}
