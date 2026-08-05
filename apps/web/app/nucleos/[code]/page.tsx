import { belts, paths, nuclei } from "@taijifu/canon";
import { notFound } from "next/navigation";

export function generateStaticParams() { return nuclei.map((n:any) => ({ code: n.code.toLowerCase() })); }

export default async function NucleusPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const nucleus = nuclei.find((n:any) => n.code.toLowerCase() === code);
  if (!nucleus) notFound();
  const path = paths.find((p:any) => p.id === nucleus.pathId);
  const belt = belts.find((b:any) => b.id === path?.beltId);
  const siblings = nuclei.filter((n:any) => n.pathId === nucleus.pathId);
  return <main>
    <section className="detail-hero"><a className="back-link" href={`/caminhos/${path?.code.toLowerCase()}`}>← {path?.code} · {path?.name}</a><span className="eyebrow">{nucleus.code} · {belt?.name}</span><h1>{nucleus.name}</h1><p className="lead">Unidade curricular oficial do Caminho <strong>{path?.name}</strong>, dentro da função de faixa <strong>{belt?.function}</strong>.</p></section>
    <section className="section feature-section"><div className="feature-copy"><span className="eyebrow">Papel do Núcleo</span><h2>Do conhecimento à prática.</h2><p>Esta página identifica a posição canônica do Núcleo. Conteúdos didáticos, exercícios e evidências pertencem à camada de prática do aplicativo e devem referenciar este mesmo ID.</p></div><div className="architecture-card"><div>{belt?.id}</div><span>↓</span><div>{path?.id}</div><span>↓</span><div>{nucleus.id}</div></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Mesmo Caminho</span><h2>Núcleos relacionados.</h2></div></div><div className="nucleus-detail-grid">{siblings.map((n:any) => <a className="nucleus-card" href={`/nucleos/${n.code.toLowerCase()}`} key={n.id}><span>{n.code}</span><h3>{n.name}</h3></a>)}</div></section>
  </main>;
}
