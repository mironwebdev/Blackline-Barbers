# Blackline Barbers

A one-page website for **Blackline Barbers**, a fictional premium barbershop in Business Bay, Dubai. Built as a portfolio piece. The business, address, contact details and booking form are not real.

## Stack

- Next.js 15 (App Router), exported as a static site
- TypeScript
- Tailwind CSS v4
- Lucide icons (menu toggle only)
- Self-hosted fonts: Inter Tight and Instrument Serif, via @fontsource

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
npm run lint
```

## Deploy

Import the repo into Vercel and keep the defaults. Because `output: "export"` is set, the `out/` folder can also go on any static host.

## Structure

```
src/
  app/          layout (fonts, SEO metadata), page, global styles, icon
  components/   Header, Hero, Services, Story, Gallery, Booking, Location, Footer
  lib/          content.ts (services, hours, photos), booking-events.ts
```

All copy, prices, hours and photo IDs are in `src/lib/content.ts`.

## Notes

- **Photography:** free-licence Unsplash images loaded from Unsplash's CDN. A single monochrome grade (`.photo-grade` in `globals.css`) makes them read as one shoot. If an image can't load, a quiet captioned frame is shown instead. To serve the photos from your own server, download them into `public/photos/<id>.jpg` and build with `NEXT_PUBLIC_LOCAL_PHOTOS=1`.
- **Booking form:** validated in the browser only (UAE or international phone numbers, dates up to 60 days ahead, 30-minute slots within opening hours, at least 1 hour's notice). The confirmation says plainly that nothing was booked. To make it live, post the form to an API route or a form service.
- **SEO:** title, description, Open Graph and Twitter metadata are set. `robots` is set to noindex because the business is fictional. Remove that for a real client.
