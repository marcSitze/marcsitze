import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Client Marquee - Component and Partners", () => {
  const componentPath = path.resolve("src/app/components/clientMarquee.tsx");
  assert.ok(fs.existsSync(componentPath), "clientMarquee.tsx must exist");

  const content = fs.readFileSync(componentPath, "utf-8");
  assert.ok(content.includes("Bubo AI"), "Must contain Bubo AI");
  assert.ok(content.includes("Maviance"), "Must contain Maviance");
  assert.ok(content.includes("Alaxione"), "Must contain Alaxione");
  assert.ok(content.includes("PNTEC"), "Must contain PNTEC");
  assert.ok(content.includes("animate-marquee"), "Must use animate-marquee utility");
  assert.ok(content.includes("motion-reduce"), "Must support motion-reduce");
});
