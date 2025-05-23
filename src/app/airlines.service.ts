import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirlinesService {
  private baseUrl = 'http://localhost:4200/airlines';
 
  constructor(private http: HttpClient) {}
 
  addFlight(flightData: any): Observable<any> {
return this.http.post(this.baseUrl, flightData);
  }
 
  }

