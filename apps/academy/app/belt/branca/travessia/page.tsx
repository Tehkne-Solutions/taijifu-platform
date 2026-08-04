import { WhiteTraversalPanel } from "../../../components/evidence";

export default function WhiteTraversalPage() {
  return (
    <main>
      <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/branca">Faixa Branca</a><span>/</span><strong>Travessia</strong></nav>
      <section className="lesson-hero compact-hero"><span className="eyebrow">Avaliação integrativa</span><h1>Travessia Branca.</h1><p className="lead">A Travessia reúne aprendizagem, prática e evidência dos três Caminhos. Nesta demo ela prepara uma submissão para avaliação, mas nunca promove faixa automaticamente.</p></section>
      <section className="section"><WhiteTraversalPanel /></section>
      <nav className="lesson-nav"><a href="/belt/branca/checkpoint"><span>Anterior</span><strong>← Checkpoints C01–C03</strong></a><a className="next" href="/history"><span>Histórico</span><strong>Ver evidências →</strong></a></nav>
    </main>
  );
}
