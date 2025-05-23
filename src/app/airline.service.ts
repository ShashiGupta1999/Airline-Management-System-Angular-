import { Injectable } from '@angular/core';
import { Airline } from './models/airline.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  private apiUrl = 'http://localhost:4000/airLines';
  constructor(private http: HttpClient) {}

  private getProviderCode(providerName: string): string {
    const codes: { [key: string]: string } = {
      INDIGO: '6E',
      SPICEJET: 'SG',
      'AIR ASIA': '15',
      'GO AIR': 'G8',
      'JET AIRWAYS': '9W',
      'AIR INDIA': 'AI',
    };
    return codes[providerName] || '';
  }

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.apiUrl);
  }

  getAirline(id: number): Observable<Airline> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Airline>(url);
  }

  addAirline(airline: Airline): Observable<Airline> {
    airline.providerCode = this.getProviderCode(airline.providerName);
    return this.http.post<Airline>(this.apiUrl, airline);
  }

  checkAirline(providerCode: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${this.apiUrl}/exists/${providerCode}`)
      .pipe(
        map((response) => response.exists),
        catchError((error) => {
          console.error('Error in checkAirline:', error);
          return of(false);
        })
      );
  }

  updateFlightDetails(
    providerCode: string,
    providerType: string
  ): Observable<boolean> {
    return this.http
      .put<{ success: boolean }>(`${this.apiUrl}/update`, {
        providerCode,
        providerType,
      })
      .pipe(
        map((response) => response.success),
        catchError((error) => {
          console.error('Error in updateFlightDetails:', error);
          return of(false);
        })
      );
  }

  deleteFlight(
    providerCode: string,
    providerType: string
  ): Observable<boolean> {
    return this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/delete`, {
        body: {
          providerCode,
          providerType,
        },
      })
      .pipe(
        map((response) => response.success),
        catchError((error) => {
          console.error('Error in deleteFlightDetails:', error);
          return of(false);
        })
      );
  }
}
