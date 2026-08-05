import { historyMilestones } from "@taijifu/canon/knowledge";

export default function HistoryPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Proveniência</span><h1>História.</h1><p className="lead">O Site Oficial distingue memória, reconstrução, desenvolvimento contemporâneo e Canon vigente sem apagar versões anteriores.</p></section>
    <section className="section"><div className="history-list">{historyMilestones.map((m,i)=><article key={m.label}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{m.label}</h3><p>{m.text}</p></div></article>)}</div></section>
    <section className="section"><div className="prose-panel"><h2>Regra histórica.</h2><p>Documentos antigos permanecem como histórico quando forem substituídos por decisão canônica posterior. Descobertas futuras podem gerar revisão por proveniência e Canon Change, mas não substituem silenciosamente a versão vigente.</p></div></section>
  </main>;
}
