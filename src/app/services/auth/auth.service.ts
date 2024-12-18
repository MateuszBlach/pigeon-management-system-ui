import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserDTO } from "../../dto/user.dto";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private isloggedIn = false;

  constructor(private localStorageService: LocalStorageService) {
    this.initializeAuthState()
  }

  private initializeAuthState(): void {
    if(this.localStorageService.getLoggedInUser() !== null) {
      this.loggedIn.next(true);
      this.isloggedIn = true;
    }
  }

  logout(): void {
    this.setLoggedInUser(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }


  getLoggedUserId(): number {
    const user = this.localStorageService.getLoggedInUser()
    if(user){
      return user.id as number;
    }
    return -1
  }

  getToken(): string | null {
    const user = this.localStorageService.getLoggedInUser();
    if(user){
      return user.token as string;
    }
    return null;
  }

  setLoggedInUser(user: UserDTO | null): void {
    if (user !== null) {
      this.loggedIn.next(true);
      this.isloggedIn = true;
    } else {
      this.loggedIn.next(false);
      this.isloggedIn = false;
    }
    this.localStorageService.setLoggedInUser(user)
  }

}
