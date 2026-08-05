import { YellowEvidenceHistory } from "../../../components/yellow-evidence";

export default function YellowHistoryPage(){
  return <main>
    <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/amarela">Faixa Amarela</a><span>/</span><strong>Histórico</strong></nav>
    <section className="belt-hero"><div><span className="eyebrow">Evidence Timeline · Amarela</span><h1>Histórico.</h1><p className="lead">Linha do tempo local da função Perceber: etapas, reflexões, checkpoints e Travessia da Faixa Amarela.</p></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Eventos</span><h2>O que você observou e praticou.</h2></div><p>O histórico documenta aprendizagem; não registra promoção de faixa.</p></div><YellowEvidenceHistory/></section>
  </main>;
}
