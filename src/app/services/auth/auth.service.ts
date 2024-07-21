import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() { }

  login(username: string, password: string): boolean {
    //TODO: implement backend
    if (username === 'user' && password === 'password') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    //TODO: implement backend
    if (username === 'user' && password === 'password') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
