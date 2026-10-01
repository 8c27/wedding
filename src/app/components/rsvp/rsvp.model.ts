export interface RsvpData {
  name: string;
  side: 'groom' | 'bride';
  attendance: 'attending' | 'declined';
  guestCount: number;
  message: string;
}
