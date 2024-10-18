import {backend} from "../../shared/application-constans";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {FlightDTO} from "../../dto/flight.dto";

export class FlightService {

  private url = backend.flightUrl

  constructor(private http: HttpService) {}

  getAllFlights(userId: number): Observable<FlightDTO[]> {
    return this.http.request<FlightDTO[]>('GET',`${this.url}/${userId}/all`);
  }

  addFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http.request<FlightDTO>('POST',`${this.url}/add`, flight);
  }

  deleteFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http.request<FlightDTO>('DELETE',`${this.url}/delete`,flight);
  }

  updateFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http.request<FlightDTO>('PUT',`${this.url}/update`, flight);
  }
}
