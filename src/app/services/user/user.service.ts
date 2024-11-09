import {Injectable} from "@angular/core";
import {UserDTO} from "../../dto/user.dto";
import {Observable} from "rxjs";
import {HttpService} from "../http/http.service";
import {backend} from "../../shared/application-constans";
import {ResetPasswordDTO} from "../../dto/reset-password.dto";

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

  requestResetPassword(email: string): Observable<any> {
    return this.http.request('POST', `${this.url}/request-reset-password/{email}`);
  }

  resetPassword(resetPasswordDTO: ResetPasswordDTO): Observable<boolean> {
    return this.http.request<boolean>('POST', `${this.url}/reset-password`, resetPasswordDTO);
  }
}
