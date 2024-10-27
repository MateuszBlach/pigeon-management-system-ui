import {Component, OnInit} from "@angular/core";
import {Alert} from "../../models/alert.model";
import {AlertService} from "../../services/alert/alert.service";
import {CommonModule} from "@angular/common";


@Component({
  standalone: true,
  selector: 'alerts',
  templateUrl: 'alerts.component.html',
  imports: [CommonModule]
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alerts.subscribe(alert => {
      if (alert.message) {
        this.alerts.push(alert);
      } else {
        this.alerts = this.alerts.filter(a => a.id !== alert.id);
      }
    });
  }

  removeAlert(id: string): void {
    this.alertService.removeAlert(id);
  }
}
