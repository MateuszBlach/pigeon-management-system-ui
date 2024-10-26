import {Injectable} from "@angular/core";
import {UserDTO} from "../../dto/user.dto";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getLoggedInUser(): UserDTO | null {
    const loggedUser = window.localStorage.getItem('logged_user');
    if (loggedUser) {
      return JSON.parse(loggedUser);
    }
    return null;
  }

  setLoggedInUser(user: UserDTO | null): void {
    if (user !== null) {
      window.localStorage.setItem('logged_user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('logged_user');
    }
  }
}
