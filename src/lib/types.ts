export interface Event {
  id: string;
  name: string;
  artist: string;
  date: string;
  time: string;
  venue: Venue;
  imageUrl: string;
  genre: string;
  priceRange: { min: number; max: number };
  description: string;
  status: "on-sale" | "few-left" | "sold-out";
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
  rows: VenueRow[];
}

export interface VenueRow {
  id: string;
  label: string;
  seats: Seat[];
  price: number;
  tier: "vip" | "premium" | "standard" | "balcony";
}

export interface Seat {
  id: string;
  number: number;
  status: "available" | "reserved" | "sold";
}

export interface CartItem {
  eventId: string;
  eventName: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  rowLabel: string;
  seatNumber: number;
  seatId: string;
  price: number;
  tier: string;
}

export interface TicketOrder {
  id: string;
  items: CartItem[];
  total: number;
  purchasedAt: string;
  email: string;
  name: string;
}
