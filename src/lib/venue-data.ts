import { Venue, VenueRow } from "./types";

function generateSeats(count: number, soldPct: number = 0.25) {
  return Array.from({ length: count }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: i + 1,
    status: (Math.random() < soldPct
      ? Math.random() < 0.6
        ? "sold"
        : "reserved"
      : "available") as "available" | "reserved" | "sold",
  }));
}

function buildRows(): VenueRow[] {
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const layout: { count: number; seats: number; price: number; tier: VenueRow["tier"]; soldPct: number }[] = [
    // VIP front rows (A-C): 16 seats, $250
    { count: 3, seats: 16, price: 250, tier: "vip", soldPct: 0.5 },
    // Premium rows (D-H): 20 seats, $150
    { count: 5, seats: 20, price: 150, tier: "premium", soldPct: 0.35 },
    // Standard rows (I-P): 26 seats, $85
    { count: 8, seats: 26, price: 85, tier: "standard", soldPct: 0.2 },
    // Balcony rows (Q-T): 30 seats, $45
    { count: 4, seats: 30, price: 45, tier: "balcony", soldPct: 0.1 },
  ];

  const rows: VenueRow[] = [];
  let labelIdx = 0;

  for (const tier of layout) {
    for (let i = 0; i < tier.count; i++) {
      rows.push({
        id: `row-${labels[labelIdx]}`,
        label: labels[labelIdx],
        seats: generateSeats(tier.seats, tier.soldPct),
        price: tier.price,
        tier: tier.tier,
      });
      labelIdx++;
    }
  }

  return rows;
}

export const concertHall: Venue = {
  id: "venue-1",
  name: "Stellar Arena",
  city: "Los Angeles",
  state: "CA",
  capacity: 18500,
  rows: buildRows(),
};
