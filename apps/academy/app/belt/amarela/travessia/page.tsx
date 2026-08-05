import { YellowTraversalPanel } from "../../../components/yellow-evidence";

export default function YellowTraversalPage(){
  return <main>
    <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/amarela">Faixa Amarela</a><span>/</span><strong>Travessia</strong></nav>
    <section className="lesson-hero compact-hero"><span className="eyebrow">Avaliação integrativa</span><h1>Travessia Amarela.</h1><p className="lead">A Travessia reúne aprendizagem, prática e evidência dos Caminhos C04–C06. O App prepara a submissão para avaliação, mas nunca promove faixa automaticamente.</p></section>
    <section className="section"><YellowTraversalPanel/></section>
    <nav className="lesson-nav"><a href="/belt/amarela/checkpoint"><span>Anterior</span><strong>← Checkpoints C04–C06</strong></a><a className="next" href="/belt/amarela/history"><span>Histórico</span><strong>Ver evidências →</strong></a></nav>
  </main>;
}
