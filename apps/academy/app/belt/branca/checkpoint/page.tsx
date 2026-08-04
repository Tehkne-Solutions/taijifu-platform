import { WhitePathCheckpoints } from "../../../components/evidence";

export default function WhiteCheckpointsPage() {
  return (
    <main>
      <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/branca">Faixa Branca</a><span>/</span><strong>Checkpoints</strong></nav>
      <section className="lesson-hero compact-hero"><span className="eyebrow">Integração C01–C03</span><h1>Checkpoints de Caminho.</h1><p className="lead">Depois de concluir os quatro Núcleos de cada Caminho, registre a síntese do que você aprendeu. Checkpoint não é graduação.</p></section>
      <section className="section"><WhitePathCheckpoints /></section>
      <nav className="lesson-nav"><a href="/belt/branca"><span>Mapa</span><strong>← Voltar à Faixa Branca</strong></a><a className="next" href="/belt/branca/travessia"><span>Próximo</span><strong>Travessia Branca →</strong></a></nav>
    </main>
  );
}
