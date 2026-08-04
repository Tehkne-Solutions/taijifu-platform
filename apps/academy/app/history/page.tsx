import { EvidenceHistory } from "../components/evidence";

export default function HistoryPage() {
  return (
    <main>
      <section className="belt-hero"><div><span className="eyebrow">Evidence Timeline</span><h1>Histórico.</h1><p className="lead">Linha do tempo local de aprendizagem e evidência. A P5 trocará este storage local por persistência autenticada sem mudar o contrato de domínio.</p></div></section>
      <section className="section"><div className="section-heading"><div><span className="eyebrow">Eventos</span><h2>O que já aconteceu.</h2></div><p>Este histórico registra conclusão de etapas, reflexões, checkpoints e submissão da Travessia. Ele não registra promoção de faixa.</p></div><EvidenceHistory /></section>
    </main>
  );
}
