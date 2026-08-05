import whiteSlice from "@taijifu/content/data/white-belt";
import yellowSlice from "@taijifu/content/data/yellow-belt";
import nodes from "@taijifu/content/data/nodes";
import paths from "@taijifu/canon/data/paths";
import { AcademyProgressSummary } from "./components/progress";
import { YellowProgressSummary } from "./components/yellow-progress";

export default function Page() {
  const all = nodes as any[];
  const whiteLessons = all.filter((n) => n.type === "lesson" && n.beltId === "BELT-WHITE");
  const yellowLessons = all.filter((n) => n.type === "lesson" && n.beltId === "BELT-YELLOW");
  const whitePaths = (paths as any[]).filter((p) => p.beltId === "BELT-WHITE");
  const yellowPaths = (paths as any[]).filter((p) => p.beltId === "BELT-YELLOW");

  return <main>
    <section className="academy-hero">
      <div className="hero-copy"><div className="eyebrow inverse">SimpleWay Taijifu · App de prática</div><h1>Aprenda. Pratique. Registre.</h1><p className="lead inverse">O App transforma o Canon oficial em jornadas de estudo e prática. Conclusão digital registra aprendizagem; graduação real continua dependente de evidência, Travessia e avaliação autorizada.</p><div className="actions"><a className="btn light" href="/belt/branca">Começar na Branca</a><a className="btn ghost" href="/belt/amarela">Explorar Amarela</a></div></div>
      <div className="hero-orbit" aria-hidden="true"><span>TAI</span><span>JI</span><span>FU</span><strong>習</strong></div>
    </section>

    <section className="section"><div className="section-heading"><div><span className="eyebrow">Jornadas publicadas</span><h2>Duas faixas praticáveis.</h2></div><p>Branca desenvolve a função Entrar. Amarela desenvolve Perceber. Cada faixa mantém progresso, evidência e Travessia separados.</p></div><div className="next-stage-grid">
      <a className="path-card" href="/belt/branca"><span className="path-number">01</span><div><span className="meta">Branca · Entrar</span><h3>C01–C03 · N001–N012</h3><p>Presença e Segurança, Movimento Fundamental e Relação Inicial.</p><span className="text-link">Praticar Faixa Branca →</span></div></a>
      <a className="path-card dark-card" href="/belt/amarela"><span className="path-number">02</span><div><span className="meta">Amarela · Perceber</span><h3>C04–C06 · N013–N024</h3><p>Distância e Espaço, Leitura e Timing, Estrutura e Intenção.</p><span className="text-link">Praticar Faixa Amarela →</span></div></a>
    </div></section>

    <AcademyProgressSummary />
    <YellowProgressSummary />

    <section className="section" id="mapa"><div className="section-heading"><div><span className="eyebrow">Mapa publicado</span><h2>6 Caminhos · 24 Núcleos</h2></div><p>Cada experiência aponta para uma entidade oficial do Canon e adiciona lição, prática guiada e checkpoint sem duplicar o significado do Núcleo.</p></div><div className="path-grid">{[...whitePaths,...yellowPaths].map((path,index)=><a className="path-card" href={path.beltId==="BELT-WHITE"?"/belt/branca":"/belt/amarela"} key={path.id}><span className="path-number">{String(index+1).padStart(2,"0")}</span><div><div className="meta">{path.code}</div><h3>{path.name}</h3><p>{path.function}</p><span className="text-link">Abrir jornada →</span></div></a>)}</div></section>

    <section className="section"><div className="section-heading"><div><span className="eyebrow">Content Graph</span><h2>Prática derivada do Canon.</h2></div></div><div className="metric-grid"><article className="metric-card"><span>01</span><strong>{whiteSlice.nuclei.length+yellowSlice.nuclei.length}</strong><p>Núcleos praticáveis N001–N024</p></article><article className="metric-card"><span>02</span><strong>{whiteLessons.length+yellowLessons.length}</strong><p>Lições conectadas ao Canon</p></article><article className="metric-card"><span>03</span><strong>{all.length}</strong><p>Lesson + Quiz + Guided Practice</p></article></div></section>
  </main>;
}
