import belts from "@taijifu/canon/data/belts";
import bases from "@taijifu/canon/data/bases";

export default function Page() {
  return <main>
    <section className="home-hero">
      <div className="hero-copy"><div className="eyebrow inverse">Canon Oficial 1.0</div><h1>Movimento com consciência.<br/>Força com responsabilidade.</h1><p className="lead inverse">O Taijifu integra competência marcial, movimento, preparação física, atenção, investigação e continuidade ao longo da vida.</p><div className="actions"><a className="btn light" href="/canon">Explorar o Canon</a><a className="btn ghost" href="#jornada">Conhecer a jornada</a></div></div>
      <div className="symbol-map" aria-label="Quatro Bases do Taijifu">{(bases as any[]).map((b, i) => <div key={b.id} className={`symbol symbol-${i+1}`}><strong>{b.name}</strong><span>{b.color}</span></div>)}<div className="symbol-center">太極<br/><small>TAIJIFU</small></div></div>
    </section>

    <section className="manifesto-strip"><span>Presença</span><span>Adaptação</span><span>Eficiência</span><span>Integração</span><span>Domínio próprio</span><span>Serviço à vida</span></section>

    <section className="section" id="jornada"><div className="section-heading"><div><span className="eyebrow">Progressão</span><h2>De Entrar a Sintetizar.</h2></div><p>Dez faixas organizam o desenvolvimento. Elas não medem valor humano e não substituem credenciais, evidências ou autorização institucional.</p></div><div className="belt-timeline">{(belts as any[]).map((b) => <a href="/canon#faixas" className="belt-line" key={b.id}><span>{String(b.order).padStart(2,"0")}</span><strong>{b.name}</strong><em>{b.function}</em></a>)}</div></section>

    <section className="section feature-section"><div className="feature-copy"><span className="eyebrow">Uma fonte, muitas experiências</span><h2>Canon primeiro. Produto depois.</h2><p>Site, Academy, Dojo Workspace, IA e Taijifu Masters consomem a mesma fonte versionada. Nenhum produto recria silenciosamente o significado da arte.</p><a className="text-link" href="/canon">Abrir Canon Explorer →</a></div><div className="architecture-card"><div>CANON</div><span>↓</span><div>CONTENT GRAPH</div><span>↓</span><div>VIEWS</div><span>↓</span><div>EXPERIÊNCIAS</div></div></section>
  </main>;
}
