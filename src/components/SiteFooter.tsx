import { contact, nav, photographers } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-10">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <a href="#top" aria-label="Back to top">
              <Wordmark className="text-base" />
            </a>
            <p className="mt-6 max-w-[18rem] text-[0.9375rem] leading-relaxed text-ash-400">
              Good hair. No shortcuts.
              <br />
              Business Bay, Dubai.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3 md:col-start-7">
            <h2 className="eyebrow text-ash-500">Site</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {[...nav, { label: "Book a Visit", href: "#booking" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="nav-link text-ash-300 hover:text-bone">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <h2 className="eyebrow text-ash-500">Contact</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-ash-300">
              <li>{contact.address.join(", ")}</li>
              <li className="tabular-nums">{contact.phone}</li>
              <li>{contact.email}</li>
              <li className="text-[0.75rem] text-ash-500">Contact details are placeholders.</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.75rem] leading-relaxed text-ash-500 md:flex-row md:justify-between md:gap-12">
          <p className="max-w-[40rem]">
            Blackline Barbers is a fictional brand. This website is a portfolio
            demonstration: the business, address, contact details and booking
            form are not real.
          </p>
          <p className="max-w-[28rem] md:text-right">
            Photography via Unsplash: {photographers.join(", ")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
