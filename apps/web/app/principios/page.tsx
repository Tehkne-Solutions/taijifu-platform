import { principles } from "@taijifu/canon/knowledge";

export default function PrinciplesPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Conduta e prática</span><h1>12 Princípios.</h1><p className="lead">A redação vigente é a reconstrução canônica contemporânea oficial da estrutura histórica de doze Princípios.</p></section>
    <section className="section"><div className="principle-list">{principles.map((p,i)=><article key={p}><span>{String(i+1).padStart(2,"0")}</span><p>{p}</p></article>)}</div></section>
  </main>;
}
