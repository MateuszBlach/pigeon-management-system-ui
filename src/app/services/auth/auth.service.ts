import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../../dto/user.dto";
import {backend} from "../../shared/application-constans";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = backend.userUrl
  private loggedIn = false;
  public loggedInUser: UserDTO | null = null;

  constructor(private httpClient: HttpClient) { }

  login(user: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${this.url}/login`, user);
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${this.url}/register`, user);
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
