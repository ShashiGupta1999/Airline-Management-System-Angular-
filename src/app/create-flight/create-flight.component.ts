import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';
import { Airline } from '../models/airline.model';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
})
export class CreateFlightComponent implements OnInit {
  airline: Airline = {
    providerName: '',
    providerCode: '',
    providerType: '',
  };
  providers: string[] = [
    'INDIGO',
    'SPICEJET',
    'AIR ASIA',
    'GO AIR',
    'JET AIRWAYS',
    'AIR INDIA',
  ];
  providerCodeMap: { [key: string]: string } = {
    INDIGO: '6E',
    SPICEJET: 'SG',
    'AIR ASIA': '15',
    'GO AIR': 'G8',
    'JET AIRWAYS': '9W',
    'AIR INDIA': 'AI',
  };

  constructor(private airlineService: AirlineService, private router: Router) {}

  ngOnInit(): void {
    // If editing, load the existing airline data (to be implemented if needed)
  }

  onProviderNameChange(): void {
    this.airline.providerCode =
      this.providerCodeMap[this.airline.providerName] || '';
  }

  save(): void {
    this.airlineService
      .addAirline(this.airline)
      .subscribe(() => this.router.navigate(['view']));
  }
}
