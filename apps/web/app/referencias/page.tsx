import { claimTypes, internalSources, provenanceTypes } from "@taijifu/canon/reference";

export default function ReferencesPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Rastreabilidade</span><h1>Referências.</h1><p className="lead">O Taijifu distingue o que foi recuperado, o que é histórico, o que foi reconstruído, o que é Canon contemporâneo e o que exige referência externa.</p></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Proveniência</span><h2>Como ler uma afirmação.</h2></div><p>Nem todo conhecimento possui a mesma origem. A confiabilidade depende de declarar corretamente essa origem.</p></div><div className="knowledge-grid">{provenanceTypes.map((p)=><article className="knowledge-card" key={p.id}><span>{p.id}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Fontes internas</span><h2>Registro canônico.</h2></div><p>As fontes abaixo sustentam a recuperação e a construção histórica do sistema. Elas não têm todas o mesmo grau de autoridade atual.</p></div><div className="history-list">{internalSources.map((s)=><article key={s.id}><span>{s.id}</span><div><h3>{s.title}</h3><p>{s.use}</p></div></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Claim types</span><h2>Tipos de afirmação.</h2></div><p>O site não apresenta filosofia própria, tradição, ciência, simbologia e ficção como se fossem a mesma categoria de conhecimento.</p></div><div className="glossary-list">{claimTypes.map(([id,text])=><article className="glossary-row" key={id}><span>claim</span><div><h2>{id}</h2><p>{text}</p></div></article>)}</div></section>
  </main>;
}
