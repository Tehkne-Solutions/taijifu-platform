import { notFound } from "next/navigation";
import { knowledgePages } from "@taijifu/canon/knowledge";
import { martialScience, kineticArts } from "@taijifu/canon/science";

export function generateStaticParams(){return knowledgePages.map((p)=>({slug:p.slug}));}

export default async function KnowledgePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const page=knowledgePages.find((p)=>p.slug===slug);
  if(!page)notFound();
  const science=slug==="ciencia-marcial"?martialScience:null;
  const kinetics=slug==="artes-cineticas"?kineticArts:null;
  return <main>
    <section className="canon-hero"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}.</h1><p className="lead">{page.summary}</p></section>
    <section className="section"><div className="knowledge-stack">{page.sections.map((s,i)=><article className="prose-panel" key={s.title}><span className="eyebrow">{String(i+1).padStart(2,"0")}</span><h2>{s.title}</h2><p>{s.body}</p>{s.items&&<ul>{s.items.map((item)=><li key={item}>{item}</li>)}</ul>}</article>)}</div></section>
    {science&&<><section className="section"><div className="section-heading"><div><span className="eyebrow">Taxonomia oficial</span><h2>Dez domínios de investigação.</h2></div><p>{science.principle}</p></div><div className="knowledge-grid">{science.domains.map((d)=><article className="knowledge-card" key={d.id}><span>{d.id}</span><h3>{d.title}</h3><p>{d.text}</p></article>)}</div></section><section className="section"><div className="prose-panel"><span className="eyebrow">BMC</span><h2>Ciclo de investigação.</h2><ul>{science.bmcCycle.map((x)=><li key={x}>{x}</li>)}</ul><h3>Context Lock</h3><ul>{science.contextLock.map((x)=><li key={x}>{x}</li>)}</ul><h3>Regras de evidência</h3><ul>{science.evidenceRules.map((x)=><li key={x}>{x}</li>)}</ul></div></section></>}
    {kinetics&&<><section className="section"><div className="section-heading"><div><span className="eyebrow">Taxonomia oficial</span><h2>Doze domínios cinéticos.</h2></div><p>{kinetics.principle}</p></div><div className="knowledge-grid">{kinetics.domains.map((d)=><article className="knowledge-card" key={d.id}><span>{d.id}</span><h3>{d.title}</h3><p>{d.text}</p></article>)}</div></section><section className="section"><div className="prose-panel"><span className="eyebrow">Integração</span><h2>Referência não é incorporação automática.</h2><ul>{kinetics.integrationRules.map((x)=><li key={x}>{x}</li>)}</ul></div></section></>}
  </main>;
}
