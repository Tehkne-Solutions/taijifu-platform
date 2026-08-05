import { bases, belts, paths, nuclei } from "@taijifu/canon";

export default function CanonPage() {
  return <main>
    <section className="canon-hero"><span className="eyebrow">TAIJIFU-CANON-1.0</span><h1>Canon Explorer</h1><p className="lead">A estrutura oficial e versionada do Taijifu. Explore das quatro Bases aos 128 Núcleos sem separar o conhecimento em documentos concorrentes.</p><div className="canon-stats"><span><strong>4</strong>Bases</span><span><strong>10</strong>Faixas</span><span><strong>32</strong>Caminhos</span><span><strong>128</strong>Núcleos</span></div></section>

    <section className="section" id="bases"><div className="section-heading"><div><span className="eyebrow">Fundamento</span><h2>Quatro Bases.</h2></div><p>Perspectivas funcionais complementares da arte. Não são estilos independentes nem graduações.</p></div><div className="base-grid">{bases.map((b:any, i:number) => <article className="base-card" key={b.id}><span className="base-index">0{i+1}</span><div><span className="meta">{b.color} · {b.element}</span><h3>{b.name}</h3><p>{b.function}</p></div></article>)}</div></section>

    <section className="section" id="faixas"><div className="section-heading"><div><span className="eyebrow">Progressão</span><h2>10 Faixas.</h2></div><p>Cada faixa organiza uma função de desenvolvimento e um conjunto de Caminhos. A Preta sintetiza o currículo em vez de criar novos Caminhos.</p></div><div className="belt-grid">{belts.map((b:any) => <a className="belt-card linked-card" href={`/faixas/${b.id.replace("BELT-", "").toLowerCase()}`} key={b.id}><span>{String(b.order).padStart(2,"0")}</span><h3>{b.name}</h3><p>{b.function}</p><small>Explorar faixa →</small></a>)}</div></section>

    <section className="section" id="caminhos"><div className="section-heading"><div><span className="eyebrow">Currículo</span><h2>32 Caminhos.</h2></div><p>C01–C32 organizam os 128 Núcleos. Cada Caminho contém exatamente quatro Núcleos oficiais.</p></div><div className="path-table">{paths.map((p:any) => <a className="path-row linked-row" href={`/caminhos/${p.code.toLowerCase()}`} key={p.id}><span>{p.code}</span><div><strong>{p.name}</strong><p>{p.function}</p></div><em>{p.beltId.replace("BELT-","")}</em></a>)}</div></section>

    <section className="section" id="nucleos"><div className="section-heading"><div><span className="eyebrow">Unidade curricular</span><h2>128 Núcleos.</h2></div><p>O Núcleo é a unidade mínima navegável do currículo e a ponte entre conhecimento oficial e prática no aplicativo.</p></div><div className="nuclei-grid">{nuclei.map((n:any) => <a className="nucleus-chip" href={`/nucleos/${n.code.toLowerCase()}`} key={n.id}><span>{n.code}</span><strong>{n.name}</strong></a>)}</div></section>
  </main>;
}
