import { photos } from "@/lib/content";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative bg-charcoal text-bone"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 px-5 pt-24 md:gap-x-8 md:px-10 md:pt-[4.5rem]">
        {/* Photograph — bleeds right, sits higher than the type. */}
        <div className="col-span-12 -mx-5 md:col-span-7 md:col-start-6 md:row-start-1 md:mx-0 md:-mr-10 md:pt-10">
          <Photo
            id={photos.hero.id}
            alt={photos.hero.alt}
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            position="50% 30%"
            className="aspect-[4/5] md:aspect-auto md:h-[calc(100svh-7rem)] md:max-h-[920px] md:min-h-[560px]"
          />
          <div className="mt-3 hidden justify-between px-0 text-[0.6875rem] tracking-wide text-ash-400 md:flex">
            <span>Pl. 01 — Scissor over comb</span>
            <span>Business Bay</span>
          </div>
        </div>

        {/* Type block — anchored to the bottom of the image on desktop. */}
        <div className="relative z-10 col-span-12 flex flex-col pb-14 pt-10 md:col-span-5 md:col-start-1 md:row-start-1 md:justify-end md:pb-20 md:pt-10">
          <p className="eyebrow mb-8 flex items-center gap-4 text-ash-400 md:mb-12">
            <span>Barbers</span>
            <span aria-hidden className="h-px w-8 bg-ash-600" />
            <span>Dubai</span>
          </p>

          <h1
            id="hero-title"
            className="display text-[clamp(3.25rem,7.4vw,7rem)] md:-mr-24 md:whitespace-nowrap lg:-mr-40"
          >
            Good hair.
            <br />
            <span className="md:pl-[0.9em]">No shortcuts.</span>
          </h1>

          <div className="mt-10 max-w-[23rem] md:mt-14">
            <p className="text-[1.0625rem] leading-relaxed text-ash-300">
              Considered cuts, proper technique and an attention to detail that
              makes the difference.
            </p>
            <div className="mt-8 flex items-center gap-8 text-sm">
              <a href="#booking" className="rule-link text-bone">
                Book a visit
              </a>
              <a
                href="#services"
                className="text-ash-400 transition-colors hover:text-bone"
              >
                View the menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
