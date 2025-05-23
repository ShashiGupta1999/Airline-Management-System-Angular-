import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-flight',
  templateUrl: './insert-flight.component.html',
  styleUrls: ['./insert-flight.component.css'],
})
export class InsertFlightComponent implements OnInit {
  flightForm!: FormGroup;

  providerCodes = {
    INDIGO: '6E',
    SPICEJET: 'SG',
    'AIR ASIA': 'I5',
    'GO AIR': 'G8',
    'JET AIRWAYS': '9W',
    'AIR INDIA': 'AI',
  };

  constructor(
    private fb: FormBuilder,
    private airlineService: AirlinesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      providerName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(10),
        ],
      ],
      providerCode: [{ value: '', disabled: true }],
      providerType: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(13),
        ],
      ],
    });

    this.flightForm.get('providerName')?.valueChanges.subscribe((value) => {
      const code = this.providerCodes ? [value.toUpperCase()] : String;
      if (code) {
        this.flightForm.get('providerCode')?.setValue(code);
      } else {
        this.flightForm.get('providerCode')?.setValue('');
      }
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const flightData = this.flightForm.getRawValue();

      // Use the AirlineService to add the flight data
      this.airlineService.addFlight(flightData).subscribe(
        (response) => {
          console.log('Flight Data Added:', response);
          alert('Flight successfully added!');
          // Redirect to home page after successful insertion
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error adding flight:', error);
          alert('Failed to add flight. Please try again.');
        }
      );
    }
  }
}
