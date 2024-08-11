import {Injectable} from "@angular/core";
import {backend} from "../../shared/application-constans";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PigeonDTO} from "../../dto/pigeon.dto";

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  private url = backend.pigeonUrl

  constructor(private http: HttpClient) {}

  getPigeons(userId: number): Observable<PigeonDTO[]> {
    return this.http.get<PigeonDTO[]>(`${this.url}/${userId}/all`);
  }

  addPigeon(pigeon: PigeonDTO): Observable<PigeonDTO> {
    return this.http.post<PigeonDTO>(`${this.url}/add`,pigeon);
  }
}
