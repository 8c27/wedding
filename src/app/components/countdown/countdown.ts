import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Countdown implements OnDestroy {
  readonly days = signal(0);
  readonly hours = signal(0);
  readonly minutes = signal(0);
  readonly seconds = signal(0);

  readonly isWeddingDay = signal(false);

  private readonly weddingDate = new Date('2026-12-06T12:00:00+08:00').getTime();

  private readonly timer: ReturnType<typeof setInterval>;

  constructor() {
    this.updateCountdown();

    this.timer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private updateCountdown(): void {
    const now = Date.now();
    const distance = this.weddingDate - now;

    if (distance <= 0) {
      this.days.set(0);
      this.hours.set(0);
      this.minutes.set(0);
      this.seconds.set(0);

      this.isWeddingDay.set(true);
      return;
    }

    this.days.set(Math.floor(distance / (1000 * 60 * 60 * 24)));

    this.hours.set(Math.floor((distance / (1000 * 60 * 60)) % 24));

    this.minutes.set(Math.floor((distance / (1000 * 60)) % 60));

    this.seconds.set(Math.floor((distance / 1000) % 60));
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
