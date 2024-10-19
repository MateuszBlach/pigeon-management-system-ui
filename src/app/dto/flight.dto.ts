export interface FlightDTO {
  id: number;
  userId: number;
  distance: number;
  date: Date;
  city: string;
  weather: string;
  windDirection: string;
  windSpeed: number;
}
