import test from "node:test";
import assert from "node:assert/strict";
import { PORTFOLIO, SERVICE_PACKAGES, USER } from "../src/data/resume.ts";
import robots from "../src/app/robots.ts";

test("Domain Models - Case Studies", () => {
  assert.equal(PORTFOLIO.length >= 4, true, "Should have at least 4 flagship case studies");
  const slugs = PORTFOLIO.map((p) => p.slug);
  assert.ok(slugs.includes("bubo-ai"), "Bubo AI should be included");
  assert.ok(slugs.includes("maviance-payment-portal"), "Maviance should be included");
  assert.ok(slugs.includes("warap-work"), "Warap Work should be included");
  assert.ok(slugs.includes("africafix-mobile"), "AfricaFix should be included");

  // Verify all have impact metrics and structured problem/solution
  for (const cs of PORTFOLIO) {
    assert.ok(cs.title, "Case study must have title");
    assert.ok(cs.problem, "Case study must have problem statement");
    assert.ok(cs.solution, "Case study must have solution statement");
    assert.ok(Array.isArray(cs.impactMetrics), "Case study must have impactMetrics array");
    assert.ok(cs.impactMetrics.length > 0, "Case study must have at least one impact metric");
  }
});

test("Domain Models - Service Packages", () => {
  assert.equal(SERVICE_PACKAGES.length, 3, "Should have 3 core service packages");
  assert.ok(USER.title.includes("Senior Frontend Lead"), "User title must reflect senior positioning");
});

test("SEO - Robots route", () => {
  const robotsFn = typeof robots === "function" ? robots : (robots.default || robots);
  const robotsConfig = robotsFn();
  assert.equal(robotsConfig.sitemap, "https://marcsitze.dev/sitemap.xml");
  assert.equal(robotsConfig.rules.allow, "/");
});
