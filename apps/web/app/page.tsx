import belts from "@taijifu/canon/data/belts";
import bases from "@taijifu/canon/data/bases";

export default function Page() {
  return <main>
    <section className="home-hero">
      <div className="hero-copy"><div className="eyebrow inverse">Fonte Oficial · Canon 1.0</div><h1>Conhecer a arte.<br/>Compreender o método.</h1><p className="lead inverse">A Plataforma Taijifu organiza em uma única fonte o Canon, a metodologia, o currículo e o conhecimento oficial da arte. O aplicativo transforma esse conhecimento em estudo e prática orientada.</p><div className="actions"><a className="btn light" href="/canon">Explorar o Canon</a><a className="btn ghost" href="/metodo">Entender o método</a></div></div>
      <div className="symbol-map" aria-label="Quatro Bases do Taijifu">{(bases as any[]).map((b, i) => <div key={b.id} className={`symbol symbol-${i+1}`}><strong>{b.name}</strong><span>{b.color}</span></div>)}<div className="symbol-center">太極<br/><small>TAIJIFU</small></div></div>
    </section>

    <section className="manifesto-strip"><span>Presença</span><span>Adaptação</span><span>Eficiência</span><span>Integração</span><span>Domínio próprio</span><span>Continuidade</span></section>

    <section className="section"><div className="section-heading"><div><span className="eyebrow">Conhecimento oficial</span><h2>Uma fonte para compreender o Taijifu.</h2></div><p>O conteúdo público nasce do mesmo Canon versionado que organiza faixas, Caminhos e Núcleos. A plataforma não mantém versões paralelas da arte.</p></div><div className="knowledge-grid"><a className="knowledge-card" href="/canon"><span>01</span><h3>Canon</h3><p>4 Bases, 10 Faixas, 32 Caminhos e 128 Núcleos em uma estrutura navegável.</p></a><a className="knowledge-card" href="/metodo"><span>02</span><h3>Método</h3><p>Como o Taijifu organiza aprendizagem, prática, integração, evidência e continuidade.</p></a><a className="knowledge-card" href="/glossario"><span>03</span><h3>Glossário</h3><p>Termos oficiais e linguagem curricular consultáveis em um só lugar.</p></a></div></section>

    <section className="section" id="jornada"><div className="section-heading"><div><span className="eyebrow">Progressão</span><h2>De Entrar a Sintetizar.</h2></div><p>Dez faixas organizam o desenvolvimento curricular. Graduação não é XP: depende do processo de prática, evidência e avaliação definido pelo método.</p></div><div className="belt-timeline">{(belts as any[]).map((b) => <a href={`/faixas/${b.id.replace("BELT-", "").toLowerCase()}`} className="belt-line" key={b.id}><span>{String(b.order).padStart(2,"0")}</span><strong>{b.name}</strong><em>{b.function}</em></a>)}</div></section>

    <section className="section feature-section"><div className="feature-copy"><span className="eyebrow">Site + prática</span><h2>Conhecimento no site. Prática no app.</h2><p>O site é a referência oficial do Taijifu. A Academy usa a mesma estrutura para transformar o currículo em estudo, exercícios, registros e progressão prática.</p><a className="text-link" href="/canon">Abrir Canon Explorer →</a></div><div className="architecture-card"><div>CANON OFICIAL</div><span>↓</span><div>SITE · CONHECER</div><span>+</span><div>APP · PRATICAR</div></div></section>
  </main>;
}
