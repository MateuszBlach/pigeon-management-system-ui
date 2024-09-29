import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../auth-token/auth-token.service';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private authTokenService: AuthTokenService) { }

  request<T>(
    method: HttpMethod,
    url: string,
    body?: any
  ): Observable<T> {

    let headers = new HttpHeaders();
    const token = this.authTokenService.getAuthToken();
    if (token && !url.includes("login") && !url.includes("register")) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const options = {
      headers: headers,
      body: body
    };

    return this.httpClient.request<T>(method, url, options);
  }
}
