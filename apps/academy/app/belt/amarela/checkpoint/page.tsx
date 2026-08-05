import { YellowPathCheckpoints } from "../../../components/yellow-evidence";

export default function YellowCheckpointsPage(){
  return <main>
    <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/amarela">Faixa Amarela</a><span>/</span><strong>Checkpoints</strong></nav>
    <section className="lesson-hero compact-hero"><span className="eyebrow">Integração C04–C06</span><h1>Checkpoints de Caminho.</h1><p className="lead">Depois de concluir os quatro Núcleos de cada Caminho, registre o que passou a perceber de forma mais clara. Checkpoint não é graduação.</p></section>
    <section className="section"><YellowPathCheckpoints/></section>
    <nav className="lesson-nav"><a href="/belt/amarela"><span>Mapa</span><strong>← Voltar à Faixa Amarela</strong></a><a className="next" href="/belt/amarela/travessia"><span>Próximo</span><strong>Travessia Amarela →</strong></a></nav>
  </main>;
}
