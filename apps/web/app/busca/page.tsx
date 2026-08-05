import { bases, belts, paths, nuclei } from "@taijifu/canon";
import { knowledgePages, manifestoValues, principles } from "@taijifu/canon/knowledge";
import { baseDetails } from "@taijifu/canon/reference";

type SearchItem={type:string;title:string;description:string;href:string;keywords:string};

function index():SearchItem[]{
  const baseItems=baseDetails.map((d)=>{const base=(bases as any[]).find((b)=>b.id===d.id);return {type:"Base",title:d.title,description:base?.function??d.description,href:`/bases/${d.slug}`,keywords:`${d.title} ${d.description} ${d.genealogy} ${base?.color??""} ${base?.element??""}`};});
  const beltItems=(belts as any[]).map((b)=>({type:"Faixa",title:b.name,description:b.function,href:`/faixas/${b.id.replace("BELT-","").toLowerCase()}`,keywords:`${b.id} ${b.name} ${b.function}`}));
  const pathItems=(paths as any[]).map((p)=>({type:"Caminho",title:`${p.code} — ${p.name}`,description:p.function,href:`/caminhos/${p.code.toLowerCase()}`,keywords:`${p.id} ${p.code} ${p.name} ${p.function}`}));
  const nucleusItems=(nuclei as any[]).map((n)=>({type:"Núcleo",title:`${n.code} — ${n.name}`,description:`Unidade curricular de ${n.pathId}.`,href:`/nucleos/${n.code.toLowerCase()}`,keywords:`${n.id} ${n.code} ${n.name} ${n.pathId} ${n.beltId}`}));
  const domainItems=knowledgePages.map((p)=>({type:"Conhecimento",title:p.title,description:p.summary,href:`/conhecimento/${p.slug}`,keywords:`${p.title} ${p.summary} ${p.sections.map((s)=>`${s.title} ${s.body} ${(s.items??[]).join(" ")}`).join(" ")}`}));
  const valueItems=manifestoValues.map((v)=>({type:"Manifesto",title:v.name,description:v.text,href:"/manifesto",keywords:`${v.name} ${v.text}`}));
  const principleItems=principles.map((p,i)=>({type:"Princípio",title:`Princípio ${String(i+1).padStart(2,"0")}`,description:p,href:"/principios",keywords:p}));
  return [...baseItems,...beltItems,...pathItems,...nucleusItems,...domainItems,...valueItems,...principleItems];
}

export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q=""}=await searchParams;
  const query=q.trim().toLocaleLowerCase("pt-BR");
  const results=query ? index().filter((item)=>`${item.title} ${item.description} ${item.keywords}`.toLocaleLowerCase("pt-BR").includes(query)).slice(0,80) : [];
  return <main>
    <section className="canon-hero"><span className="eyebrow">Consulta oficial</span><h1>Busca.</h1><p className="lead">Pesquise simultaneamente Bases, Faixas, Caminhos, Núcleos, Princípios e domínios de conhecimento do Canon 1.0.</p><form className="search-form" action="/busca"><input name="q" defaultValue={q} placeholder="Ex.: Safety, C13, respiração, Faixa Ciano..." autoFocus/><button type="submit">Buscar</button></form></section>
    {query&&<section className="section"><div className="section-heading"><div><span className="eyebrow">Resultados</span><h2>{results.length} encontrados.</h2></div><p>Consulta local ao dataset oficial; nenhum resultado é inventado por IA.</p></div><div className="search-results">{results.map((r)=><a className="search-result" href={r.href} key={`${r.type}-${r.title}`}><span>{r.type}</span><div><h3>{r.title}</h3><p>{r.description}</p></div></a>)}</div>{results.length===0&&<div className="prose-panel"><h2>Nenhum resultado.</h2><p>Tente outro termo, código canônico ou conceito.</p></div>}</section>}
  </main>;
}
