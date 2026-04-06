import { Event } from "./types";
import { concertHall } from "./venue-data";

export const events: Event[] = [
  {
    id: "evt-1",
    name: "Neon Dreams World Tour",
    artist: "Aurora Vex",
    date: "2026-06-15",
    time: "8:00 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "Electronic / Synth-Pop",
    priceRange: { min: 55, max: 350 },
    description:
      "Experience the mesmerizing visuals and ethereal soundscapes of Aurora Vex's Neon Dreams World Tour. This groundbreaking show features immersive 360° projections, live orchestra integration, and tracks from the platinum album 'Neon Dreams'.",
    status: "on-sale",
  },
  {
    id: "evt-2",
    name: "Midnight Echoes Tour",
    artist: "The Velvet Wolves",
    date: "2026-07-22",
    time: "7:30 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "Indie Rock",
    priceRange: { min: 55, max: 350 },
    description:
      "The Velvet Wolves return with their critically acclaimed Midnight Echoes Tour. Known for their explosive live performances and anthemic choruses, this show promises to be an unforgettable night of raw energy and emotional depth.",
    status: "on-sale",
  },
  {
    id: "evt-3",
    name: "Soul Revival",
    artist: "Jasmine Cole",
    date: "2026-08-10",
    time: "8:00 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "R&B / Soul",
    priceRange: { min: 55, max: 350 },
    description:
      "Grammy-winning artist Jasmine Cole brings her Soul Revival tour to Stellar Arena. With her powerhouse vocals and a 12-piece band, this intimate yet grand performance celebrates the golden age of soul with a modern twist.",
    status: "few-left",
  },
  {
    id: "evt-4",
    name: "Thunderstrike Festival",
    artist: "Multiple Artists",
    date: "2026-09-05",
    time: "4:00 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "Hard Rock / Metal",
    priceRange: { min: 55, max: 350 },
    description:
      "The ultimate rock experience featuring six legendary bands on one stage. Thunderstrike Festival brings together icons of hard rock and metal for an all-day extravaganza of face-melting riffs and earth-shaking drums.",
    status: "on-sale",
  },
  {
    id: "evt-5",
    name: "Celestial Harmonies",
    artist: "Luna Park Orchestra",
    date: "2026-10-18",
    time: "7:00 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "Classical / Orchestral",
    priceRange: { min: 55, max: 350 },
    description:
      "The Luna Park Orchestra presents an evening of celestial beauty, performing pieces inspired by the cosmos. From Holst's The Planets to original compositions, this concert weaves together classical mastery with stunning visual accompaniments.",
    status: "on-sale",
  },
  {
    id: "evt-6",
    name: "Bass Drop Chronicles",
    artist: "DJ Phantom",
    date: "2026-11-28",
    time: "9:00 PM",
    venue: concertHall,
    imageUrl: "",
    genre: "EDM / Bass",
    priceRange: { min: 55, max: 350 },
    description:
      "DJ Phantom's legendary Bass Drop Chronicles tour has sold out arenas worldwide. This high-energy spectacle features cutting-edge sound systems, pyrotechnics, and the most advanced laser show ever assembled for a music tour.",
    status: "sold-out",
  },
];

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}
