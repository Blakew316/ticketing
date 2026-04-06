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
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  type: "floor" | "lower" | "upper" | "vip" | "box";
  color: string;
  price: number;
  rows: Row[];
  /** SVG path data for the section shape */
  path: string;
  /** Label position */
  labelX: number;
  labelY: number;
}

export interface Row {
  id: string;
  label: string;
  seats: Seat[];
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
  sectionName: string;
  sectionType: string;
  rowLabel: string;
  seatNumber: number;
  seatId: string;
  price: number;
}

export interface TicketOrder {
  id: string;
  items: CartItem[];
  total: number;
  purchasedAt: string;
  email: string;
  name: string;
}
