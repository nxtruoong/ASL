// Introductory English explanations aligned with the supplied curriculum.
export const lessonContent = {
  1: {
    reading: [
    "From recording seasons and star directions for navigation, humans gradually built models that could be tested by observation. Telescopes expand visibility; Today, observatories also collect light beyond what the human eye can see.",
    "Astronomy connects physics, mathematics, and technology to explain celestial bodies. Measuring light from a star helps us deduce its characteristics without having to go there.",
    "Earth belongs to the Solar System. The Solar System is located in the Milky Way galaxy; The Milky Way is one of many galaxies. A light year measures the distance light travels in one year, not time."],

    question: "What unit of measurement is a light year?",
    options: ["Time", "Distance", "Brightness"],
    correct: 1,
    explanation:
    "The name has the word \u201Cyear\u201D, but this is the distance light travels in one year.",
    source: ["NASA \xB7 Space", "https://science.nasa.gov/universe/overview/"]
  },
  2: {
    reading: [
    "The Earth rotates on its axis and moves around the Sun. Rotation produces diurnal rhythms and the apparent motion of most celestial bodies from east to west.",
    "Earth's position in orbit causes the part of the sky visible at night to change over the year. The tilted axis causes the angle of light and length of daylight to change, creating the seasons.",
    "A solar eclipse occurs when the Moon covers the Sun from the perspective of Earth; A lunar eclipse occurs when the Moon passes through the Earth's shadow. Clouds and the atmosphere also create optical phenomena such as halos. Observe the Sun only with appropriate protective equipment."],

    question: "Why do stars seem to move overnight?",
    options: [
    "The Earth rotates on its own",
    "The Sun revolves around the Earth",
    "Stars move at the same speed"],

    correct: 0,
    explanation:
    "The Earth's rotation causes the observer's viewing direction to change continuously.",
    source: [
    "NASA \xB7 Solar System \u2013 Earth \u2013 Moon",
    "https://science.nasa.gov/learn/heat/big-ideas/big-idea-1-1/"]

  },
  3: {
    reading: [
    "A modern constellation is a defined region on the celestial sphere. Stars that form familiar shapes in that region can be at very different distances and are not necessarily close together in space.",
    "The International Astronomical Union recognizes 88 constellations that cover the entire sky. A familiar star formation is not necessarily an independent constellation: Big Dipper is a star formation in the Ursa Major constellation.",
    "Start with a recognizable shape, determine direction, then compare the star map by location and time of observation. Lower the screen brightness to let your eyes adjust to the dark."],

    question: "Do stars in the same constellation have to be close to each other?",
    options: [
    "Yes, they always belong to the same star cluster",
    "No, they can be very far apart",
    "There are only 12 constellations"],

    correct: 1,
    explanation:
    "A constellation is a way of dividing the sky from the perspective of Earth, not a certain group of stars close together.",
    source: [
    "NASA \xB7 Constellations",
    "https://science.nasa.gov/skywatching/faq/"]

  },
  4: {
    reading: [
    "The solar calendar follows a yearly cycle associated with the seasons. The seasonal year is about 365.2422 days long, so the calendar must have an adjustment rule so that the months do not gradually deviate from the season.",
    "The lunar month follows the lunar phase cycle, about 29.53 days. The Vietnamese calendar is a lunisolar calendar: it both follows the moon and is adjusted to fit the year according to the seasons.",
    "In the Gregorian calendar, years divisible by 4 are usually leap years; A full century year is only a leap when divisible by 400. The lunar calendar can add a leap month according to its own rules, not every three years adding a month.",
    "The 24 solar terms divide the yearly cycle according to the apparent position of the Sun on the ecliptic. They help tie the calendar to seasonal changes."],

    question: "Why does the lunisolar calendar need leap months?",
    options: [
    "Let every month have 30 days",
    "To keep lunar months aligned with the seasonal year",
    "Because the Earth stopped spinning"],

    correct: 1,
    explanation:
    "Twelve lunar months are shorter than a seasonal year. Leap months correct the accumulated drift.",
    source: [
    "US Naval Observatory \xB7 Astronomical basis of the calendar",
    "https://aa.usno.navy.mil/faq/calendars"]

  },
  5: {
    reading: [
    "Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays are all electromagnetic radiation. They differ in wavelength and frequency; The human eye only sees a small part of the spectrum.",
    "Separating light into spectrum is like opening a message into multiple lines. Spectral lines help identify elements; The spectral shape and displacement of the lines provide information about temperature and motion.",
    "In a vacuum, light travels at a speed of 299,792,458 meters per second. Because light takes time to reach us, looking at a distant celestial body is also looking into its past."],

    question: "What can infrared telescopes detect beyond the capabilities of the human eye?",
    options: [
    "Radiation has a longer wavelength than visible light",
    "The sound of the stars",
    "Only red light"],

    correct: 0,
    explanation:
    "Infrared is outside the visible range, toward longer wavelengths than red light.",
    source: ["NASA \xB7 Electromagnetic spectrum", "https://science.nasa.gov/ems/"]
  },
  6: {
    reading: [
    "In the Newtonian model, two masses attract each other with a force F = Gm\u2081m\u2082/r\xB2. Doubling the distance reduces the gravitational force to one-fourth, if the two masses are kept the same.",
    "General relativity describes gravity in terms of the curvature of spacetime created by matter and energy. Light is also affected, creating the phenomenon of gravitational lensing.",
    "Gravity helps gather gas into stars, keep planets in orbit, and bind matter in galaxies. It is a core mechanism in forming the structure of the universe."],

    question:
    "Keeping the two masses the same and doubling the distance, what happens to Newtonian gravity?",
    options: ["Double", "Reduced by half", "Reduced to a quarter"],
    correct: 2,
    explanation: "Force is inversely proportional to the square of distance: 1/2\xB2 = 1/4.",
    source: [
    "NASA \xB7 Fascinating and mechanical",
    "https://science.nasa.gov/learn/basics-of-space-flight/chapter3-1/"]

  },
  7: {
    reading: [
    "The Sun lies at the center of gravity of the Solar System and contains most of the system's mass. Outside are planets, dwarf planets and many small celestial bodies.",
    "The eight planets, from inside to outside, are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Natural satellites orbit the planet; The number known continues to change as new discoveries are made.",
    "Asteroids are often rich in rocks or metals; Comet contains a lot of ice and dust. Pluto is classified as a dwarf planet. Planetary mosaics often do not accurately represent actual distances."],

    question: "Which planet is directly behind Earth in order from the Sun?",
    options: ["Kim tinh", "Mars", "Jupiter"],
    correct: 1,
    explanation:
    "The order of the four planets closest to the Sun is Mercury, Venus, Earth and Mars.",
    source: ["NASA \xB7 Solar System", "https://science.nasa.gov/solar-system/"]
  },
  8: {
    reading: [
    "The Sun is a star. In the core, nuclear fusion turns hydrogen into helium and releases energy. The light we receive is part of that energy flow.",
    "Solar energy sustains much of the food chain and drives climate on Earth. Atmosphere, magnetic field and surface conditions together contribute to the habitability of the planet.",
    "Liquid water is an important indicator when looking for a habitable place. However, having suitable conditions does not mean finding life; Need direct evidence and independent verification."],

    question: "What is the main source of energy of the Sun?",
    options: [
    "Burn coal",
    "Nuclear fusion",
    "Reflects light from other stars"],

    correct: 1,
    explanation:
    "In the Sun's core, hydrogen fuses into helium, releasing energy.",
    source: ["NASA \xB7 Sun", "https://science.nasa.gov/sun/"]
  },
  9: {
    reading: [
    "The associated orbit of an object around the Sun can be approximated by an ellipse. Eccentricity e measures the degree of elongation: e = 0 is a circle; Larger e creates longer orbits. The real orbit is also subject to interference from other celestial bodies.",
    "Kepler's three laws state: planetary orbits are elliptical with the Sun at one focus; The radius connecting the planet to the Sun sweeps out equal areas in equal times; The square of the period is proportional to the cube of the semi-major axis. The planet therefore runs faster when it is closer to the Sun."],

    question: "When does a planet in an elliptical orbit move fastest?",
    options: [
    "Closest to the Sun",
    "Farthest from the Sun",
    "The speed is always the same"],

    correct: 0,
    explanation:
    "According to Kepler's second law, planets run faster in orbits closer to the Sun.",
    source: [
    "NASA \xB7 Orbits and Kepler's laws",
    "https://science.nasa.gov/solar-system/orbits-and-keplers-laws/"]

  },
  10: {
    reading: [
    "Nature has four basic interactions: gravitation, electromagnetism, strong interaction and weak interaction. They govern processes ranging from nuclear binding to celestial motion.",
    "The Standard Model describes elementary particles and three interactions beyond gravity. Electrons belong to the lepton group; Protons and neutrons are made of quarks. Therefore, not all particles in an atom are elementary particles.",
    "Dark matter is inferred through gravitational effects, such as galaxy motion and gravitational lensing. Its particle nature has not been determined; It should not be considered a substance found directly in the laboratory."],

    question: "Which interaction is not fully described by the Standard Model?",
    options: ["Electromagnetic", "Strong interaction", "Gravity"],
    correct: 2,
    explanation:
    "The Standard Model describes strong, weak, and electromagnetic interactions; gravity requires a broader framework.",
    source: [
    "CERN \xB7 Standard Model",
    "https://home.cern/science/physics/standard-model/"]

  },
  11: {
    reading: [
    "Stars vary in mass, temperature, luminosity and evolutionary stage. Blue is usually associated with hotter surfaces than red. The initial mass greatly affects the life path of a star.",
    "A star forms when a region of gas and dust collapses due to gravity. When the core is hot and dense enough, hydrogen fusion can be sustained, marking the main sequence star stage.",
    "Sun-like stars eventually leave behind white dwarfs. Some massive stars leave behind neutron stars or black holes. Not every star explodes into a supernova.",
    "Supernova is an extremely bright star explosion. One mechanism is that the core of a massive star collapses; Another mechanism involves white dwarfs in binary systems. The explosion scattered material into the interstellar medium."],

    question: "Is the Sun predicted to become a black hole?",
    options: [
    "Yes, all stars become black holes",
    "No, it would leave behind a white dwarf",
    "It will become a planet"],

    correct: 1,
    explanation:
    "The Sun does not have enough mass to end up as a black hole; The remnant is expected to be a white dwarf.",
    source: ["NASA \xB7 Stars", "https://science.nasa.gov/universe/stars/"]
  },
  12: {
    reading: [
    "Stellar-mass black holes can form when the core of a sufficiently massive star collapses. Black holes can also merge. The origin and growth process of supermassive black holes are still research topics.",
    "The event horizon is the boundary where light signals from inside cannot go out. Hot outside matter can glow strongly; Black holes do not suck up everything around them like a vacuum cleaner.",
    "White holes and worm holes appear in theoretical discussions of spacetime. There is no observational evidence confirming their existence; It is necessary to distinguish them from black holes for which observational evidence exists."],

    question: "What was there observational evidence for?",
    options: [
    "Wormholes are used for travel",
    "The white hole spews out matter",
    "Black holes affect stellar motion"],

    correct: 2,
    explanation:
    "Astronomers observe the impact of black holes through stellar movements, hot gas and many other signals.",
    source: ["NASA \xB7 Black hole", "https://science.nasa.gov/universe/black-holes/"]
  },
  13: {
    reading: [
    "The Milky Way is a barred spiral galaxy containing the Solar System. Because inside the galactic disk, we see many stars concentrated into the Milky Way in the dark sky.",
    "Andromeda is a large neighboring galaxy. The future movements of the Local Group depend on many galaxies; The possibility and timing of the Milky Way merging with Andromeda is still updated according to data, not a certain date.",
    "Galaxies can form groups and clusters, connected in the cosmic web. Gravitational lenses help study masses, including non-luminous components.",
    "The multiverse is a set of theoretical ideas, not a confirmed observational conclusion. Scientific models must be differentiated according to type of evidence and testability."],

    question: "What type of structure is the Milky Way?",
    options: ["One star", "A galaxy", "A planetary system"],
    correct: 1,
    explanation:
    "The Milky Way contains many stars, gas, dust and dark matter; The Solar System is only a small part.",
    source: [
    "NASA \xB7 Galaxies",
    "https://science.nasa.gov/universe/galaxies/"]

  },
  14: {
    reading: [
    "On a large scale, space is expanding. Light from many distant galaxies has its wavelength stretched, creating a cosmological redshift. Tightly bound systems like the Solar System do not expand in the same way.",
    "The Big Bang model describes the universe as once hotter, denser, then expanding and cooling. Microwave background radiation and the ratio of light elements are important evidence. The Big Bang was not an explosion from a point into pre-existing space.",
    "Long-term evolution depends on the composition of matter, energy and properties of dark energy. Future scenarios need to be distinguished from what has been measured; There are still many unanswered questions."],

    question: "Which statement is consistent with the Big Bang model?",
    options: [
    "Space can expand from a hotter, denser state",
    "The universe exploded from Earth",
    "All galaxies are the same age"],

    correct: 0,
    explanation:
    "The Big Bang describes the expansion and cooling history of the universe, without placing the Earth at the center of an explosion.",
    source: [
    "NASA \xB7 Early Universe",
    "https://science.nasa.gov/mission/webb/early-universe/"]

  }
};
