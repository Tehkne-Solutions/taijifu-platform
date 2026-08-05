import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = process.cwd();
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));

async function loadTsConstants(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const temp = path.join(os.tmpdir(), `taijifu-${path.basename(relativePath, ".ts")}-${process.pid}-${Date.now()}.mjs`);
  fs.writeFileSync(temp, js, "utf8");
  try { return await import(pathToFileURL(temp).href); }
  finally { fs.rmSync(temp, { force: true }); }
}

const bases = readJson("packages/canon/data/bases.json");
const belts = readJson("packages/canon/data/belts.json");
const paths = readJson("packages/canon/data/paths.json");
const nucleusNames = readJson("packages/canon/data/nuclei.json");
const release = readJson("packages/canon/data/release.json");
const knowledge = await loadTsConstants("packages/canon/src/knowledge.ts");
const reference = await loadTsConstants("packages/canon/src/reference.ts");

const nuclei = nucleusNames.map((name, index) => {
  const order = index + 1;
  const p = paths[Math.floor(index / 4)];
  const code = `N${String(order).padStart(3, "0")}`;
  return { id: `NUC-${code}`, code, order, name, pathId: p.id, beltId: p.beltId };
});

function h(level, text) { return `${"#".repeat(level)} ${text}\n`; }
function bullets(items) { return items.map((x) => `- ${x}`).join("\n") + "\n"; }

const out = [];
out.push(`# TAIJIFU — DOCUMENTO MESTRE ÚNICO\n`);
out.push(`**Canon:** ${release.id}  \n**Versão:** ${release.version}  \n**Status:** ${release.status}  \n**Publicação:** ${release.releasedAt}  \n**Assinatura:** ${release.signature}  \n**Fonte:** ${release.sourceDocument}\n`);
out.push(`> Documento compilado automaticamente a partir da fonte canônica estruturada da Taijifu Platform. Não é uma segunda fonte de verdade. Alterações devem ocorrer no Canon e este documento deve ser regenerado.\n`);

out.push(h(2, "1. Identidade e Manifesto"));
out.push(`Taijifu é uma arte marcial brasileira de adaptação, eficiência e fluidez, organizada como prática, filosofia e campo de estudo do movimento humano.\n`);
for (const v of knowledge.manifestoValues) out.push(`### ${v.name}\n${v.text}\n`);

out.push(h(2, "2. Doze Princípios"));
out.push(knowledge.principles.map((p, i) => `${i + 1}. ${p}`).join("\n") + "\n");

out.push(h(2, "3. As Quatro Bases"));
for (const base of bases) {
  const detail = reference.baseDetails.find((x) => x.id === base.id);
  out.push(`### ${base.name} — ${base.id}\n`);
  out.push(`**Cor:** ${base.color}  \n**Elemento:** ${base.element}  \n**Animal:** ${base.animal}  \n**Função:** ${base.function}\n`);
  if (detail) out.push(`**Genealogia:** ${detail.genealogy}\n\n${detail.description}\n`);
}

out.push(h(2, "4. Sistema Oficial de Faixas"));
out.push(`Ordem oficial: **${belts.map((b) => b.name).join(" → ")}**.\n`);
for (const belt of belts) {
  out.push(`### ${String(belt.order).padStart(2, "0")} — Faixa ${belt.name}: ${belt.function}\n`);
  if (!belt.pathIds.length) {
    out.push(`A Faixa Preta é uma camada de síntese transversal do sistema já publicado. Ela não cria C33 ou N129.\n`);
    continue;
  }
  const beltPaths = paths.filter((p) => p.beltId === belt.id).sort((a,b) => a.order-b.order);
  for (const p of beltPaths) {
    out.push(`#### ${p.code} — ${p.name}\n${p.function}\n`);
    const ns = nuclei.filter((n) => n.pathId === p.id).sort((a,b) => a.order-b.order);
    out.push(ns.map((n) => `- **${n.code}** — ${n.name}`).join("\n") + "\n");
  }
}

