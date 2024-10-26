import {Injectable} from "@angular/core";
import {UserDTO} from "../../dto/user.dto";
import {Observable} from "rxjs";
import {HttpService} from "../http/http.service";
import {backend} from "../../shared/application-constans";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = backend.userUrl;

  constructor(
    private http: HttpService,
  ) {
  }

  login(user: UserDTO): Observable<any> {
    return this.http.request<any>('POST', `${this.url}/login`, user);
  }

  register(user: UserDTO): Observable<any> {
    return this.http.request<any>('POST', `${this.url}/register`, user);
  }
}
