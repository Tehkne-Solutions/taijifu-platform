export default function GovernancePage(){
  const flow=["Proposta","Evidência","Revisão","Consulta","Decisão","Versionamento","Publicação","Monitoramento"];
  const rules=[
    "Canon é a posição oficial vigente, não uma verdade eterna.",
    "Nenhum Mestre está acima do Canon; o Canon também não está acima da evidência.",
    "Mudanças relevantes exigem rastreabilidade e versão.",
    "Safety pode suspender provisoriamente uma prática antes do ciclo canônico normal quando houver risco grave plausível.",
    "Documentos históricos não substituem silenciosamente decisões posteriores.",
    "Produtos digitais consomem o Canon; não criam uma versão paralela da arte."
  ];
  return <main>
    <section className="canon-hero"><span className="eyebrow">Governança</span><h1>Como o Canon muda.</h1><p className="lead">O Taijifu evolui por processo explícito, evidência, revisão e versionamento — não por autoridade isolada ou alteração silenciosa de conteúdo.</p></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Canon Change</span><h2>Oito etapas.</h2></div><p>Uma mudança pode ser editorial, de clarificação, pedagógica, técnica, de Safety ou estrutural.</p></div><div className="principle-list">{flow.map((step,i)=><article key={step}><span>{String(i+1).padStart(2,"0")}</span><p>{step}</p></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Regras</span><h2>Autoridade com rastreabilidade.</h2><ul>{rules.map((r)=><li key={r}>{r}</li>)}</ul></div></section>
  </main>;
}
