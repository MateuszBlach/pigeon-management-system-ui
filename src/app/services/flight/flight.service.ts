import {backend} from "../../shared/application-constans";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {FlightDTO} from "../../dto/flight.dto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private url = backend.flightUrl

  constructor(private http: HttpService) {}

  getAllFlights(userId: number): Observable<FlightDTO[]> {
    return this.http.request<FlightDTO[]>('GET',`${this.url}/${userId}/all`);
  }

  addFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http.request<FlightDTO>('POST',`${this.url}/add`, flight);
  }

  deleteFlight(flightId: number): Observable<any> {
    return this.http.request('DELETE',`${this.url}/delete/${flightId}`);
  }

  updateFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http.request<FlightDTO>('PUT',`${this.url}/update`, flight);
  }
}
