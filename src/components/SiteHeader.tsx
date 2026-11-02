"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-bone transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-charcoal/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[4.5rem] md:px-10">
        <a href="#top" aria-label="Blackline Barbers, back to top" onClick={close}>
          <Wordmark className="text-[0.8125rem]" />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] tracking-wide text-bone/80">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pl-3">
              <a
                href="#booking"
                className="border border-bone/40 px-4 py-2 text-bone transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
              >
                Book a Visit
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto bg-charcoal px-5 pb-10 md:hidden"
      >
        <nav aria-label="Mobile">
          <ol className="border-t border-white/10">
            {[...nav, { label: "Book a Visit", href: "#booking" }].map((item, i) => (
              <li key={item.href} className="border-b border-white/10">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="display text-[2.25rem]">{item.label}</span>
                  <span className="font-serif text-sm italic text-ash-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-10 text-sm leading-relaxed text-ash-400">
          Business Bay, Dubai
          <br />
          Open daily · see hours below
        </p>
      </div>
    </header>
  );
}
