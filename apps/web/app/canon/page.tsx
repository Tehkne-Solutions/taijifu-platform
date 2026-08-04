import bases from "@taijifu/canon/data/bases";
import belts from "@taijifu/canon/data/belts";
import paths from "@taijifu/canon/data/paths";

export default function CanonPage() {
  return <main>
    <section className="canon-hero"><span className="eyebrow">TAIJIFU-CANON-1.0</span><h1>Canon Explorer</h1><p className="lead">A estrutura oficial consumida por site, Academy, Dojo Workspace, IA e demais produtos do ecossistema.</p><div className="canon-stats"><span><strong>4</strong>Bases</span><span><strong>10</strong>Faixas</span><span><strong>32</strong>Caminhos</span><span><strong>128</strong>Núcleos</span></div></section>

    <section className="section" id="bases"><div className="section-heading"><div><span className="eyebrow">Fundamento</span><h2>Quatro Bases.</h2></div><p>Perspectivas funcionais complementares. Não são estilos independentes nem faixas.</p></div><div className="base-grid">{(bases as any[]).map((b, i) => <article className="base-card" key={b.id}><span className="base-index">0{i+1}</span><div><span className="meta">{b.color} · {b.element}</span><h3>{b.name}</h3><p>{b.function}</p></div></article>)}</div></section>

    <section className="section" id="faixas"><div className="section-heading"><div><span className="eyebrow">Progressão</span><h2>10 Faixas.</h2></div><p>A sequência cromática encerra na Preta; a progressão de maestria permanece aberta.</p></div><div className="belt-grid">{(belts as any[]).map((b) => <article className="belt-card" key={b.id}><span>{String(b.order).padStart(2,"0")}</span><h3>{b.name}</h3><p>{b.function}</p><small>{b.id}</small></article>)}</div></section>

    <section className="section" id="caminhos"><div className="section-heading"><div><span className="eyebrow">Currículo</span><h2>32 Caminhos.</h2></div><p>C01–C32 organizam os 128 Núcleos. Cada Caminho contém exatamente quatro Núcleos oficiais.</p></div><div className="path-table">{(paths as any[]).map((p) => <article className="path-row" key={p.id}><span>{p.code}</span><div><strong>{p.name}</strong><p>{p.function}</p></div><em>{p.beltId.replace("BELT-","")}</em></article>)}</div></section>
  </main>;
}
