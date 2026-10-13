# 04: Enterprise Client Proof Marquee with Verified Company Logos

**What to build:** An infinite, seamless horizontal moving logo marquee positioned directly below the hero section. Displays verified client and employer brand logos (Bubo AI, Maviance, Alaxione, PNTEC, Warap Work) in high-contrast monochromatic styling that illuminates subtly on hover. Communicates enterprise track record and subconscious trust to prospective clients within the first 5 seconds of browsing.

**Blocked by:** 03: Ambient Spotlight Hero with Live Availability Beacon & Primary CTAs

**Status:** done

- [x] Infinite marquee loops seamlessly at 60FPS using GPU-accelerated CSS animations without jank or scroll stutter.
- [x] Brand logos render crisply with high contrast in both dark and light themes.
- [x] Hovering over the marquee pauses or slows the translation slightly to allow closer inspection.
- [x] Responsive gradient masks fade the left and right edges smoothly into the background.
- [x] Respects `prefers-reduced-motion` by displaying a clean static wrap grid if user animation is disabled.
- [x] Automated tests verify proper rendering of all partner logos and accessible aria attributes.
