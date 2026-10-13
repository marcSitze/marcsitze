import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { SERVICE_PACKAGES } from "../src/data/resume.ts";

test("Services Bento - Data & Deliverables", () => {
  assert.equal(SERVICE_PACKAGES.length, 3);
  const ids = SERVICE_PACKAGES.map((s) => s.id);
  assert.ok(ids.includes("ai-apps"));
  assert.ok(ids.includes("fintech-systems"));
  assert.ok(ids.includes("frontend-arch"));

  for (const s of SERVICE_PACKAGES) {
    assert.ok(s.deliverables.length >= 3, `${s.id} should have at least 3 deliverables`);
    assert.ok(s.bestFor, `${s.id} should define target audience`);
    assert.ok(s.badge, `${s.id} should have badge`);
  }
});

test("Services Bento - Component & Micro-Widgets", () => {
  const componentPath = path.resolve("src/app/components/servicesBento.tsx");
  assert.ok(fs.existsSync(componentPath), "servicesBento.tsx must exist");

  const content = fs.readFileSync(componentPath, "utf-8");
  assert.ok(content.includes("Google Lighthouse"), "Must include Lighthouse micro-widget");
  assert.ok(content.includes("streamQuery"), "Must include AI code preview");
  assert.ok(content.includes("Gateway Success Rate"), "Must include Fintech SLA widget");
});
