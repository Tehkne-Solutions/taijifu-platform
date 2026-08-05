import { manifestoValues } from "@taijifu/canon/knowledge";

export default function ManifestoPage(){
  return <main>
    <section className="canon-hero"><span className="eyebrow">Identidade</span><h1>Manifesto.</h1><p className="lead">Taijifu é uma arte marcial brasileira de adaptação, eficiência e fluidez, organizada como prática, filosofia e campo de estudo do movimento humano.</p></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Direção</span><h2>Força sob responsabilidade.</h2></div><p>A técnica existe para proteger, interromper dano, criar saída e desenvolver domínio próprio. Paz é direção; violência não é objeto de culto.</p></div><div className="knowledge-grid">{manifestoValues.map((v,i)=><article className="knowledge-card" key={v.name}><span>0{i+1}</span><h3>{v.name}</h3><p>{v.text}</p></article>)}</div></section>
    <section className="section"><div className="prose-panel"><h2>O Taijifu não é uma colagem de estilos.</h2><p>Artes existentes são fontes de conhecimento. Suas contribuições são estudadas por função, contexto, risco, treinabilidade, transferência e coerência antes de qualquer incorporação.</p><p>Quanto maior a capacidade, maior a responsabilidade. O treino exige verdade sobre medo, limite, erro, risco e consequência.</p></div></section>
  </main>;
}
