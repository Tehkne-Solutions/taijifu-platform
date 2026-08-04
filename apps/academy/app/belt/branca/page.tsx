import nodes from "@taijifu/content/data/nodes";
import paths from "@taijifu/canon/data/paths";
import nuclei from "@taijifu/canon/data/nuclei";
import { AcademyProgressSummary, NucleusProgress } from "../../components/progress";

export default function WhiteBelt() {
  const all = nodes as any[];
  const whitePaths = (paths as any[]).filter((p) => p.beltId === "BELT-WHITE");
  const whiteNuclei = (nuclei as any[]).filter((n) => n.beltId === "BELT-WHITE").sort((a, b) => a.order - b.order);

  return (
    <main>
      <section className="belt-hero">
        <div><span className="eyebrow">Faixa 01 · Branca</span><h1>Entrar.</h1><p className="lead">Aprender a aprender com presença, movimento fundamental, relação inicial e Safety desde o primeiro contato.</p></div>
        <div className="belt-mark"><span>01</span><strong>白</strong><small>12 Núcleos</small></div>
      </section>

      <AcademyProgressSummary />

      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">Mapa da faixa</span><h2>Três Caminhos, uma progressão.</h2></div><p>Você não “sobe de faixa” por clicar em concluir. O sistema registra aprendizagem; a graduação real depende de evidência, Travessia e decisão de avaliador autorizado.</p></div>
        <div className="journey">
          {whitePaths.map((path, index) => {
            const pathNuclei = whiteNuclei.filter((n) => n.pathId === path.id);
            return (
              <section className="journey-path" key={path.id}>
                <div className="journey-head"><div className="journey-index">{String(index + 1).padStart(2, "0")}</div><div><span className="meta">{path.code}</span><h3>{path.name}</h3><p>{path.function}</p></div></div>
                <div className="nucleus-list">
                  {pathNuclei.map((n, ni) => {
                    const lesson = all.find((node) => node.canonicalEntityId === n.id && node.type === "lesson");
                    return (
                      <a className="nucleus-row" key={n.id} href={`/belt/branca/${n.code.toLowerCase()}`}>
                        <span className="nucleus-code">{n.code}</span>
                        <div><strong>{n.name}</strong><p>{lesson?.summary}</p></div>
                        <NucleusProgress nucleusId={n.id} />
                        <span className="row-arrow">→</span>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <section className="section next-stage-section">
        <div className="section-heading"><div><span className="eyebrow">Integração</span><h2>Depois dos 12 Núcleos.</h2></div><p>Feche os checkpoints C01–C03 e prepare sua Travessia. O fluxo termina em submissão para avaliação — nunca em promoção automática.</p></div>
        <div className="next-stage-grid">
          <a className="path-card" href="/belt/branca/checkpoint"><span className="path-number">A</span><div><span className="meta">C01–C03</span><h3>Checkpoints de Caminho</h3><p>Sintetize os quatro Núcleos de cada Caminho e registre evidência reflexiva.</p><span className="text-link">Abrir checkpoints →</span></div></a>
          <a className="path-card dark-card" href="/belt/branca/travessia"><span className="path-number">B</span><div><span className="meta">Travessia</span><h3>Submissão para avaliação</h3><p>Reúna a jornada da Branca sem transformar XP em graduação.</p><span className="text-link">Abrir Travessia →</span></div></a>
          <a className="path-card" href="/history"><span className="path-number">C</span><div><span className="meta">Evidence Timeline</span><h3>Histórico de progresso</h3><p>Veja etapas, reflexões e checkpoints registrados nesta demo local.</p><span className="text-link">Ver histórico →</span></div></a>
        </div>
      </section>
    </main>
  );
}
