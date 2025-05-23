import { Component, OnInit } from '@angular/core';
//import { Airline } from '../models/airline.model';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from '../models/airline.model';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css'],
})
export class ModifyFlightComponent implements OnInit {
  updateFlightForm: FormGroup;
  errorMessage: string = '';
  providerCodes: string[] = ['6E', 'SG', '15', 'G8', '9W', 'Al'];

  constructor(
    private fb: FormBuilder,
    private airlinesService: AirlineService,
    private router: Router
  ) {
    this.updateFlightForm = this.fb.group({
      providerCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z0-9]{2}$'),
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
    const providerCode = this.updateFlightForm.get('providerCode')?.value;
    if (providerCode) {
      this.airlinesService.checkAirline(providerCode).subscribe(
        (exists: boolean) => {
          if (!exists) {
            this.errorMessage =
              'Provider code does not exist in the Airlines collection.';
            this.updateFlightForm
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
    if (this.updateFlightForm.valid) {
      const providerCode = this.updateFlightForm.get('providerCode')?.value;
      const providerType = this.updateFlightForm.get('providerType')?.value;

      this.airlinesService
        .updateFlightDetails(providerCode, providerType)
        .subscribe(
          (success) => {
            if (success) {
              this.router.navigate(['view']);
            } else {
              this.errorMessage =
                'Failed to update flight details. Please try again.';
            }
          },
          (error) => {
            console.error('Error updating flight details:', error);
            this.errorMessage =
              'An error occurred while updating flight details.';
          }
        );
    }
  }
}
