import { photos } from "@/lib/content";
import { Photo } from "./Photo";
import { SectionLabel } from "./SectionLabel";

const principles = [
  {
    term: "Detail",
    text: "Necklines, ear lines, the weight at the crown. The small things are checked twice.",
  },
  {
    term: "Consistency",
    text: "Your cut is noted after every visit, so the next one starts where this one finished.",
  },
  {
    term: "Service",
    text: "Appointments run to time. No rush at the chair, no waiting in the doorway.",
  },
];

export function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="overflow-hidden bg-bone text-ink"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 px-5 py-24 md:gap-x-8 md:px-10 md:py-36">
        {/* Image pair: large frame bleeding left, small detail stepped down. */}
        <div className="relative col-span-12 md:col-span-6 md:row-span-2">
          <Photo
            id={photos.story.id}
            alt={photos.story.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            position="58% 50%"
            className="-ml-5 aspect-[4/5] md:-ml-10 md:aspect-[5/6]"
          />
          <div className="relative -mt-24 ml-auto w-[46%] border-[10px] border-bone md:absolute md:-bottom-24 md:-right-[22%] md:mt-0 md:w-[42%] md:border-[14px]">
            <Photo
              id={photos.storyDetail.id}
              alt={photos.storyDetail.alt}
              sizes="(min-width: 768px) 22vw, 46vw"
              position="62% 45%"
              className="aspect-[3/4]"
            />
          </div>
        </div>

        <div className="col-span-12 mt-16 md:col-span-5 md:col-start-8 md:mt-10">
          <SectionLabel index="02">Our Story</SectionLabel>
          <h2
            id="story-title"
            className="display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            Built around
            <br />
            the craft.
          </h2>

          <div className="mt-10 space-y-5 text-[1.0625rem] leading-[1.7] text-ash-700">
            <p>
              Blackline is a small shop with a simple idea: do the work
              properly. Every cut is planned around the way your hair grows,
              how you style it and how it should look in three weeks, not just
              when you leave the chair.
            </p>
            <p>
              We keep the room calm and the list short, so each barber has the
              time to get it right. That is the whole approach.
            </p>
          </div>
        </div>

        <dl className="col-span-12 mt-16 md:col-span-5 md:col-start-8 md:mt-20">
          {principles.map((p) => (
            <div
              key={p.term}
              className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-ink/15 py-5 text-[0.9375rem]"
            >
              <dt className="font-serif text-[1.25rem] italic leading-tight">
                {p.term}
              </dt>
              <dd className="leading-relaxed text-ash-600">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
