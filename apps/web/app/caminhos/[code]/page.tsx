import { belts, paths, nuclei } from "@taijifu/canon";
import { notFound } from "next/navigation";

export function generateStaticParams() { return paths.map((p:any) => ({ code: p.code.toLowerCase() })); }

export default async function PathPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const path = paths.find((p:any) => p.code.toLowerCase() === code);
  if (!path) notFound();
  const belt = belts.find((b:any) => b.id === path.beltId);
  const items = nuclei.filter((n:any) => n.pathId === path.id);
  return <main>
    <section className="detail-hero"><a className="back-link" href="/canon#caminhos">← 32 Caminhos</a><span className="eyebrow">{path.code} · Faixa {belt?.name}</span><h1>{path.name}</h1><p className="lead">{path.function}</p><div className="canon-stats"><span><strong>4</strong>Núcleos oficiais</span><span><strong>{belt?.function}</strong>Função da faixa</span></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Estrutura</span><h2>Quatro Núcleos.</h2></div><p>Estes Núcleos materializam o Caminho no currículo. No aplicativo, eles se desdobram em estudo e prática sem alterar seu significado canônico.</p></div><div className="nucleus-detail-grid">{items.map((n:any, i:number) => <a className="nucleus-card" href={`/nucleos/${n.code.toLowerCase()}`} key={n.id}><span>0{i+1} · {n.code}</span><h3>{n.name}</h3><small>Abrir Núcleo →</small></a>)}</div></section>
  </main>;
}
