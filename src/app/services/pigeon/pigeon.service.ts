import {Injectable} from "@angular/core";
import {backend} from "../../shared/application-constans";
import {Observable} from "rxjs";
import {PigeonDTO} from "../../dto/pigeon.dto";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  private url = backend.pigeonUrl

  constructor(private http: HttpService) {}

  getPigeons(userId: number): Observable<PigeonDTO[]> {
    return this.http.request<PigeonDTO[]>('GET',`${this.url}/${userId}/all`);
  }

  addPigeon(pigeon: PigeonDTO): Observable<PigeonDTO> {
    return this.http.request<PigeonDTO>('POST',`${this.url}/add`,pigeon);
  }
}
