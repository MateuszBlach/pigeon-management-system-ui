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
  public loggedInUser: UserDTO | null = null;

  constructor(private httpClient: HttpClient) { }

  login(user: UserDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }

  register(user: UserDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  logout(): void {
    this.loggedIn = false;
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedInUser(user: UserDTO): void {
    this.loggedIn = true;
    this.loggedInUser = user;
  }
}
