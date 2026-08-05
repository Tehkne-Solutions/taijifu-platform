import { influenceDomains, influenceGovernance, influenceMatrix, influenceStatuses } from "@taijifu/canon/influences";

export default function InfluenciasPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Genealogia técnica</span><h1>Influências e referências.</h1><p className="lead">O Taijifu estuda artes, métodos e sistemas sem confundir pesquisa com incorporação. Esta matriz registra proveniência, função e status de cada referência.</p></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Status</span><h2>Cinco estados de relação.</h2></div></div><div className="knowledge-grid">{influenceStatuses.map((s)=><article className="knowledge-card" key={s.id}><span>{s.id}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Domínios</span><h2>Onde uma referência pode contribuir.</h2></div></div><div className="prose-panel"><ul>{influenceDomains.map((d)=><li key={d}>{d}</li>)}</ul></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Matriz</span><h2>Fontes registradas.</h2></div><p>Presença nesta lista não significa que todo o sistema externo faça parte do Taijifu.</p></div><div className="knowledge-stack">{influenceMatrix.map((i)=><article className="prose-panel" key={i.id}><span className="eyebrow">{i.status}</span><h2>{i.source}</h2><p><strong>Proveniência:</strong> {i.provenance}</p><p><strong>Domínios:</strong> {i.domains.join(" · ")}</p><p><strong>Elementos estudados:</strong> {i.studiedElements.join(" · ")}</p><p>{i.note}</p></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Governança</span><h2>Pesquisa não é incorporação automática.</h2><ul>{influenceGovernance.map((g)=><li key={g}>{g}</li>)}</ul></div></section>
  </main>;
}
