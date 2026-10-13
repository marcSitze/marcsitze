import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Inquiry Modal - Component & Options", () => {
  const modalPath = path.resolve("src/app/components/inquiryModal.tsx");
  assert.ok(fs.existsSync(modalPath), "inquiryModal.tsx must exist");

  const content = fs.readFileSync(modalPath, "utf-8");
  assert.ok(content.includes("ai-webapp"), "Must support AI Web App category");
  assert.ok(content.includes("fintech-portal"), "Must support Fintech & Payments category");
  assert.ok(content.includes("mobile-app"), "Must support Mobile App category");
  assert.ok(content.includes("wa.me/237699576276"), "Must contain verified WhatsApp number");
  assert.ok(content.includes("marcsitze01@gmail.com"), "Must contain verified email");
});

test("Contact Terminal - Interactive Integration", () => {
  const contactPath = path.resolve("src/app/components/contact.tsx");
  assert.ok(fs.existsSync(contactPath), "contact.tsx must exist");

  const content = fs.readFileSync(contactPath, "utf-8");
  assert.ok(content.includes("InquiryModal"), "Must import InquiryModal");
  assert.ok(content.includes("Estimate Your Project Scope"), "Must contain fast-track estimator trigger");
  assert.ok(content.includes("UTC+1"), "Must communicate timezone overlap");
});
