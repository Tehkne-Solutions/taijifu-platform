import { notFound } from "next/navigation";
import nodes from "@taijifu/content/data/nodes";
import nuclei from "@taijifu/canon/data/nuclei";
import paths from "@taijifu/canon/data/paths";
import { LessonActions, NucleusProgress } from "../../../components/progress";
import { NucleusReflection } from "../../../components/evidence";

export function generateStaticParams() {
  return (nuclei as any[]).filter((n) => n.beltId === "BELT-WHITE").map((n) => ({ nucleus: n.code.toLowerCase() }));
}

export default async function NucleusPage({ params }: { params: Promise<{ nucleus: string }> }) {
  const { nucleus } = await params;
  const code = nucleus.toUpperCase();
  const canonical = (nuclei as any[]).find((n) => n.code === code && n.beltId === "BELT-WHITE");
  if (!canonical) notFound();

  const path = (paths as any[]).find((p) => p.id === canonical.pathId);
  const all = nodes as any[];
  const lesson = all.find((n) => n.canonicalEntityId === canonical.id && n.type === "lesson");
  const quiz = all.find((n) => n.canonicalEntityId === canonical.id && n.type === "quiz");
  const practice = all.find((n) => n.canonicalEntityId === canonical.id && n.type === "guided-practice");
  if (!lesson || !quiz || !practice) notFound();

  const next = (nuclei as any[]).find((n) => n.order === canonical.order + 1 && n.beltId === "BELT-WHITE");
  const previous = (nuclei as any[]).find((n) => n.order === canonical.order - 1 && n.beltId === "BELT-WHITE");

  return (
    <main>
      <nav className="breadcrumb"><a href="/">Academy</a><span>/</span><a href="/belt/branca">Faixa Branca</a><span>/</span><strong>{canonical.code}</strong></nav>
      <section className="lesson-hero">
        <div className="lesson-kicker"><span>{path.code}</span><span>{path.name}</span></div>
        <div className="lesson-title-row"><div><span className="eyebrow">{canonical.code} · Núcleo oficial</span><h1>{canonical.name}</h1></div><NucleusProgress nucleusId={canonical.id} /></div>
        <p className="lead">{lesson.summary}</p>
        <div className="lesson-meta"><span>≈ {lesson.durationMinutes + quiz.durationMinutes + practice.durationMinutes} min</span><span>Foundation</span><span>Canon 1.0</span></div>
      </section>

      <section className="content-layout">
        <article className="lesson-content">
          {lesson.body.sections.map((section: any) => (
            <section className={`content-section ${section.kind === "safety" ? "safety-section" : ""}`} key={section.title}>
              <span className="eyebrow">{section.kind}</span><h2>{section.title}</h2><p>{section.text}</p>
            </section>
          ))}
          <LessonActions nucleusId={canonical.id} quizQuestions={quiz.questions} practiceText={practice.practice.instruction} />
          <NucleusReflection nucleusId={canonical.id} pathId={path.id} />
        </article>
        <aside className="lesson-aside">
          <div className="sticky-card"><span className="eyebrow">Contexto canônico</span><h3>{path.name}</h3><p>{path.function}</p><div className="aside-rule"><strong>Faixa</strong><span>Branca · Entrar</span></div><div className="aside-rule"><strong>Status</strong><span>Current Canon</span></div><a className="text-link" href="/belt/branca">← Voltar ao mapa</a></div>
        </aside>
      </section>

      <nav className="lesson-nav">
        {previous ? <a href={`/belt/branca/${previous.code.toLowerCase()}`}><span>Anterior</span><strong>{previous.code} · {previous.name}</strong></a> : <span />}
        {next ? <a className="next" href={`/belt/branca/${next.code.toLowerCase()}`}><span>Próximo</span><strong>{next.code} · {next.name} →</strong></a> : <a className="next" href="/belt/branca"><span>Concluir</span><strong>Voltar ao mapa →</strong></a>}
      </nav>
    </main>
  );
}
