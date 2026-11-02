import { BookingForm } from "./BookingForm";
import { SectionLabel } from "./SectionLabel";

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="bg-paper text-ink"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 px-5 py-24 md:gap-x-8 md:px-10 md:py-36">
        <div className="col-span-12 md:col-span-4">
          <SectionLabel index="04">Book a Visit</SectionLabel>
          <h2
            id="booking-title"
            className="display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            Reserve
            <br />a chair
          </h2>
          <p className="mt-6 max-w-[20rem] text-[0.9375rem] leading-relaxed text-ash-600">
            Send an enquiry with a preferred time and the shop confirms by
            phone. Walk-ins are welcome when a chair is free.
          </p>
        </div>

        <div className="col-span-12 mt-14 md:col-span-7 md:col-start-6 md:mt-3">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
