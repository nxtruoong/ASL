import { useEffect, useMemo, useRef, useState } from "react";
import { lessonContent } from "./lessonContent";
import OrbitLab from "./OrbitLab";
import SpaceLab from "./SpaceLab";
import AstronomyCalendar from "./AstronomyCalendar.jsx";
import Quiz from "./Quiz";
import { checkpointQuestions, lessonDetails, lessonQuizzes } from "./learningExtras";
import { loadProgress, progressStorageKey } from "./progress";

const lessons = [
{
  id: 1,
  title: "Overview",
  category: "Foundation",
  time: "12 minutes",
  image: "deep-field.webp",
  credit: "NASA · Hubble Deep Field",
  color: "violet",
  topics: [
  "History of astronomy",
  "The role of astronomy in modern life",
  "Our place in the universe"],

  intro: "Starting with the biggest question: where are we in the universe?"
},
{
  id: 2,
  title: "Movement of the sky",
  category: "Observe",
  time: "14 minutes",
  image: "eclipse.webp",
  credit: "NASA \xB7 total solar eclipse",
  color: "amber",
  topics: [
  "Basic motion of the Earth",
  "The change of the sky by day and year",
  "Optical phenomena related to the Sun and Moon"],

  intro:
  "Find the rules in the seemingly endless movements in the sky."
},
{
  id: 3,
  title: "Constellations",
  category: "Observe",
  time: "13 minutes",
  image: "orion.gif",
  credit: "NASA \xB7 Constellation Orion",
  color: "blue",
  topics: [
  "Concepts, history and conventions",
  "List of modern constellations",
  "Identify constellations using maps and apps"],

  intro: "Learn how to turn dots of light into a map of the night sky."
},
{
  id: 4,
  title: "Astronomical basis of the Solar and Lunar Calendars",
  category: "Observe",
  time: "15 minutes",
  image: "moon.webp",
  credit: "NASA \xB7 Moon",
  color: "amber",
  topics: [
  "Basis of the Gregorian calendar",
  "Basis of the Lunar Calendar",
  "Leap days and leap months",
  "Gas secretions"],

  intro: "The calendar is a story about orbits, lunar phases and time."
},
{
  id: 5,
  title: "Light, radiation and spectrum",
  category: "Space physics",
  time: "14 minutes",
  image: "nebula.webp",
  credit: "NASA · Spitzer infrared",
  color: "pink",
  topics: [
  "Electromagnetic radiation bands",
  "Spectrum",
  "Light and the speed of light"],

  intro: "Light carries news from places we cannot reach."
},
{
  id: 6,
  title: "Gravity and gravitational fields",
  category: "Space physics",
  time: "15 minutes",
  image: "black-hole.webp",
  credit: "NASA · Event Horizon Telescope",
  color: "violet",
  topics: [
  "Gravity: characteristics, formulas and movements under the influence of gravity",
  "Gravitational fields in general relativity",
  "The role of gravity in the structure and evolution of the universe"],

  intro: "Trace the invisible force that holds planets, stars and galaxies together."
},
{
  id: 7,
  title: "Solar System",
  category: "Solar System",
  time: "16 minutes",
  image: "solar-system.webp",
  credit: "NASA/JPL · Voyager & Galileo",
  color: "blue",
  topics: ["Structure", "Planets and satellites", "Other celestial bodies"],
  intro: "Take a detour from the Sun through planets and smaller worlds."
},
{
  id: 8,
  title: "Sun and life",
  category: "Solar System",
  time: "14 minutes",
  image: "sun.webp",
  credit: "NASA/JPL-Caltech \xB7 Sun",
  color: "amber",
  topics: [
  "Characteristics of the Sun",
  "Solar radiation and its role in life",
  "Life in the Solar System"],

  intro:
  "Explore the nearest star and the conditions that make Earth home."
},
{
  id: 9,
  title: "Orbital motion",
  category: "Solar System",
  time: "13 minutes",
  image: "earth.webp",
  credit: "NASA \xB7 Earth from space",
  color: "blue",
  topics: [
  "Orbital characteristics of the planets",
  "Kepler's laws of orbital motion"],

  intro: "Orbits tell us how worlds move through space."
},
{
  id: 10,
  title: "Forces and elementary particles",
  category: "Space physics",
  time: "15 minutes",
  image: "star-nebula.webp",
  credit: "NASA · stellar nursery",
  color: "pink",
  topics: [
  "Fundamental forces in nature",
  "Elementary particles and structure of matter",
  "Dark matter"],

  intro:
  "From the smallest particle to the largest structure, matter has common rules."
},
{
  id: 11,
  title: "The birth and death of a star",
  category: "Cosmic life cycle",
  time: "17 minutes",
  image: "nebula.webp",
  credit: "NASA · Lagoon Nebula",
  color: "pink",
  topics: [
  "Types of stars in the universe",
  "Formation of a star",
  "Death of a star",
  "Supernova"],

  intro:
  "How gas clouds are born; stellar explosions sow the seeds for a new generation."
},
{
  id: 12,
  title: "Black hole",
  category: "Cosmic life cycle",
  time: "15 minutes",
  image: "black-hole.webp",
  credit: "Event Horizon Telescope Collaboration",
  color: "violet",
  topics: [
  "Formation of black holes",
  "Characteristics of black holes",
  "White holes and deep holes"],

  intro: "Step to the edge where gravity bends the path of light."
},
{
  id: 13,
  title: "Galaxies and beyond",
  category: "Cosmology",
  time: "16 minutes",
  image: "andromeda.webp",
  credit: "NASA/JPL-Caltech · Andromeda",
  color: "blue",
  topics: [
  "Our galaxy",
  "Collision with Andromeda",
  "Galaxy clusters",
  "Multiverse"],

  intro:
  "Leave the Milky Way to see star cities and vast cosmic structures."
},
{
  id: 14,
  title: "Big Bang and the future of the universe",
  category: "Cosmology",
  time: "15 minutes",
  image: "deep-field.webp",
  credit: "NASA · Hubble Deep Field",
  color: "violet",
  topics: [
  "The expansion of the universe",
  "Big Bang model",
  "The future of the universe"],

  intro: "Trace back the history of the universe and look to the possibilities ahead."
}];


