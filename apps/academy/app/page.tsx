import slice from "@taijifu/content/data/white-belt";
import nodes from "@taijifu/content/data/nodes";
import paths from "@taijifu/canon/data/paths";
import { AcademyProgressSummary } from "./components/progress";

export default function Page() {
  const all = nodes as any[];
  const lessons = all.filter((n) => n.type === "lesson" && n.beltId === "BELT-WHITE");
  const whitePaths = (paths as any[]).filter((p) => p.beltId === "BELT-WHITE");

  return (
    <main>
      <section className="academy-hero">
        <div className="hero-copy">
          <div className="eyebrow inverse">SimpleWay Taijifu · Vertical Slice 01</div>
          <h1>Entre no caminho com presença.</h1>
          <p className="lead inverse">A Faixa Branca organiza os fundamentos para aprender com controle, consciência e Safety — sem confundir XP com graduação.</p>
          <div className="actions"><a className="btn light" href="/belt/branca">Continuar jornada</a><a className="btn ghost" href="#mapa">Ver mapa</a></div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>TAI</span><span>JI</span><span>FU</span><strong>入</strong></div>
      </section>

      <AcademyProgressSummary />

      <section className="section" id="mapa">
        <div className="section-heading"><div><span className="eyebrow">Sua jornada</span><h2>3 Caminhos · 12 Núcleos</h2></div><p>O percurso cresce em complexidade sem duplicar entidades: cada experiência aponta para um Núcleo oficial do Canon.</p></div>
        <div className="path-grid">
          {whitePaths.map((path, index) => (
            <a className="path-card" href="/belt/branca" key={path.id}>
              <span className="path-number">0{index + 1}</span>
              <div><div className="meta">{path.code}</div><h3>{path.name}</h3><p>{path.function}</p><span className="text-link">Explorar caminho →</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">Content Graph</span><h2>Uma experiência por função.</h2></div></div>
        <div className="metric-grid">
          <article className="metric-card"><span>01</span><strong>{slice.nuclei.length}</strong><p>Núcleos oficiais N001–N012</p></article>
          <article className="metric-card"><span>02</span><strong>{lessons.length}</strong><p>Lições conectadas ao Canon</p></article>
          <article className="metric-card"><span>03</span><strong>{all.length}</strong><p>Lesson + Quiz + Guided Practice</p></article>
        </div>
      </section>
    </main>
  );
}
