export default function FoundationsPage(){
  const layers=[
    ["01","Fé bíblico-cristã","Crença, caráter, finalidade moral e relação com Deus."],
    ["02","Filosofia Taijifu","Princípios humanos e revisáveis de prática e vida."],
    ["03","Ciência Marcial e Artes Cinéticas","Investigação de movimento, aprendizagem, eficácia, risco e transferência."],
    ["04","Tradições marciais estudadas","Fontes técnicas, pedagógicas e históricas."],
    ["05","Arquitetura simbólica","Memória, progressão, contemplação e identidade visual."]
  ] as const;
  const ethics=["A paz é a direção; a violência não é objeto de culto.","A força existe sob responsabilidade, proporcionalidade e domínio próprio.","A técnica serve à proteção, à interrupção do dano e à saída segura.","Vingança, humilhação, crueldade e exibição vazia contradizem o caminho.","Quanto maior a capacidade, maior a responsabilidade.","A disciplina corporal serve à vida; o corpo não é descartável."];
  return <main>
    <section className="canon-hero"><span className="eyebrow">Fundamento</span><h1>O que sustenta o Taijifu.</h1><p className="lead">O sistema separa fé, filosofia, investigação, tradição e simbologia para não confundir categorias diferentes de conhecimento.</p></section>
    <section className="section"><div className="history-list">{layers.map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>
    <section className="section"><div className="prose-panel"><span className="eyebrow">Ética da força</span><h2>Capacidade implica responsabilidade.</h2><ul>{ethics.map((e)=><li key={e}>{e}</li>)}</ul></div></section>
  </main>;
}
