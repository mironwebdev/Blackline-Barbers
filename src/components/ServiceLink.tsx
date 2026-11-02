"use client";

import { selectService } from "@/lib/booking-events";

/** A service row that jumps to the booking form with the service preselected. */
export function ServiceLink({
  serviceId,
  children,
}: {
  serviceId: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#booking"
      onClick={() => selectService(serviceId)}
      className="group grid grid-cols-[2.25rem_1fr] gap-x-3 py-7 transition-[padding,background-color] duration-500 ease-out hover:bg-bone/60 md:grid-cols-[4rem_1fr] md:py-9 md:hover:px-5"
    >
      {children}
    </a>
  );
}
