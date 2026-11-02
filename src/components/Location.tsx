import { contact, hours, photos } from "@/lib/content";
import { Photo } from "./Photo";
import { SectionLabel } from "./SectionLabel";

function Placeholder() {
  return (
    <span className="ml-2 border border-ash-600 px-1.5 py-0.5 align-middle text-[0.625rem] uppercase tracking-[0.16em] text-ash-400">
      Placeholder
    </span>
  );
}

export function Location() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-charcoal text-bone"
    >
      <Photo
        id={photos.location.id}
        alt={photos.location.alt}
        sizes="100vw"
        position="50% 60%"
        className="aspect-[16/9] w-full md:aspect-[21/7]"
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 px-5 py-24 md:gap-x-8 md:px-10 md:py-32">
        <div className="col-span-12 md:col-span-4">
          <SectionLabel index="05" tone="light">
            Location
          </SectionLabel>
          <h2
            id="contact-title"
            className="display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            Find us
          </h2>
        </div>

        <div className="col-span-12 mt-14 grid gap-12 sm:grid-cols-3 md:col-span-8 md:mt-3 md:gap-8">
          <div>
            <h3 className="eyebrow text-ash-400">Address</h3>
            <address className="mt-5 text-[1.0625rem] not-italic leading-relaxed">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ash-400">
              Demo address. No street location for this fictional shop.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-ash-400">Hours</h3>
            <dl className="mt-5 space-y-4 text-[1.0625rem]">
              {hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-[0.8125rem] text-ash-400">{h.days}</dt>
                  <dd className="tabular-nums">
                    {h.open} – {h.close}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="eyebrow text-ash-400">Contact</h3>
            <ul className="mt-5 space-y-4 text-[1.0625rem]">
              <li>
                <span className="block text-[0.8125rem] text-ash-400">
                  Phone <Placeholder />
                </span>
                <span className="tabular-nums">{contact.phone}</span>
              </li>
              <li>
                <span className="block text-[0.8125rem] text-ash-400">
                  Email <Placeholder />
                </span>
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
