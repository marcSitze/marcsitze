import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { RESUME, CERTIFICATES } from "../src/data/resume.ts";

test("Experience - Data Order and Content", () => {
  const experiences = RESUME.filter((item) => item.mainType === "EXPERIENCE");
  assert.ok(experiences.length >= 5, "Must have at least 5 experience records");

  // Verify Bubo, Maviance, PNTEC
  const places = experiences.map((e) => e.place.toLowerCase());
  assert.ok(places.some((p) => p.includes("bubo")), "Must include Bubo");
  assert.ok(places.some((p) => p.includes("maviance")), "Must include Maviance");

  // Verify certificates
  assert.ok(CERTIFICATES.length >= 3, "Must have at least 3 certifications");
  for (const cert of CERTIFICATES) {
    assert.ok(cert.title);
    assert.ok(cert.link.startsWith("http"));
  }
});

test("Experience - Component Free of Bootstrap Artifacts", () => {
  const componentPath = path.resolve("src/app/components/experience.tsx");
  const content = fs.readFileSync(componentPath, "utf-8");

  assert.ok(!content.includes("col-md-6"), "Must not contain col-md-6");
  assert.ok(!content.includes("badge-pill"), "Must not contain badge-pill");
  assert.ok(!content.includes("educ-container"), "Must not contain educ-container");
});
