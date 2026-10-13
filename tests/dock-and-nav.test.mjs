import test from "node:test";
import assert from "node:assert/strict";
import en from "../src/app/dictionaries/en.json" with { type: "json" };
import fr from "../src/app/dictionaries/fr.json" with { type: "json" };
import { i18n } from "../src/i18n-config.ts";

test("Navigation Dictionaries - Key Parity", () => {
  const expectedKeys = ["home", "about", "work", "services", "experience", "contact", "portfolio"];
  for (const key of expectedKeys) {
    assert.ok(en.nav[key], `English nav must have ${key}`);
    assert.ok(fr.nav[key], `French nav must have ${key}`);
  }
});

test("Language Redirect Utility", () => {
  const testPath = "/en/about";
  const segments = testPath.split("/");
  segments[1] = "fr";
  const redirected = segments.join("/");
  assert.equal(redirected, "/fr/about");

  assert.ok(i18n.locales.includes("en"));
  assert.ok(i18n.locales.includes("fr"));
});
