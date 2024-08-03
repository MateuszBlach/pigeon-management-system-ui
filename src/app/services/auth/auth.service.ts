import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/user';
  private loggedIn = false;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): boolean {
    //TODO: implement backend
    if (username === 'user' && password === 'password') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  register(user: UserDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
