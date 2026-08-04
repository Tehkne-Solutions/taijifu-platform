import { bases, belts, canonRelease, nuclei, paths } from "@taijifu/canon";
import contentNodes from "@taijifu/content/data/nodes";
import type { RagDocument } from "./types";

function compact(parts: Array<string | undefined | null>): string {
  return parts.filter(Boolean).join(" · ");
}

export function buildCanonCorpus(): RagDocument[] {
  const docs: RagDocument[] = [];
  for (const base of bases) {
    docs.push({ id:`RAG-${base.id}`, canonicalEntityId:base.id, tier:"current-canon", title:`Base ${base.name}`, text:compact([`Base ${base.name}`, base.function, `cor ${base.color}`]), tags:["base",base.name.toLowerCase()], status:"current" });
  }
  for (const belt of belts.filter((x)=>x.status==="current")) {
    docs.push({ id:`RAG-${belt.id}`, canonicalEntityId:belt.id, tier:"current-canon", title:`Faixa ${belt.name}`, text:compact([`Faixa ${belt.name}`, `função ${belt.function}`, `ordem ${belt.order}`, `caminhos ${belt.pathIds.join(", ")}`]), tags:["faixa",belt.name.toLowerCase(),belt.function.toLowerCase()], status:"current" });
  }
  for (const path of paths.filter((x)=>x.status==="current")) {
    docs.push({ id:`RAG-${path.id}`, canonicalEntityId:path.id, tier:"current-canon", title:`${path.code} — ${path.name}`, text:compact([path.function, `faixa ${path.beltId}`, `núcleos ${path.nucleusIds.join(", ")}`]), tags:["caminho",path.code.toLowerCase(),path.name.toLowerCase()], status:"current" });
  }
  for (const nucleus of nuclei.filter((x)=>x.status==="current")) {
    docs.push({ id:`RAG-${nucleus.id}`, canonicalEntityId:nucleus.id, tier:"current-canon", title:`${nucleus.code} — ${nucleus.name}`, text:compact([`Núcleo ${nucleus.name}`, `caminho ${nucleus.pathId}`, `faixa ${nucleus.beltId}`]), tags:["núcleo",nucleus.code.toLowerCase(),nucleus.name.toLowerCase()], status:"current" });
  }
  for (const node of contentNodes as Array<Record<string, unknown>>) {
    if (node.status !== "published") continue;
    const canonicalEntityId=String(node.canonicalEntityId??"");
    docs.push({
      id:`RAG-${String(node.id)}`,
      canonicalEntityId,
      tier:"approved-content",
      title:String(node.title??node.id),
      text:compact([String(node.summary??""), String(node.type??""), String(node.difficulty??"")]),
      tags:["content",String(node.type??""),...(Array.isArray(node.audience)?node.audience.map(String):[])],
      status:"approved",
    });
  }
  return docs;
}

export const canonCorpus = buildCanonCorpus();
export const activeCanonRelease = canonRelease.id;
