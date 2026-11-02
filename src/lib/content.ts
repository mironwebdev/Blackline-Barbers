/**
 * BLACKLINE BARBERS — site content.
 * Fictional brand built as a portfolio demonstration. All business details
 * below are placeholders and must not be presented as real.
 */

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "classic-haircut",
    name: "Classic Haircut",
    price: 90,
    duration: "45 min",
    description:
      "Scissor and clipper work tailored to your head shape and how you wear your hair day to day. Finished with a wash and style.",
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    price: 110,
    duration: "50 min",
    description:
      "A seamless graduation down to the skin, blended by hand and checked in natural light. Clean lines, no visible steps.",
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    price: 60,
    duration: "30 min",
    description:
      "Shaped to suit your jawline, with a hot towel and a straight-razor edge on the cheeks and neck.",
  },
  {
    id: "haircut-beard",
    name: "Haircut & Beard",
    price: 140,
    duration: "75 min",
    description:
      "Our full haircut and beard trim in one sitting, so both are considered together rather than separately.",
  },
  {
    id: "full-grooming",
    name: "Full Grooming",
    price: 190,
    duration: "105 min",
    description:
      "Haircut, beard, hot towel shave and a facial cleanse. An unhurried appointment for when you have the time.",
  },
];

/** Opening hours — used for display and to build valid booking times. */
export const hours = [
  { days: "Saturday – Thursday", open: "10:00", close: "22:00" },
  { days: "Friday", open: "14:00", close: "22:00" },
] as const;

/** Returns opening/closing time for a JS weekday (0 = Sunday). */
export function hoursForWeekday(day: number) {
  return day === 5 ? hours[1] : hours[0];
}

export const contact = {
  address: ["Business Bay", "Dubai, UAE"],
  phone: "+971 4 000 0000",
  email: "hello@blackline.example",
};

/**
 * Photography — all free-licence images from Unsplash (unsplash.com/license).
 * A monochrome grade is applied in CSS so the set reads as one shoot.
 */
export const photos = {
  hero: {
    id: "1647140655214-e4a2d914971f",
    alt: "A barber cutting a client's hair with scissors",
  },
  story: {
    id: "1503951914875-452162b0f3f1",
    alt: "A client seated in a leather barber chair",
  },
  storyDetail: {
    id: "1624981015149-e01395f1d774",
    alt: "A barber holding a pair of cutting scissors towards the camera",
  },
  location: {
    id: "1536520002442-39764a41e987",
    alt: "Shop interior lit by low pendant lamps",
  },
} as const;

export const photographers = [
  "Nate Johnston",
  "Allef Vinicius",
  "Tá Focando",
  "Gulom Nazarov",
  "Agustin Fernandez",
  "Ahmad Ebadi",
  "Nathon Oski",
];

export type GalleryItem = {
  id: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "1657105052497-f996284ffff8",
    alt: "A barber working through the top with thinning shears and a comb",
    caption: "At the chair",
  },
  {
    id: "1599351431202-1e0f0137899a",
    alt: "A barber using a straight razor to define a hairline",
    caption: "Razor work",
  },
  {
    id: "1621605815971-fbc98d665033",
    alt: "Clippers, scissors and a comb laid out on a slate board",
    caption: "The station",
  },
  {
    id: "1773904215697-e6c21fc27ac2",
    alt: "Barber chairs and basins in a dimly lit room",
    caption: "After hours",
  },
  {
    id: "1630827020718-3433092696e7",
    alt: "Profile of a man with a finished haircut and shaped beard",
    caption: "Finished",
  },
  {
    id: "1517832606299-7ae9b720a186",
    alt: "A barber trimming a client's beard with scissors",
    caption: "Beard detail",
  },
];

/** Unsplash CDN URL at a given width. */
export function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=78`;
}
