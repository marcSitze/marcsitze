import test from "node:test";
import assert from "node:assert/strict";
import { PORTFOLIO } from "../src/data/resume.ts";

test("Case Studies Filtering Logic", () => {
  const categories = ["all", "ai", "fintech", "web", "mobile"];

  for (const cat of categories) {
    const filtered = PORTFOLIO.filter((work) => {
      if (cat === "all") return true;
      if (cat === "web") return work.mainType.toLowerCase() === "web";
      if (cat === "mobile") return work.mainType.toLowerCase() === "mobile";
      return work.category?.toLowerCase() === cat;
    });

    assert.ok(filtered.length > 0, `Category ${cat} should have at least 1 project`);
  }
});

test("Flagship Case Studies Structure", () => {
  const bubo = PORTFOLIO.find((p) => p.slug === "bubo-ai");
  assert.ok(bubo, "Bubo AI must exist");
  assert.equal(bubo.category, "ai");
  assert.ok(bubo.problem.length > 20);
  assert.ok(bubo.solution.length > 20);
  assert.ok(bubo.impactMetrics.length >= 2);

  const maviance = PORTFOLIO.find((p) => p.slug === "maviance-payment-portal");
  assert.ok(maviance, "Maviance must exist");
  assert.equal(maviance.category, "fintech");

  const warap = PORTFOLIO.find((p) => p.slug === "warap-work");
  assert.ok(warap, "Warap Work must exist");
  assert.equal(warap.category, "marketplace");

  const africafix = PORTFOLIO.find((p) => p.slug === "africafix-mobile");
  assert.ok(africafix, "AfricaFix must exist");
  assert.equal(africafix.mainType, "MOBILE");
});
