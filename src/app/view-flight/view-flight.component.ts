import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';
import { Airline } from '../models/airline.model';

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.css'],
})
export class ViewFlightComponent implements OnInit {
  airlines: Airline[] = [];
  filteredAirlines: Airline[] = [];
  displayedColumn: string[] = ['providerName', 'providerCode', 'providerType'];
  providerTypeFilter: string = '';

  constructor(private airlineService: AirlineService, private router: Router) {}

  ngOnInit(): void {
    this.airlineService.getAirlines().subscribe((airlines) => {
      this.airlines = airlines;
      this.filteredAirlines = airlines;
    });
  }

  applyFilter() {
    if (this.providerTypeFilter === '') {
      this.filteredAirlines = this.airlines;
    } else {
      this.filteredAirlines = this.airlines.filter((airline) =>
        airline.providerType
          .toLowerCase()
          .includes(this.providerTypeFilter.toLowerCase())
      );
    }
  }

  onProviderTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.providerTypeFilter = selectElement.value;
    this.applyFilter();
  }
}
