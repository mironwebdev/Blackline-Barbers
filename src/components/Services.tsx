import { services } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { ServiceLink } from "./ServiceLink";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-paper text-ink"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 px-5 py-24 md:gap-x-8 md:px-10 md:py-36">
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionLabel index="01">Services</SectionLabel>
            <h2
              id="services-title"
              className="display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]"
            >
              The menu
            </h2>
            <p className="mt-6 max-w-[19rem] text-[0.9375rem] leading-relaxed text-ash-600">
              Every appointment starts with a short consultation. Prices in
              dirhams, inclusive of VAT.
            </p>
          </div>
        </div>

        <ol className="col-span-12 mt-14 border-b border-ink/15 md:col-span-8 md:mt-2">
          {services.map((s, i) => (
            <li key={s.id} className="border-t border-ink/15">
              <ServiceLink serviceId={s.id}>
                <span className="font-serif text-[0.9375rem] italic text-ash-500 md:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="text-[1.5rem] font-medium tracking-[-0.02em] md:text-[1.875rem]">
                      {s.name}
                    </span>
                    <span className="shrink-0 text-[1.0625rem] tabular-nums md:text-[1.1875rem]">
                      <span className="mr-1.5 text-[0.6875rem] tracking-[0.18em] text-ash-500">
                        AED
                      </span>
                      {s.price}
                    </span>
                  </span>
                  <span className="mt-3 grid gap-4 md:grid-cols-[1fr_auto] md:gap-12">
                    <span className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-ash-600">
                      {s.description}
                    </span>
                    <span className="flex items-center gap-6 self-end text-[0.75rem] tracking-wide text-ash-500">
                      <span>{s.duration}</span>
                      <span className="text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Book →
                      </span>
                    </span>
                  </span>
                </span>
              </ServiceLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
