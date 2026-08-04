import { belts, paths, nuclei } from "@taijifu/canon";
import { notFound } from "next/navigation";

export function generateStaticParams() { return belts.map((b:any) => ({ slug: b.id.replace("BELT-", "").toLowerCase() })); }

export default async function BeltPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const belt = belts.find((b:any) => b.id.replace("BELT-", "").toLowerCase() === slug);
  if (!belt) notFound();
  const beltPaths = paths.filter((p:any) => p.beltId === belt.id);
  const pathIds = new Set(beltPaths.map((p:any) => p.id));
  const beltNuclei = nuclei.filter((n:any) => pathIds.has(n.pathId));
  return <main>
    <section className="detail-hero"><a className="back-link" href="/canon#faixas">← Todas as faixas</a><span className="eyebrow">Faixa {String(belt.order).padStart(2,"0")}</span><h1>{belt.name}</h1><p className="lead">Função curricular: <strong>{belt.function}</strong>.</p><div className="canon-stats"><span><strong>{beltPaths.length}</strong>Caminhos</span><span><strong>{beltNuclei.length}</strong>Núcleos</span></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Currículo da faixa</span><h2>{beltPaths.length ? "Caminhos desta etapa." : "Síntese do currículo."}</h2></div><p>{beltPaths.length ? "Cada Caminho abre quatro Núcleos oficiais, conectando a função da faixa ao estudo e à prática." : "A Faixa Preta não adiciona C33 ou N129: sua função é sintetizar C01–C32 e N001–N128."}</p></div>
      <div className="knowledge-grid">{beltPaths.map((p:any) => <a className="knowledge-card" href={`/caminhos/${p.code.toLowerCase()}`} key={p.id}><span>{p.code}</span><h3>{p.name}</h3><p>{p.function}</p></a>)}</div>
    </section>
    {beltNuclei.length > 0 && <section className="section"><div className="section-heading"><div><span className="eyebrow">Núcleos</span><h2>Conteúdo desta faixa.</h2></div></div><div className="nuclei-grid">{beltNuclei.map((n:any) => <a className="nucleus-chip" href={`/nucleos/${n.code.toLowerCase()}`} key={n.id}><span>{n.code}</span><strong>{n.name}</strong></a>)}</div></section>}
  </main>;
}
