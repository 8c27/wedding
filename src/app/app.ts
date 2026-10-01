import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './components/hero/hero';
import { Invitation } from './components/invitation/invitation';
import { Detail } from './components/detail/detail';
import { Gallery } from './components/gallery/gallery';
import { Countdown } from './components/countdown/countdown';
import { Location } from './components/location/location';
import { Rsvp } from './components/rsvp/rsvp';

@Component({
  selector: 'app-root',
  imports: [Hero, Invitation, Detail, Gallery, Countdown, Rsvp],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('wedding');
}
