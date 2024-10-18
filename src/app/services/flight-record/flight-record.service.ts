import {backend} from "../../shared/application-constans";
import {Observable} from "rxjs";
import {FlightRecordDTO} from "../../dto/flight-record.dto";
import {HttpService} from "../http/http.service";

export class FlightRecordService {

  private url = backend.flightRecordUrl

  constructor(private http: HttpService) {}

  getFlightRecords(flightId:number): Observable<FlightRecordDTO[]> {
    return this.http.request<FlightRecordDTO[]>('GET',`${this.url}/${flightId}/all`);
  }

  addFlightRecord(flightRecordDTO: FlightRecordDTO): Observable<FlightRecordDTO> {
    return this.http.request<FlightRecordDTO>('POST',`${this.url}/add`,flightRecordDTO);
  }

  deleteFlightRecord(flightRecordDTO: FlightRecordDTO): Observable<FlightRecordDTO> {
    return this.http.request<FlightRecordDTO>('DELETE',`${this.url}/delete`,flightRecordDTO);
  }

  updateFlightRecord(flightRecordDTO: FlightRecordDTO): Observable<FlightRecordDTO> {
    return this.http.request<FlightRecordDTO>('PUT',`${this.url}/update`, flightRecordDTO);
  }
}
