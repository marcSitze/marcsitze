# 08: Interactive Project Inquiry Modal with Direct WhatsApp Bridge & Email Toast

**What to build:** The primary conversion terminal of the portfolio. Clicking "Discuss a Project" or any contact trigger launches an interactive, glassmorphic modal allowing prospective clients to estimate and specify their project scope in a few clicks: selecting project type (AI Web App, Fintech Gateway, Mobile App, Frontend Lead), budget range (<$3k, $3k-$10k, $10k-$25k, $25k+), and timeline (Immediate, 1-3 months). The modal provides a 1-tap WhatsApp button with a dynamically prefilled professional message reflecting the client's selected options, alongside a one-click copy button for the direct email with an instant toast notification. Additionally displays clear timezone compatibility (Cameroon, UTC+1 / CET & EST overlap).

**Blocked by:** 03: Ambient Spotlight Hero with Live Availability Beacon & Primary CTAs, 05: 3D Tilt Case Study Showcase with Problem-Solution-Impact Tabs, 06: Interactive Services Bento Grid with Live Performance Demos

**Status:** ready-for-agent

- [ ] Modal opens smoothly with background blur when triggered by hero CTAs, service cards, or navigation links.
- [ ] Multi-step or tabbed scope selector allows clients to pick project type, budget tier, and estimated timeline.
- [ ] Direct WhatsApp CTA dynamically formats and opens a URL with a prefilled message (`https://wa.me/...&text=...`) matching the client's chosen scope.
- [ ] Email copy button writes the address to system clipboard and triggers an immediate visual toast notification ("Copied to clipboard!").
- [ ] Timezone transparency notes (UTC+1 with full European and US East Coast working hours overlap) are clearly communicated.
- [ ] Modal includes accessible keyboard navigation (ESC to close, focus trapping) and ARIA attributes.
- [ ] Automated tests verify modal trigger handling, scope selection state, and WhatsApp link generation.
