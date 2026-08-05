import belts from "@taijifu/canon/data/belts";
import bases from "@taijifu/canon/data/bases";
import { graduationSystem } from "@taijifu/canon/graduation";

export default function GraduationPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Progressão oficial</span><h1>Faixas, graus e Bases.</h1><p className="lead">A graduação do Taijifu permanece sempre aberta e legível: faixa vigente, progresso interno, desenvolvimento das quatro Bases e evidências são dimensões relacionadas, mas não equivalentes.</p></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Princípio</span><h2>Progresso visível, promoção governada.</h2><p>{graduationSystem.principle}</p></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Arquitetura</span><h2>Quatro leituras de progresso.</h2></div></div><div className="knowledge-grid">{graduationSystem.dimensions.map((d)=><article className="knowledge-card" key={d.id}><span>{d.id}</span><h3>{d.title}</h3><p>{d.text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Ordem oficial</span><h2>De Branca a Preta.</h2></div></div><div className="principle-list">{belts.map((b)=><article key={b.id}><span>{String(b.order).padStart(2,"0")}</span><div><h3>{b.name}</h3><p>{b.function}</p></div></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Faixa física</span><h2>Identidade preta e dourada.</h2><p><strong>Corpo:</strong> {graduationSystem.physicalBelt.body}. <strong>Linhas:</strong> {graduationSystem.physicalBelt.longitudinalLines}. <strong>Ponta de graduação:</strong> {graduationSystem.physicalBelt.graduationEnd}. {graduationSystem.physicalBelt.degreeMarkers}. {graduationSystem.physicalBelt.currentLevel}.</p><p>{graduationSystem.physicalBelt.baseIntegration}.</p></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Bases</span><h2>Desenvolvimento transversal.</h2></div><p>As quatro Bases informam a leitura do praticante sem formar graduações paralelas.</p></div><div className="knowledge-grid">{bases.map((b)=><article className="knowledge-card" key={b.id}><span>{b.id}</span><h3>{b.name}</h3><p>{b.function}</p></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Governança</span><h2>O que o sistema não faz.</h2><ul>{graduationSystem.governance.map((x)=><li key={x}>{x}</li>)}</ul></div></section>
  </main>;
}
