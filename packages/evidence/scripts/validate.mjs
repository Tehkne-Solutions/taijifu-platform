import { readFileSync } from "node:fs";
const schema = JSON.parse(readFileSync(new URL("../schema/evidence-record.schema.json", import.meta.url), "utf8"));
const required = new Set(schema.required ?? []);
for (const key of ["id", "createdAt", "kind", "status", "canonicalEntityId", "beltId", "body"]) {
  if (!required.has(key)) throw new Error(`Evidence schema missing required field: ${key}`);
}
if (schema.properties?.beltId?.const !== "BELT-WHITE") throw new Error("Evidence belt contract must stay BELT-WHITE for VS1");
console.log("TAIJIFU_EVIDENCE_SCHEMA_VALIDATION=PASS");
console.log(`required_fields=${required.size}`);
console.log("belt_promotion_field=ABSENT");
