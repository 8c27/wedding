import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RsvpData } from '../rsvp/rsvp.model';

export interface RsvpResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class RsvpService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://script.google.com/macros/s/AKfycbwF2ldve2HqxwEJPO1Onk5TR_5AhIq1hG-vwzOcqegYUmcWEs5Gp1zXPq3P38TXBAhoKw/exec';

  submit(data: RsvpData): Observable<RsvpResponse> {
    return this.http.post<RsvpResponse>(this.apiUrl, JSON.stringify(data), {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });
  }
}
