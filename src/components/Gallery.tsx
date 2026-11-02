import { gallery } from "@/lib/content";
import { Photo } from "./Photo";
import { SectionLabel } from "./SectionLabel";

/**
 * Hand-placed layout: each frame has its own span, ratio and offset so the
 * page reads like a magazine spread rather than a grid of thumbnails.
 */
const layout = [
  { frame: "md:col-span-7 md:col-start-1 md:row-start-1", ratio: "aspect-[4/5] md:aspect-[6/5]", pos: "50% 30%", sizes: "(min-width: 768px) 58vw, 100vw" },
  { frame: "md:col-span-4 md:col-start-9 md:row-start-1 md:mt-40", ratio: "aspect-[3/4]", pos: "50% 40%", sizes: "(min-width: 768px) 33vw, 80vw" },
  { frame: "md:col-span-4 md:col-start-2 md:row-start-2 md:mt-20", ratio: "aspect-square", pos: "50% 50%", sizes: "(min-width: 768px) 33vw, 80vw" },
  { frame: "md:col-span-6 md:col-start-7 md:row-start-2 md:mt-36", ratio: "aspect-[16/10]", pos: "50% 55%", sizes: "(min-width: 768px) 50vw, 100vw" },
  { frame: "md:col-span-3 md:col-start-3 md:row-start-3 md:mt-24", ratio: "aspect-[2/3]", pos: "50% 25%", sizes: "(min-width: 768px) 25vw, 70vw" },
  { frame: "md:col-span-5 md:col-start-7 md:row-start-3 md:mt-12", ratio: "aspect-[4/5]", pos: "50% 45%", sizes: "(min-width: 768px) 42vw, 100vw" },
];

// Mobile rhythm: alternate full-bleed, inset-right and inset-left frames.
const mobile = ["", "ml-[18%]", "mr-[18%]", "", "ml-[28%]", "mr-[10%]"];

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="bg-charcoal text-bone"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-12 gap-x-8 md:items-end">
          <div className="col-span-12 md:col-span-6">
            <SectionLabel index="03" tone="light">
              Gallery
            </SectionLabel>
            <h2
              id="gallery-title"
              className="display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]"
            >
              Inside the shop
            </h2>
          </div>
          <p className="col-span-12 mt-6 max-w-[22rem] text-[0.9375rem] leading-relaxed text-ash-400 md:col-span-4 md:col-start-9 md:mt-0">
            The work, the tools and the room. Photographed as it is, without
            the polish of a campaign.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-24 md:gap-y-0">
          {gallery.map((item, i) => {
            const l = layout[i];
            return (
              <li
                key={item.id}
                className={`col-span-12 ${mobile[i]} ${l.frame}`}
              >
                <figure className="group">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]">
                      <Photo
                        id={item.id}
                        alt={item.alt}
                        sizes={l.sizes}
                        position={l.pos}
                        className={l.ratio}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 text-[0.75rem] tracking-wide text-ash-400">
                    <span className="font-serif text-[0.875rem] italic text-ash-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
