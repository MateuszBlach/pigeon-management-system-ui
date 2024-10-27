import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Alert, AlertType} from "../../models/alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  private alertsQueue: Alert[] = [];

  get alerts(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  showAlert(type: AlertType, message: string, timeout: number = 5000): void {
    const alert: Alert = { id: Math.floor(Math.random() * 10000000).toString(), type, message, timeout };
    this.alertsQueue.push(alert);
    this.displayNextAlert();
  }

  private displayNextAlert(): void {
    if (this.alertsQueue.length) {
      const alert = this.alertsQueue.shift();
      if (alert) {
        this.alertSubject.next(alert);
        setTimeout(() => this.removeAlert(alert.id), alert.timeout);
      }
    }
  }

  removeAlert(id: string): void {
    this.alertsQueue = this.alertsQueue.filter(alert => alert.id !== id);
    this.alertSubject.next({ id, message: '', timeout: 0 });
    this.displayNextAlert();
  }
}
