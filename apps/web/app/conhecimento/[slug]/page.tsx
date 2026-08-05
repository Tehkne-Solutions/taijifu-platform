import { notFound } from "next/navigation";
import { knowledgePages } from "@taijifu/canon/knowledge";

export function generateStaticParams(){return knowledgePages.map((p)=>({slug:p.slug}));}

export default async function KnowledgePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const page=knowledgePages.find((p)=>p.slug===slug);
  if(!page)notFound();
  return <main>
    <section className="canon-hero"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}.</h1><p className="lead">{page.summary}</p></section>
    <section className="section"><div className="knowledge-stack">{page.sections.map((s,i)=><article className="prose-panel" key={s.title}><span className="eyebrow">{String(i+1).padStart(2,"0")}</span><h2>{s.title}</h2><p>{s.body}</p>{s.items&&<ul>{s.items.map((item)=><li key={item}>{item}</li>)}</ul>}</article>)}</div></section>
  </main>;
}
