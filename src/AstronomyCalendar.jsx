import { useState } from "react";
import { astronomyMonths } from "./astronomyEvents.js";

export default function AstronomyCalendar() {
  const [month, setMonth] = useState("");
  const selected = month === "" ? null : astronomyMonths[Number(month)];

  return (
    <section className="astronomy-calendar" id="calendar">
      <div className="calendar-heading">
        <div>
          <span>OBSERVATION SCHEDULE · 2026</span>
          <h2>What's in the sky this month?</h2>
          <p>Choose the month in advance, then plan a safe night of observing.</p>
        </div>
        <label>
          <span>SELECT MONTH</span>
          <select value={month} onChange={(event) => setMonth(event.target.value)}>
            <option value="">— Select a month —</option>
            {astronomyMonths.map((item, index) => <option value={index} key={item.name}>{item.name}</option>)}
          </select>
        </label>
      </div>
      {selected ?
      <div className="calendar-events" aria-live="polite">
          <h3>{selected.name} <small>· {selected.events.length} highlighted events</small></h3>
          {selected.events.map((event) =>
        <article key={`${event.date}-${event.title}`}>
              <time>{event.date}</time>
              <div><h4>{event.title}</h4><p>{event.detail}</p></div>
            </article>
        )}
          <p className="calendar-note">Visibility depends on location, weather and moonlight. Do not look at the Sun without a specialized, standard filter.</p>
        </div> :

      <div className="calendar-empty"><span>✦</span><p>Events will appear after you select the month.</p></div>
      }
      <a href="https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/" target="_blank" rel="noreferrer">Calendar source: NASA · Watch the Skies 2026 ↗</a>
    </section>);

}
