# 01: Core Domain Models and SEO Structured Metadata Engine

**What to build:** The foundational data contracts and search engine discoverability engine for the portfolio. Prospective clients and search engine crawlers arriving at any localized route (`/en` and `/fr`) receive rich, valid Schema.org JSON-LD structured data representing a professional engineering consultancy (`ProfessionalService`), personal authority (`Person`), and packaged service offerings (`OfferCatalog`). OpenGraph and Twitter card metadata emit valid `summary_large_image` representations with localized titles, descriptions, and canonical tags. The domain models provide strongly typed records for flagship case studies (Bubo AI, Maviance, Warap Work, AfricaFix) with problem, solution, tech stack, and measurable impact metrics.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Domain models define complete data for Bubo AI, Maviance, Warap Work, and AfricaFix, including role, problem statement, architectural solution, and measurable business metrics.
- [x] Domain models define structured service packages (AI Web Apps, Fintech Systems, Frontend Architecture) with deliverables and value propositions.
- [x] Root and localized layout metadata emits valid Twitter card tags configured as `summary_large_image`.
- [x] Injected JSON-LD structured data validates against Schema.org for `Person`, `ProfessionalService`, and `OfferCatalog`.
- [x] Automated tests verify that metadata and structured data generate without errors across both `en` and `fr` locales.