const categories = [
"All",
"Foundation",
"Observe",
"Space physics",
"Solar System",
"Cosmic life cycle",
"Cosmology"];


const achievements = [
{ count: 1, icon: "✦", name: "First signal" },
{ count: 3, icon: "△", name: "Read the sky" },
{ count: 7, icon: "◉", name: "Planetary explorer" },
{ count: 14, icon: "∞", name: "Space citizen" }];

function Icon({ name, size = 18 }) {
  const paths = {
    search:
    <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>,

    orbit:
    <>
        <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4.5"
        transform="rotate(-35 12 12)" />

        <circle cx="12" cy="12" r="2" />
        <circle cx="18.5" cy="5.5" r="1" />
      </>,

    arrow:
    <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>,

    close:
    <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>,

    check:
    <>
        <path d="m5 12 4 4L19 6" />
      </>,

    book:
    <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" />
        <path d="M4 16a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>

  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round">

      {paths[name]}
    </svg>);

}

export default function App({ auth }) {
  const storageKey = progressStorageKey(auth?.userId);
  const [completed, setCompleted] = useState(() =>
  loadProgress(storageKey, lessons.length)
  );
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [reward, setReward] = useState(null);
  const dialogRef = useRef(null);
  const searchRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed));
    } catch {

      // Progress remains available for the current session.
    }}, [completed]);
  useEffect(() => {
    if (!reward) return undefined;
    const timer = setTimeout(() => setReward(null), 4200);
    return () => clearTimeout(timer);
  }, [reward]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === "k" &&
      !selected)
      {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({ block: "center" });
      }
      if (event.key === "Escape") setMobileNav(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected) {
      dialog.showModal();
      dialog.querySelector(".lesson-drawer")?.scrollTo(0, 0);
    } else dialog.close();
    document.body.style.overflow = selected || mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, mobileNav]);

  useEffect(() => {
    if (!mobileNav) return undefined;
    const sidebar = sidebarRef.current;
    const slideDuration =
    parseFloat(getComputedStyle(sidebar).transitionDuration) * 1000;
    const focusTimer = setTimeout(
      () => sidebar.querySelector("a")?.focus(),
      slideDuration + 32
    );
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const controls = [...sidebar.querySelectorAll("a, button")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", trapFocus);
      menuRef.current?.focus();
    };
  }, [mobileNav]);

  const visibleLessons = useMemo(
    () =>
    lessons.filter((lesson) => {
      const matchCategory = filter === "All" || lesson.category === filter;
      const normalize = (value) =>
      value.
      toLocaleLowerCase("vi").
      normalize("NFD").
      replace(/[\u0300-\u036f]/g, "").
      replace(/đ/g, "d");
      const term = normalize(query.trim());
      const matchQuery =
      !term ||
      normalize(
        `${lesson.title} ${lesson.category} ${lesson.topics.join(" ")}`
      ).includes(term);
      const matchDone = !showDone || completed.includes(lesson.id);
      return matchCategory && matchQuery && matchDone;
    }),
    [filter, query, showDone, completed]
  );

  const toggleComplete = (id) => {
    if (!auth?.can?.("progress:write")) return;
    const wasComplete = completed.includes(id);
    setCompleted((items) =>
    wasComplete ? items.filter((item) => item !== id) : [...items, id]
    );
    if (!wasComplete) {
      const unlocked = achievements.find((item) => item.count === completed.length + 1);
      setReward({ lesson: lessons[id - 1].title, unlocked });
    }
  };
  const current =
  lessons.find((lesson) => !completed.includes(lesson.id)) || lessons[0];
  const percent = Math.round(completed.length / lessons.length * 100);
  const xp = completed.length * 120;
  const rank = completed.length >= 14 ?
  "Galactic Navigator" :
  completed.length >= 7 ?
  "Planetary explorer" :
  completed.length >= 3 ?
  "Sky reader" :
  "Orbital rookie";
  const nextAchievement = achievements.find((item) => item.count > completed.length);
  const reading = selected ? lessonContent[selected.id] : null;
  const resetFilters = () => {
    setFilter("All");
    setQuery("");
    setShowDone(false);
  };

  return (
    <div className="app-shell">
      <aside
        ref={sidebarRef}
        id="primary-sidebar"
        role={mobileNav ? "dialog" : undefined}
        aria-modal={mobileNav || undefined}
        aria-label="Learning navigation"
        className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>

        <a className="brand" href="#home" aria-label="Orbit, homepage">
          <span className="brand-symbol">
            <Icon name="orbit" size={22} />
          </span>
          <span>
            trajectory<span className="brand-dot">.</span>
          </span>
        </a>
        <div className="nav-label">DISCOVER</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a
            className={`nav-link ${!showDone ? "active" : ""}`}
            href="#lessons"
            onClick={() => {
              resetFilters();
              setMobileNav(false);
            }}>

            <Icon name="book" /> Study roadmap
          </a>
          <button
            className={`nav-link ${showDone ? "active" : ""}`}
            onClick={() => {
              setShowDone((value) => !value);
              setMobileNav(false);
              document.
              querySelector("#lessons")?.
              scrollIntoView({ behavior: "smooth" });
            }}>

            <Icon name="check" /> Completed{" "}
            <span className="nav-count">{completed.length}</span>
          </button>
          <a className="nav-link" href="#simulations" onClick={() => setMobileNav(false)}>
            <Icon name="orbit" /> 3D simulation
          </a>
          <a className="nav-link" href="#checkpoint" onClick={() => setMobileNav(false)}>
            <Icon name="book" /> Test of 25 questions
          </a>
          <a className="nav-link" href="#calendar" onClick={() => setMobileNav(false)}>
            <Icon name="search" /> Ephemeris
          </a>
        </nav>
        <button
          className="nav-dismiss"
          aria-label="Close the menu"
          onClick={() => setMobileNav(false)}>

          <Icon name="close" />
        </button>
      </aside>

      <main
        className="main-area"
        id="home"
        aria-hidden={mobileNav || undefined}>

        <header className="topbar">
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-expanded={mobileNav}
            aria-controls="primary-sidebar"
            onClick={() => setMobileNav(true)}
            aria-label="Open the menu">

            <span />
            <span />
          </button>
          <div className="breadcrumbs">
            <span>Study space</span>
            <b>/</b>
            <strong>Astronomy</strong>
          </div>
          <div className="topbar-right">
            <span className={`role-chip ${auth?.mode === "mock" ? "role-chip-mock" : ""}`}>
              {auth?.hasRole?.("instructor") ? "Lecturer" : "Students"}
              {auth?.mode === "mock" && " \xB7 simulation"}
            </span>
            {auth?.enabled ?
            <button
              className="auth-button"
              onClick={() =>
              void (auth.authenticated ? auth.logout() : auth.login())
              }>

                {auth.authenticated ? "Sign out" : "Log in"}
              </button> :

            <span
              className="avatar"
              aria-label="Exploring without an account">

                <Icon name="orbit" size={17} />
              </span>
            }
          </div>
        </header>

        <div className="content-wrap">
          <section className="welcome-row">
            <div>
              <h1>
                Hello, <em>traveler.</em>
              </h1>
              <p className="welcome-copy">
                The universe is so wide. Where do I start?
              </p>
            </div>
            <div className="progress-card">
              <div className="progress-copy">
                <span>Your journey</span>
                <strong>
                  {completed.length}
                  <small> / 14 lessons</small>
                </strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={completed.length}
                aria-valuemin={0}
                aria-valuemax={14}
                aria-label="Number of completed articles">

                <span style={{ transform: `scaleX(${percent / 100})` }} />
              </div>
              <div className="progress-foot">
                <span>{percent}% complete</span>
                <span>
                  {completed.length === 0 ?
                  "Ready to take off?" :
                  completed.length === 14 ?
                  "You've gone all the way!" :
                  `${14 - completed.length} Lessons are waiting for you`}
                </span>
              </div>
            </div>
          </section>

          <section className="mission-dashboard" aria-label="Academic achievements">
            <article className="mission-rank">
              <div className="rank-orbit" aria-hidden="true"><span>{completed.length + 1}</span></div>
              <div><small>CURRENT LEVEL</small><h2>{rank}</h2><p>Each lesson completed takes you one step further into your trajectory.</p></div>
            </article>
            <article className="xp-card">
              <small>ENERGY OF DISCOVERY</small>
              <strong>{xp}<span> XP</span></strong>
              <div><span style={{ transform: `scaleX(${(completed.length % 3 || (completed.length ? 3 : 0)) / 3})` }} /></div>
              <p>{nextAchievement ? `Still ${nextAchievement.count - completed.length} post to receive “${nextAchievement.name}”.` : "You have unlocked all badges."}</p>
            </article>
            <article className="badge-card">
              <small>BADGE COLLECTION</small>
              <div className="badge-row">
                {achievements.map((achievement) =>
                <span key={achievement.name} className={completed.length >= achievement.count ? "badge-earned" : ""} title={`${achievement.name} · ${achievement.count} post`}>
                    <b>{achievement.icon}</b><i>{achievement.count}</i>
                  </span>
                )}
              </div>
            </article>
          </section>

          {auth?.can?.("class:read") &&
          <section className="instructor-zone instructor-zone-open" aria-label="Lecturer's compartment">
              <div>
                <small>LECTURER SPACE</small>
                <h2>Class overview</h2>
                <p>This area is only visible to accounts with the role <code>instructor</code>.</p>
              </div>
              <strong>{completed.length}/14 completed articles</strong>
            </section>
          }

          <section className="feature" aria-label="Next lesson">
            <div
              className="feature-image"
              style={{ backgroundImage: `url('/images/${current.image}')` }}
              role="img"
              aria-label={current.title}>

              <span className="image-credit">IMAGE: {current.credit}</span>
              <div className="feature-coordinate">
                {String(current.id).padStart(2, "0")} <i>—</i>{" "}
                {current.category.toUpperCase()}
              </div>
            </div>
            <div className="feature-content">
              <h2>
                {current.id === 1 ?
                <>
                    You are here.
                    <br />
                    <em>Between infinity.</em>
                  </> :

                current.title
                }
              </h2>
              <p>{current.intro}</p>
              <button
                className="start-button"
                onClick={() => setSelected(current)}>

                {completed.length === 14 ?
                "Rediscover from the beginning" :
                completed.length ?
                "Keep exploring" :
                "Start your journey"}{" "}
                <Icon name="arrow" size={17} />
              </button>
              <div className="feature-bottom">
                <span>
                  POST {String(current.id).padStart(2, "0")} · {current.title}
                </span>
                <span className="feature-time">{current.time}</span>
              </div>
            </div>
            <div className="feature-index">
              POST
              <br />
              <strong>{String(current.id).padStart(2, "0")}</strong>
              <span>/ 14</span>
            </div>
          </section>

          <OrbitLab compact onOpen={() => setSelected(lessons[8])} />

          <SpaceLab />

          <section className="lesson-section" id="lessons">
            <div className="section-top">
              <div>
                <h2>
                  Lesson map<span className="title-period">.</span>
                </h2>
              </div>
              <p className="section-aside">
                14 small stages, a vast universe.
                <br />
                Choose any place you want to visit.
              </p>
            </div>
            <div className="lesson-tools">
              <div className="lesson-count" aria-live="polite">
                <strong>
                  {visibleLessons.length.toString().padStart(2, "0")}
                </strong>{" "}
                <span>{showDone ? "lesson learned" : "lesson"}</span>
                {(filter !== "All" || query || showDone) &&
                <button className="reset-filter" onClick={resetFilters}>
                    Clear filtering
                  </button>
                }
              </div>
              <label className="search-box">
                <Icon name="search" size={17} />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="What are you curious about?"
                  aria-label="Find lessons" />

                <kbd>Ctrl K</kbd>
              </label>
            </div>
            <div className="filter-row" aria-label="Filter topics">
              {categories.map((category) =>
              <button
                key={category}
                aria-pressed={filter === category}
                className={`filter-chip ${filter === category ? "filter-selected" : ""}`}
                onClick={() => setFilter(category)}>

                  {category}
                </button>
              )}
            </div>
            {visibleLessons.length ?
            <div className="lesson-grid">
                {visibleLessons.map((lesson) => {
                const done = completed.includes(lesson.id);
                return (
                  <article
                    key={lesson.id}
                    className={`lesson-card ${done ? "lesson-complete" : ""}`}>

                      <button
                      className="card-open"
                      onClick={() => setSelected(lesson)}
                      aria-label={`Open article ${lesson.id}: ${lesson.title}`}>

                        <div className={`lesson-art art-${lesson.color}`}>
                          <img
                          src={`/images/${lesson.image}`}
                          alt=""
                          loading={lesson.id < 5 ? "eager" : "lazy"} />

                          <span className="art-wash" />
                          <span className="lesson-number">
                            {String(lesson.id).padStart(2, "0")}
                          </span>
                          <span className="art-action">
                            <Icon name="arrow" size={16} />
                          </span>
                          {done &&
                        <span className="done-flag">
                              <Icon name="check" size={13} /> LEARNED
                            </span>
                        }
                          <span className="art-credit">{lesson.credit}</span>
                        </div>
                        <div className="lesson-info">
                          <div className="lesson-meta">
                            <span
                            className={`category-tag tag-${lesson.color}`}>

                              {lesson.category}
                            </span>
                            <span>{lesson.time}</span>
                          </div>
                          <h3>{lesson.title}</h3>
                          <p>{lesson.intro}</p>
                          <div className="lesson-footer">
                            <span>
                              {lesson.topics.length} discovery content
                            </span>
                            <span className="lesson-cta">
                              Discover <Icon name="arrow" size={14} />
                            </span>
                          </div>
                        </div>
                      </button>
                      <button
                      className={`complete-toggle ${done ? "toggle-done" : ""}`}
                      onClick={() => toggleComplete(lesson.id)}
                      aria-pressed={done}
                      aria-label={
                      done ?
                      `Uncheck complete: ${lesson.title}` :
                      `Mark complete: ${lesson.title}`
                      }
                      title={
                      done ?
                      "Uncheck complete" :
                      "Mark complete"
                      }>

                        {done && <Icon name="check" size={14} />}
                      </button>
                    </article>);

              })}
              </div> :

            <div className="empty-state">
                <div className="empty-orbit">
                  <Icon name="orbit" size={35} />
                </div>
                <h3>Haven't seen this constellation yet</h3>
                <p>Try a different keyword or clear the filter to see the full route.</p>
                <button
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                  setShowDone(false);
                }}>

                  View all lessons <Icon name="arrow" size={15} />
                </button>
              </div>
            }
          </section>

          <section className={`checkpoint ${[1, 2, 3].every((id) => completed.includes(id)) ? "checkpoint-open" : ""}`} id="checkpoint">
            <div className="checkpoint-heading">
              <span>REFORMATION STATION · AFTER THE FIRST 3 LESSONS</span>
              <h2>Foundation test</h2>
              <p>25 multiple choice questions about the scale of the universe, celestial movements and constellations.</p>
            </div>
            {[1, 2, 3].every((id) => completed.includes(id)) ?
            <Quiz questions={checkpointQuestions} title="Comprehensive test \xB7 25 questions" resetKey="checkpoint-1" /> :

            <div className="checkpoint-locked">
                <span>03</span>
                <div><strong>Complete the first three lessons to unlock it</strong><p>Current progress: {[1, 2, 3].filter((id) => completed.includes(id)).length}/3 songs.</p></div>
              </div>
            }
          </section>

          <AstronomyCalendar />

          <footer className="page-footer">
            <a href="/images/SOURCES.md" target="_blank" rel="noreferrer">
              Real photos from NASA & observatories
            </a>
            <span>
              Learn at your own pace <Icon name="orbit" size={14} />
            </span>
          </footer>
        </div>
      </main>

      <dialog
        ref={dialogRef}
        className="drawer-dialog"
        aria-labelledby="drawer-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelected(null);
        }}>

        {selected &&
        <article className="lesson-drawer">
            <div
            className="drawer-image"
            style={{ backgroundImage: `url('/images/${selected.image}')` }}>

              <span className="image-credit">IMAGE: {selected.credit}</span>
              <button
              autoFocus
              className="drawer-close"
              onClick={() => setSelected(null)}
              aria-label="Close the lesson">

                <Icon name="close" />
              </button>
              <span className="drawer-index">
                POST {String(selected.id).padStart(2, "0")} / 14
              </span>
            </div>
            <div className="drawer-body">
              <div className="lesson-meta">
                <span className={`category-tag tag-${selected.color}`}>
                  {selected.category}
                </span>
                <span>{selected.time} discover</span>
              </div>
              <h2 id="drawer-title">{selected.title}</h2>
              <p className="drawer-intro">{selected.intro}</p>
              {selected.id === 9 && <OrbitLab />}
              <div className="reading-sections">
                {selected.topics.map((topic, index) =>
              <section key={topic}>
                    <h3>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {topic}
                    </h3>
                    <p>{reading.reading[index]}</p>
                    <p>{lessonDetails[selected.id][index]}</p>
                  </section>
              )}
              </div>
              <a
              className="lesson-source"
              href={reading.source[1]}
              target="_blank"
              rel="noreferrer">

                Read more: {reading.source[0]} <Icon name="arrow" size={14} />
              </a>
              <Quiz
              key={selected.id}
              resetKey={selected.id}
              questions={lessonQuizzes[selected.id]}
              title="Consolidate the lesson \xB7 5 sentences" />

              <button
              className={`drawer-complete ${completed.includes(selected.id) ? "is-complete" : ""}`}
              onClick={() => toggleComplete(selected.id)}>

                {completed.includes(selected.id) ?
              <>
                    <Icon name="check" /> Completed · Undo
                  </> :

              <>
                    Mark completed <Icon name="arrow" size={16} />
                  </>
              }
              </button>
              <div className="lesson-pagination">
                <button
                disabled={selected.id === 1}
                onClick={() => setSelected(lessons[selected.id - 2])}>

                  Previous article
                </button>
                <span>{selected.id} / 14</span>
                <button
                disabled={selected.id === 14}
                onClick={() => setSelected(lessons[selected.id])}>

                  Next article <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          </article>
        }
      </dialog>
      {mobileNav &&
      <button
        className="mobile-scrim"
        aria-label="Close the menu"
        onClick={() => setMobileNav(false)} />

      }
      {reward &&
      <aside className="reward-toast" role="status">
          <span>+120 XP</span>
          <div><strong>Complete: {reward.lesson}</strong>{reward.unlocked && <p>New badge · {reward.unlocked.name}</p>}</div>
          <button onClick={() => setReward(null)} aria-label="Close notification">×</button>
        </aside>
      }
    </div>);

}
