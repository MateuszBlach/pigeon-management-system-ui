import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserDTO } from "../../dto/user.dto";
import { backend } from "../../shared/application-constans";
import { HttpService } from '../http/http.service';
import { AuthTokenService } from '../auth-token/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = backend.userUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedInUser: UserDTO | null = null;

  constructor(private httpService: HttpService, private authTokenService: AuthTokenService) { }

  login(user: UserDTO): Observable<any> {
    return this.httpService.request<any>('POST', `${this.url}/login`, user);
  }

  register(user: UserDTO): Observable<any> {
    return this.httpService.request<any>('POST', `${this.url}/register`, user);
  }


  logout(): void {
    this.loggedIn.next(false)
    this.loggedInUser = null;
    this.authTokenService.setAuthToken(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedInUser(user: UserDTO): void {
    this.loggedIn.next(true);
    this.loggedInUser = user;
  }
}
