import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RsvpData } from './rsvp.model';
import { RsvpService } from '../services/rsvp';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  imports: [ReactiveFormsModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rsvp {
  readonly submitted = signal(false);
  private readonly rsvpService = inject(RsvpService);
  readonly submitting = signal(false);
  readonly submitError = signal(false);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),

    side: new FormControl<'groom' | 'bride'>('groom', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    attendance: new FormControl<'attending' | 'declined'>('attending', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    guestCount: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(10)],
    }),

    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)],
    }),
  });

  get isAttending(): boolean {
    return this.form.controls.attendance.value === 'attending';
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    const rawData = this.form.getRawValue();

    const data: RsvpData = {
      ...rawData,
      guestCount: rawData.attendance === 'attending' ? rawData.guestCount : 0,
    };

    this.submitting.set(true);
    this.submitError.set(false);

    this.rsvpService
      .submit(data)
      .pipe(
        finalize(() => {
          this.submitting.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.submitted.set(true);
            return;
          }

          this.submitError.set(true);
        },

        error: (error) => {
          console.error('RSVP submit failed:', error);
          this.submitError.set(true);
        },
      });
  }
}
