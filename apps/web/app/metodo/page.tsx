export default function MetodoPage() {
  const layers = [
    ["01", "Conhecer", "Compreender conceitos, linguagem e posição curricular antes de executar."],
    ["02", "Praticar", "Transformar conhecimento em experiência por tarefas, exercícios e prática orientada."],
    ["03", "Demonstrar", "Produzir evidência observável de competência, respeitando Safety e contexto."],
    ["04", "Transferir", "Levar a competência para variações de parceiro, ambiente, pressão e capacidade."],
    ["05", "Consolidar", "Revisitar, reter, refletir e sustentar competência ao longo do tempo."]
  ];
  return <main>
    <section className="canon-hero"><span className="eyebrow">Método Taijifu</span><h1>Aprender é integrar.</h1><p className="lead">O método organiza conhecimento, prática, evidência, transferência e continuidade. A progressão não é uma coleção de técnicas nem uma corrida por graduação.</p></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Ciclo de aprendizagem</span><h2>Cinco estados de desenvolvimento.</h2></div><p>O aplicativo usa estes estados para representar progresso de aprendizagem sem confundi-lo com faixa.</p></div><div className="knowledge-grid">{layers.map(([n,t,d]) => <article className="knowledge-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Arquitetura</span><h2>Faixa → Caminho → Núcleo.</h2></div><p>A faixa define a função de desenvolvimento. O Caminho organiza uma competência ampla. O Núcleo é a unidade curricular que recebe conteúdo didático e prática.</p></div><div className="architecture-card wide"><div>10 FAIXAS · FUNÇÃO</div><span>↓</span><div>32 CAMINHOS · ORGANIZAÇÃO</div><span>↓</span><div>128 NÚCLEOS · UNIDADE CURRICULAR</div><span>↓</span><div>APP · ESTUDO + PRÁTICA + EVIDÊNCIA</div></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Princípio operacional</span><h2>Progresso não é graduação.</h2></div><p>XP, conclusão de conteúdo e atividade no aplicativo podem representar engajamento e aprendizagem. A faixa pertence a um processo próprio de evidência, Travessia e avaliação autorizada.</p></div></section>
  </main>;
}
