import { notFound } from "next/navigation";
import bases from "@taijifu/canon/data/bases";
import { baseDetails } from "@taijifu/canon/reference";

export function generateStaticParams(){return baseDetails.map((b)=>({slug:b.slug}));}

export default async function BasePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const detail=baseDetails.find((b)=>b.slug===slug);
  if(!detail)notFound();
  const base=(bases as any[]).find((b)=>b.id===detail.id);
  return <main>
    <section className="canon-hero"><span className="eyebrow">Base oficial</span><h1>{detail.title}.</h1><p className="lead">{base?.function}</p></section>
    <section className="section"><div className="knowledge-grid">
      <article className="knowledge-card"><span>Cor</span><h3>{base?.color}</h3><p>Identidade visual da Base no sistema vigente.</p></article>
      <article className="knowledge-card"><span>Elemento</span><h3>{base?.element}</h3><p>Correspondência simbólico-pedagógica utilizada pelo Taijifu.</p></article>
      <article className="knowledge-card"><span>Animal</span><h3>{base?.animal}</h3><p>Imagem pedagógica associada à qualidade funcional da Base.</p></article>
    </div></section>
    <section className="section"><div className="knowledge-stack"><article className="prose-panel"><span className="eyebrow">Função</span><h2>O que esta Base organiza.</h2><p>{detail.description}</p></article><article className="prose-panel"><span className="eyebrow">Genealogia</span><h2>De onde vem esta relação.</h2><p>{detail.genealogy}</p></article></div></section>
  </main>;
}
