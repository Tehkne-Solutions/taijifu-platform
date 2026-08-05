import { bases, belts, paths, nuclei } from "@taijifu/canon";

export default function GlossarioPage() {
  const terms = [
    ...bases.map((x:any) => ({ id:x.id, term:x.name, type:"Base", description:x.function })),
    ...belts.map((x:any) => ({ id:x.id, term:x.name, type:"Faixa", description:`Função: ${x.function}` })),
    ...paths.map((x:any) => ({ id:x.id, term:`${x.code} · ${x.name}`, type:"Caminho", description:x.function })),
    ...nuclei.map((x:any) => ({ id:x.id, term:`${x.code} · ${x.name}`, type:"Núcleo", description:`Unidade curricular oficial vinculada a ${x.pathId}.` }))
  ];
  return <main><section className="canon-hero"><span className="eyebrow">Referência</span><h1>Glossário Canônico</h1><p className="lead">Índice consultável das entidades que já possuem identidade formal no Canon 1.0.</p><div className="canon-stats"><span><strong>{terms.length}</strong>termos estruturados</span></div></section><section className="section"><div className="glossary-list">{terms.map((item:any) => <article className="glossary-row" key={item.id}><span>{item.type}</span><div><h2>{item.term}</h2><p>{item.description}</p></div><code>{item.id}</code></article>)}</div></section></main>;
}
