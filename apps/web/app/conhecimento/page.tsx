import { knowledgePages } from "@taijifu/canon/knowledge";

export default function KnowledgeIndex() {
  return <main>
    <section className="canon-hero">
      <span className="eyebrow">Biblioteca oficial</span>
      <h1>Conhecimento.</h1>
      <p className="lead">Domínios que explicam como o Taijifu investiga, prepara, move, regula, protege e sustenta a prática ao longo da vida.</p>
    </section>
    <section className="section">
      <div className="knowledge-grid">
        {knowledgePages.map((page, index) => <a className="knowledge-card" href={"/conhecimento/" + page.slug} key={page.slug}>
          <span>{String(index + 1).padStart(2, "0")}</span><h3>{page.title}</h3><p>{page.summary}</p>
        </a>)}
      </div>
    </section>
  </main>;
}
