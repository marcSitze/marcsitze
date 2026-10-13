import test from "node:test";
import assert from "node:assert/strict";
import en from "../src/app/dictionaries/en.json" with { type: "json" };
import fr from "../src/app/dictionaries/fr.json" with { type: "json" };

test("Hero Section - Dictionary Keys & Conversion Copy", () => {
  for (const dict of [en, fr]) {
    assert.ok(dict.hero.badge, "Hero must contain an availability badge");
    assert.ok(dict.hero.title, "Hero must contain an executive title");
    assert.ok(dict.hero.subtitle, "Hero must contain a value proposition subtitle");
    assert.ok(dict.hero.primaryCta, "Hero must have a primary CTA");
    assert.ok(dict.hero.secondaryCta, "Hero must have a secondary CTA");
  }

  assert.ok(en.hero.badge.toLowerCase().includes("available"));
  assert.ok(en.hero.title.includes("Senior Frontend Lead"));
  assert.ok(fr.hero.title.includes("Senior Frontend Lead"));
});
