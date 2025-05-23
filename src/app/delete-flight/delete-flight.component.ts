import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';
import { Airline } from '../models/airline.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css'],
})
export class DeleteFlightComponent implements OnInit {
  deleteFlightForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private airlinesService: AirlineService,
    private router: Router
  ) {
    this.deleteFlightForm = this.fb.group({
      providerCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.pattern('^[A-Za-z0-9]{3}$'),
        ],
      ],
      providerType: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  checkProviderCode() {
    const providerCode = this.deleteFlightForm.get('providerCode')?.value;
    if (providerCode) {
      this.airlinesService.checkAirline(providerCode).subscribe(
        (exists: boolean) => {
          if (!exists) {
            this.errorMessage =
              'Provider code does not exist in the Airlines collection.';
            this.deleteFlightForm
              .get('providerCode')
              ?.setErrors({ notExists: true });
          } else {
            this.errorMessage = '';
          }
        },
        (error) => {
          console.error('Error checking provider code:', error);
          this.errorMessage =
            'An error occurred while checking the provider code.';
        }
      );
    }
  }

  onSubmit() {
    if (this.deleteFlightForm.valid) {
      const providerCode = this.deleteFlightForm.get('providerCode')?.value;
      const providerType = this.deleteFlightForm.get('providerType')?.value;

      this.airlinesService.deleteFlight(providerCode, providerType).subscribe(
        (success) => {
          if (success) {
            this.router.navigate(['/']); // Redirect to home page on success
          } else {
            this.errorMessage =
              'Failed to delete flight details. Please try again.';
          }
        },
        (error) => {
          console.error('Error deleting flight details:', error);
          this.errorMessage =
            'An error occurred while deleting flight details.';
        }
      );
    }
  }
}
