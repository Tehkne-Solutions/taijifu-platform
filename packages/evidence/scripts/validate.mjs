import { readFileSync } from "node:fs";
const schema = JSON.parse(readFileSync(new URL("../schema/evidence-record.schema.json", import.meta.url), "utf8"));
const required = new Set(schema.required ?? []);
for (const key of ["id", "createdAt", "kind", "status", "canonicalEntityId", "beltId", "body"]) {
  if (!required.has(key)) throw new Error(`Evidence schema missing required field: ${key}`);
}
if (schema.properties?.beltId?.const) throw new Error("Evidence belt contract must not be locked to one belt");
if (schema.properties?.beltId?.pattern !== "^BELT-[A-Z]+$") throw new Error("Evidence belt contract must require canonical BELT-* IDs");
if (schema.properties?.promotionGranted) throw new Error("Evidence schema must not contain promotion mutation fields");
console.log("TAIJIFU_EVIDENCE_SCHEMA_VALIDATION=PASS");
console.log(`required_fields=${required.size}`);
console.log("belt_scope=MULTI_BELT");
console.log("belt_promotion_field=ABSENT");
