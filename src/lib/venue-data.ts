import { Section, Venue } from "./types";

function generateSeats(count: number, soldPercentage: number = 0.3) {
  return Array.from({ length: count }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: i + 1,
    status: (Math.random() < soldPercentage
      ? Math.random() < 0.6
        ? "sold"
        : "reserved"
      : "available") as "available" | "reserved" | "sold",
  }));
}

function generateRows(
  rowCount: number,
  seatsPerRow: number,
  soldPct: number = 0.3
) {
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: rowCount }, (_, i) => ({
    id: `row-${labels[i]}`,
    label: labels[i],
    seats: generateSeats(seatsPerRow, soldPct),
  }));
}

const concertHallSections: Section[] = [
  {
    id: "vip-pit",
    name: "VIP Pit",
    type: "vip",
    color: "#f59e0b",
    price: 350,
    rows: generateRows(4, 20, 0.5),
    path: "M 250 200 L 550 200 L 580 280 L 220 280 Z",
    labelX: 400,
    labelY: 240,
  },
  {
    id: "floor-ga",
    name: "Floor General",
    type: "floor",
    color: "#8b5cf6",
    price: 195,
    rows: generateRows(8, 24, 0.35),
    path: "M 210 290 L 590 290 L 620 430 L 180 430 Z",
    labelX: 400,
    labelY: 360,
  },
  {
    id: "lower-left",
    name: "Lower Left",
    type: "lower",
    color: "#3b82f6",
    price: 145,
    rows: generateRows(6, 18, 0.25),
    path: "M 60 200 L 200 200 L 170 430 L 40 380 Z",
    labelX: 120,
    labelY: 310,
  },
  {
    id: "lower-right",
    name: "Lower Right",
    type: "lower",
    color: "#3b82f6",
    price: 145,
    rows: generateRows(6, 18, 0.25),
    path: "M 600 200 L 740 200 L 760 380 L 630 430 Z",
    labelX: 680,
    labelY: 310,
  },
  {
    id: "lower-center",
    name: "Lower Center",
    type: "lower",
    color: "#06b6d4",
    price: 120,
    rows: generateRows(6, 28, 0.2),
    path: "M 170 440 L 630 440 L 660 540 L 140 540 Z",
    labelX: 400,
    labelY: 490,
  },
  {
    id: "upper-left",
    name: "Upper Left",
    type: "upper",
    color: "#10b981",
    price: 75,
    rows: generateRows(5, 22, 0.15),
    path: "M 20 390 L 160 440 L 130 550 L 10 510 Z",
    labelX: 80,
    labelY: 475,
  },
  {
    id: "upper-right",
    name: "Upper Right",
    type: "upper",
    color: "#10b981",
    price: 75,
    rows: generateRows(5, 22, 0.15),
    path: "M 640 440 L 780 390 L 790 510 L 670 550 Z",
    labelX: 720,
    labelY: 475,
  },
  {
    id: "upper-center",
    name: "Upper Center",
    type: "upper",
    color: "#22d3ee",
    price: 55,
    rows: generateRows(5, 30, 0.1),
    path: "M 130 555 L 670 555 L 690 630 L 110 630 Z",
    labelX: 400,
    labelY: 592,
  },
];

export const concertHall: Venue = {
  id: "venue-1",
  name: "Stellar Arena",
  city: "Los Angeles",
  state: "CA",
  capacity: 18500,
  sections: concertHallSections,
};
