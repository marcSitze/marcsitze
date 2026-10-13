# 07: Tracing Beam Career Journey & Certification Timeline

**What to build:** A scroll-driven interactive timeline section replacing the fragmented experience cards and residual Bootstrap markup. Features an animated Tracing Beam that illuminates an SVG path along the left rail as the visitor scrolls down past career milestones. Milestones highlight leadership and engineering roles (Bubo Frontend Lead, Maviance Software Engineer, Alaxione, PNTEC) with company badges, dates, key responsibilities, and technologies used. An integrated certifications submodule showcases verified credentials (HackerRank React, freeCodeCamp Full-Stack) with external verification links.

**Blocked by:** 01: Core Domain Models and SEO Structured Metadata Engine

**Status:** ready-for-agent

- [ ] ScrollTrigger or motion beam smoothly traces vertical progress as each experience milestone enters the viewport.
- [ ] Residual Bootstrap classes (`row`, `col-md-6`, `badge-pill`) are completely eliminated in favor of clean Tailwind CSS v4 layout tokens.
- [ ] Milestone cards feature company logos, localized dates, role titles, and technology tags with clean hover states.
- [ ] Certification credentials render external verification links with accessible security attributes (`rel="noopener noreferrer"`).
- [ ] Timeline degrades gracefully into a clean static vertical line on mobile screens or when reduced motion is preferred.
- [ ] Automated tests verify chronological ordering and external credential link validity.
