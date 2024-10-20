import {backend} from "../../shared/application-constans";
import {Observable} from "rxjs";
import {FlightRecordDTO} from "../../dto/flight-record.dto";
import {HttpService} from "../http/http.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FlightRecordService {

  private url = backend.flightRecordUrl

  constructor(private http: HttpService) {}

  getFlightRecords(flightId:number): Observable<FlightRecordDTO[]> {
    return this.http.request<FlightRecordDTO[]>('GET',`${this.url}/${flightId}/all`);
  }

  getFlightRecordsByRing(ring: string): Observable<FlightRecordDTO[]> {
    return this.http.request<FlightRecordDTO[]>("GET",`${this.url}/${ring}/all-by-ring`);
  }

  addFlightRecord(flightRecordDTO: FlightRecordDTO): Observable<FlightRecordDTO> {
    return this.http.request<FlightRecordDTO>('POST',`${this.url}/add`,flightRecordDTO);
  }

  deleteFlightRecord(flightRecordId: number): Observable<any> {
    return this.http.request('DELETE',`${this.url}/delete/${flightRecordId}`);
  }

  updateFlightRecord(flightRecordDTO: FlightRecordDTO): Observable<FlightRecordDTO> {
    return this.http.request<FlightRecordDTO>('PUT',`${this.url}/update`, flightRecordDTO);
  }
}
