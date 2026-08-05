import { pfiSystem } from "@taijifu/canon/pfi";

export default function PfiPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Preparação Física Integrada</span><h1>Capacidade física a serviço da prática.</h1><p className="lead">O PFI organiza capacidades físicas do Taijifu sem transformar condicionamento em graduação. Faixa, competência técnica e Capacity State são leituras diferentes do praticante.</p></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Princípio</span><h2>Treinar para transferir.</h2><p>{pfiSystem.principle}</p><ul>{pfiSystem.objectives.map((x)=><li key={x}>{x}</li>)}</ul></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Capacidades</span><h2>Doze dimensões físicas.</h2></div><p>As dimensões podem avançar em ritmos diferentes no mesmo praticante.</p></div><div className="knowledge-grid">{pfiSystem.capacities.map((c)=><article className="knowledge-card" key={c.id}><span>{c.id}</span><h3>{c.title}</h3><p>{c.text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Capacity State</span><h2>Estado físico não é faixa.</h2></div><p>O Capacity State descreve o estágio atual de uma capacidade específica e serve ao planejamento, não à promoção.</p></div><div className="knowledge-grid">{pfiSystem.capacityStates.map((s)=><article className="knowledge-card" key={s.id}><span>{s.id}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Periodização</span><h2>Ciclos de desenvolvimento.</h2><ul>{pfiSystem.periodization.map((x)=><li key={x}>{x}</li>)}</ul></div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Adaptação</span><h2>Mesmo sistema, contextos diferentes.</h2><ul>{pfiSystem.adaptation.map((x)=><li key={x}>{x}</li>)}</ul></div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Governança</span><h2>PFI não cria uma segunda graduação.</h2><ul>{pfiSystem.governance.map((x)=><li key={x}>{x}</li>)}</ul></div></section>
  </main>;
}
