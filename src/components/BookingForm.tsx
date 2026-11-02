"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { hoursForWeekday, services } from "@/lib/content";
import { SELECT_SERVICE_EVENT } from "@/lib/booking-events";

type Fields = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", service: "", date: "", time: "" };
const BOOKING_WINDOW_DAYS = 60;

/* ---------- date helpers (local time, yyyy-mm-dd) ---------- */

function toISODate(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseISODate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(mins: number) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

/** 30-minute slots within opening hours; past slots removed for today. */
function slotsFor(dateValue: string, now: Date) {
  const date = parseISODate(dateValue);
  if (!date) return [];
  const { open, close } = hoursForWeekday(date.getDay());
  const slots: string[] = [];
  const isToday = dateValue === toISODate(now);
  const earliest = now.getHours() * 60 + now.getMinutes() + 60; // 1h notice
  for (let t = toMinutes(open); t <= toMinutes(close) - 45; t += 30) {
    if (isToday && t < earliest) continue;
    slots.push(fromMinutes(t));
  }
  return slots;
}

function formatLongDate(value: string) {
  const d = parseISODate(value);
  return d
    ? d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : value;
}

/* ---------- validation ---------- */

function normalisePhone(raw: string) {
  return raw.replace(/[\s\-().]/g, "");
}

function validate(f: Fields, now: Date): Errors {
  const e: Errors = {};
  const name = f.name.trim();
  if (!name) e.name = "Please enter your name.";
  else if (name.length < 2 || !/\p{L}/u.test(name))
    e.name = "Please enter your full name.";

  const phone = normalisePhone(f.phone);
  if (!phone) e.phone = "Please enter a phone number.";
  else if (
    !/^(?:\+971|00971|0)5\d{8}$/.test(phone) && // UAE mobile
    !/^(?:\+971|00971|0)[2-9]\d{7}$/.test(phone) && // UAE landline
    !/^\+(?!971)\d{8,15}$/.test(phone) // international, with country code
  )
    e.phone = "Use a UAE number like 050 123 4567, or include your country code.";

  if (!f.service) e.service = "Please choose a service.";

  const today = parseISODate(toISODate(now))!;
  const date = parseISODate(f.date);
  if (!f.date) e.date = "Please choose a date.";
  else if (!date) e.date = "Please enter a valid date.";
  else if (date < today) e.date = "That date has already passed.";
  else if ((date.getTime() - today.getTime()) / 86_400_000 > BOOKING_WINDOW_DAYS)
    e.date = `We take enquiries up to ${BOOKING_WINDOW_DAYS} days ahead.`;
  else if (slotsFor(f.date, now).length === 0)
    e.date = "No times left on this day. Please choose another.";

  if (!e.date) {
    if (!f.time) e.time = "Please choose a time.";
    else if (!slotsFor(f.date, now).includes(f.time))
      e.time = "That time isn't available. Please choose another.";
  }
  return e;
}

/* ---------- component ---------- */

export function BookingForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState<Fields | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // `now` is set on the client only, so server and client markup match.
  useEffect(() => setNow(new Date()), []);

  // Service rows elsewhere on the page can preselect a service.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (services.some((s) => s.id === id)) {
        setSubmitted(null);
        setFields((f) => ({ ...f, service: id }));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const errors = useMemo(() => (now ? validate(fields, now) : {}), [fields, now]);
  const slots = useMemo(() => (now && fields.date ? slotsFor(fields.date, now) : []), [fields.date, now]);
  const minDate = now ? toISODate(now) : undefined;
  const maxDate = now
    ? toISODate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + BOOKING_WINDOW_DAYS))
    : undefined;

  const show = (k: keyof Fields) => (attempted || touched[k]) && errors[k];

  const update = (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFields((f) => {
        const next = { ...f, [k]: value };
        // Changing the date can invalidate the chosen time.
        if (k === "date" && now && !slotsFor(value, now).includes(f.time)) next.time = "";
        return next;
      });
    };

  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const current = new Date();
    setNow(current);
    const errs = validate(fields, current);
    const first = (Object.keys(EMPTY) as (keyof Fields)[]).find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSubmitted({ ...fields, name: fields.name.trim() });
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setFields(EMPTY);
    setTouched({});
    setAttempted(false);
    setSubmitted(null);
  };

  const errorCount = Object.keys(errors).length;
  const id = (k: string) => `${uid}-${k}`;

  if (submitted) {
    const svc = services.find((s) => s.id === submitted.service)!;
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="border-t border-ink pt-8 outline-none"
      >
        <p className="eyebrow text-ash-500">Enquiry checked</p>
        <h3 className="mt-4 text-[1.75rem] font-medium leading-tight tracking-[-0.02em]">
          Thank you, {submitted.name.split(" ")[0]}. Nothing has been booked yet.
        </h3>
        <p className="mt-4 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ash-600">
          This site is a portfolio demonstration with no booking system behind
          it, so your details have not been sent anywhere and no chair has been
          reserved. On a live site, this enquiry would go to the shop to
          confirm by phone.
        </p>
        <dl className="mt-8 grid grid-cols-[7rem_1fr] gap-y-3 border-y border-ink/15 py-6 text-[0.9375rem]">
          <dt className="text-ash-500">Service</dt>
          <dd>{svc.name} · AED {svc.price}</dd>
          <dt className="text-ash-500">Date</dt>
          <dd>{formatLongDate(submitted.date)}</dd>
          <dt className="text-ash-500">Time</dt>
          <dd>{submitted.time}</dd>
          <dt className="text-ash-500">Phone</dt>
          <dd>{submitted.phone}</dd>
        </dl>
        <button type="button" onClick={reset} className="rule-link mt-8 text-sm">
          Start a new enquiry
        </button>
      </div>
    );
  }

  const input =
    "w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-[1.0625rem] text-ink outline-none transition-colors placeholder:text-ash-400 focus:border-ink disabled:cursor-not-allowed disabled:text-ash-400";
  const borderFor = (k: keyof Fields) =>
    show(k) ? "border-[#8a2d22]" : "border-ink/25 hover:border-ink/50";

  const label = "eyebrow block text-ash-500";

  const Err = ({ k }: { k: keyof Fields }) =>
    show(k) ? (
      <p id={id(`${k}-error`)} className="mt-2 text-[0.8125rem] text-[#8a2d22]">
        {errors[k]}
      </p>
    ) : null;

  const aria = (k: keyof Fields) => ({
    "aria-invalid": Boolean(show(k)) || undefined,
    "aria-describedby": show(k) ? id(`${k}-error`) : undefined,
  });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={id("note")}>
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className={label}>Name</label>
          <input
            id={id("name")} name="name" type="text" autoComplete="name"
            value={fields.name} onChange={update("name")} onBlur={blur("name")}
            className={`${input} ${borderFor("name")}`} {...aria("name")}
          />
          <Err k="name" />
        </div>

        <div>
          <label htmlFor={id("phone")} className={label}>Phone number</label>
          <input
            id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel"
            placeholder="050 123 4567"
            value={fields.phone} onChange={update("phone")} onBlur={blur("phone")}
            className={`${input} ${borderFor("phone")}`} {...aria("phone")}
          />
          <Err k="phone" />
        </div>

        <div>
          <label htmlFor={id("service")} className={label}>Service</label>
          <select
            id={id("service")} name="service"
            value={fields.service} onChange={update("service")} onBlur={blur("service")}
            className={`${input} ${borderFor("service")} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%3E%3Cpath%20d=%22M1%201l4%204%204-4%22%20fill=%22none%22%20stroke=%22%23141312%22/%3E%3C/svg%3E')] bg-[length:10px_6px] bg-[right_2px_center] bg-no-repeat pr-6 ${fields.service ? "" : "text-ash-400"}`}
            {...aria("service")}
          >
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — AED {s.price}
              </option>
            ))}
          </select>
          <Err k="service" />
        </div>

        <div>
          <label htmlFor={id("date")} className={label}>Preferred date</label>
          <input
            id={id("date")} name="date" type="date" min={minDate} max={maxDate}
            value={fields.date} onChange={update("date")} onBlur={blur("date")}
            className={`${input} ${borderFor("date")} [color-scheme:light]`} {...aria("date")}
          />
          <Err k="date" />
        </div>

        <div>
          <label htmlFor={id("time")} className={label}>Preferred time</label>
          <select
            id={id("time")} name="time"
            value={fields.time} onChange={update("time")} onBlur={blur("time")}
            disabled={slots.length === 0}
            className={`${input} ${borderFor("time")} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%3E%3Cpath%20d=%22M1%201l4%204%204-4%22%20fill=%22none%22%20stroke=%22%23141312%22/%3E%3C/svg%3E')] bg-[length:10px_6px] bg-[right_2px_center] bg-no-repeat pr-6 ${fields.time ? "" : "text-ash-400"}`}
            {...aria("time")}
          >
            <option value="">
              {fields.date ? (slots.length ? "Choose a time" : "No times available") : "Choose a date first"}
            </option>
            {slots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <Err k="time" />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {attempted && errorCount > 0
          ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
          : ""}
      </p>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="bg-ink px-8 py-4 text-sm tracking-wide text-paper transition-colors duration-300 hover:bg-ash-700 sm:order-2"
        >
          Send enquiry
        </button>
        <p id={id("note")} className="max-w-[22rem] text-[0.8125rem] leading-relaxed text-ash-500">
          Demo form: your details are checked in the browser only and are not
          sent or stored.
        </p>
      </div>
    </form>
  );
}
