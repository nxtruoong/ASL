# Astronomy learning app · surface brief

- **Job and audience:** Self-guided Vietnamese-speaking learners browse and study the 14 astronomy lessons in the supplied curriculum. Surface mode: Operate with an exploratory learning path.
- **Outcome and proof:** Learner can find a topic, preview its subtopics, and mark a lesson complete. The curriculum outline itself is the product's specific content.
- **Direction:** A visual astronomy field guide: deep ink navigation frames a warm paper reading surface; NASA photographs make the topics concrete. The opening view combines a current learning prompt with an image-led lesson path.
- **Scope:** Responsive single-page prototype. Include all 14 lessons, search, topic filters, a keyboard-accessible reader with an introductory explanation per subtopic and a quick quiz per lesson, a Kepler orbit model, locally saved progress, and optional TideCloak sign-in when an adapter is configured.
- **States and interactions:** Initial progress, in-progress lessons, completed lessons, no search results, selected lesson detail, and responsive navigation. Search and filters combine; completion can be toggled.
- **Constraints:** Existing React/Vite stack retained. Vietnamese UI. NASA image provenance recorded in `public/images/SOURCES.md`. TideCloak configuration stays outside source control; account progress remains browser-local until a backend exists.

## Direction contract

**THESIS:** Make the curriculum feel like a place to explore: see a real astronomical object, manipulate an orbit, then open a lesson.

**OWN-WORLD:** Astronomy field guide. Deep teal navigation and photographic space frame a warm paper study surface. Manrope provides clear structure; italic Playfair Display brings a personal, curious voice. Local DM Sans handles reading.

**STORY:** Welcome and local progress; photographic next lesson; hands-on orbital motion; searchable curriculum; readable lessons and quick recall.

**FIRST VIEWPORT:** A large Hubble deep-field image leads into an oversized two-line greeting to the universe. The next action is clear, with an orbit lab immediately beneath. Mobile stacks the photo and type with a readable single-column curriculum.

**FORM:** Code-first was explicitly selected by the user. No approved raster comp or concept tournament was produced. Signature behavior is a canvas orbit computed from Kepler's equation, with adjustable eccentricity, play/pause, and a time scrubber in lesson 9. It is a teaching model, not an ephemeris.