out.push(h(2, "5. Domínios de Conhecimento"));
for (const page of knowledge.knowledgePages) {
  out.push(`### ${page.title}\n**Direção:** ${page.eyebrow}  \n${page.summary}\n`);
  for (const section of page.sections) {
    out.push(`#### ${section.title}\n${section.body}\n`);
    if (section.items?.length) out.push(bullets(section.items));
  }
}

out.push(h(2, "6. História e Marcos"));
for (const m of knowledge.historyMilestones) out.push(`### ${m.label}\n${m.text}\n`);
out.push(`Documentos antigos permanecem como histórico quando forem substituídos por decisão canônica posterior. Descobertas futuras podem gerar revisão por proveniência e Canon Change, mas não substituem silenciosamente a versão vigente.\n`);

out.push(h(2, "7. Proveniência e Referências"));
out.push(h(3, "Tipos de proveniência"));
for (const p of reference.provenanceTypes) out.push(`- **${p.title} (${p.id})** — ${p.text}`);
out.push("\n");
out.push(h(3, "Fontes internas registradas"));
for (const s of reference.internalSources) out.push(`- **${s.id} — ${s.title}**: ${s.use}`);
out.push("\n");
out.push(h(3, "Tipos de claim"));
for (const [id, label] of reference.claimTypes) out.push(`- **${id}** — ${label}`);
out.push("\n");

out.push(h(2, "8. Governança Canônica"));
out.push(`O Site Oficial é a fonte pública de conhecimento do Taijifu. O App/Academy é a superfície de estudo e prática. Progressão, evidência e Travessias não alteram a graduação por ação exclusiva do cliente; promoção depende de governança e Promotion Gate server-side. Conteúdo histórico, reconstruído, contemporâneo e externo deve permanecer distinguível por proveniência.\n`);

out.push(h(2, "9. Integridade Estrutural"));
out.push(`- Bases: **${bases.length}**\n- Faixas: **${belts.length}**\n- Caminhos: **${paths.length}**\n- Núcleos: **${nuclei.length}**\n- Princípios: **${knowledge.principles.length}**\n- Valores do Manifesto: **${knowledge.manifestoValues.length}**\n- Domínios de conhecimento: **${knowledge.knowledgePages.length}**\n`);
out.push(`**Invariantes:** 4 Bases · 10 Faixas · 32 Caminhos · 128 Núcleos · nenhum C33 · nenhum N129.\n`);
out.push(`---\n\n**${release.signature}**\n`);

const document = out.join("\n").replace(/\n{3,}/g, "\n\n");
const failures = [];
if (bases.length !== 4) failures.push(`bases=${bases.length}`);
if (belts.length !== 10) failures.push(`belts=${belts.length}`);
if (paths.length !== 32) failures.push(`paths=${paths.length}`);
if (nuclei.length !== 128) failures.push(`nuclei=${nuclei.length}`);
if (knowledge.principles.length !== 12) failures.push(`principles=${knowledge.principles.length}`);
if (!document.includes("Tehkné Solutions")) failures.push("signature_missing");

if (process.argv.includes("--check")) {
  if (failures.length) { console.error(`TAIJIFU_MASTER_DOCUMENT=FAIL ${failures.join(" ")}`); process.exit(1); }
  console.log("TAIJIFU_MASTER_DOCUMENT=PASS");
  console.log(`bases=${bases.length} belts=${belts.length} paths=${paths.length} nuclei=${nuclei.length}`);
  console.log(`characters=${document.length}`);
  process.exit(0);
}

const argIndex = process.argv.indexOf("--output");
const output = argIndex >= 0 ? process.argv[argIndex + 1] : "TAIJIFU_DOCUMENTO_MESTRE_UNICO.md";
if (!output) throw new Error("--output requires a path");
fs.writeFileSync(path.resolve(root, output), document, "utf8");
console.log(`TAIJIFU_MASTER_DOCUMENT_WRITTEN=${output}`);
console.log(`characters=${document.length}`);
