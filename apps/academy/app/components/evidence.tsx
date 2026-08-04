"use client";

import { useState } from "react";
import { addEvidence, completePathCheckpoint, pathNucleusIds, submitWhiteTraversal } from "./evidence-store";
import { useWhiteProgress } from "./progress";

export function NucleusReflection({ nucleusId, pathId }: { nucleusId: string; pathId: string }) {
  const { state } = useWhiteProgress();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const complete = state.progress[nucleusId]?.lesson && state.progress[nucleusId]?.practice && state.progress[nucleusId]?.quiz;
  const previous = state.evidence.find((record) => record.canonicalEntityId === nucleusId && record.kind === "reflection");

  const save = () => {
    if (!text.trim()) return;
    addEvidence({ kind: "reflection", canonicalEntityId: nucleusId, pathId, body: text });
    setSaved(true);
    setText("");
  };

  return (
    <section className={`learning-card evidence-card ${!complete ? "is-locked" : ""}`}>
      <div className="step-index">04</div>
      <div>
        <span className="eyebrow">Evidência reflexiva</span>
        <h2>Registrar o que mudou</h2>
        <p>Descreva em poucas linhas o que você percebeu, qual foi a principal dificuldade e o que pretende testar na próxima prática.</p>
        {previous ? <div className="evidence-existing"><strong>Último registro</strong><p>{previous.body}</p></div> : null}
        <textarea className="reflection-input" disabled={!complete} value={text} onChange={(event) => setText(event.target.value)} placeholder={complete ? "Minha principal percepção foi..." : "Conclua lição, prática e checkpoint para registrar evidência."} />
        <div className="checkpoint-actions">
          <button className="btn primary" disabled={!complete || !text.trim()} onClick={save}>Registrar reflexão</button>
          {saved ? <span className="feedback success">Evidência registrada no histórico local.</span> : null}
        </div>
      </div>
    </section>
  );
}

const PATHS = [
  { id: "PATH-C01", code: "C01", name: "Presença e Segurança" },
  { id: "PATH-C02", code: "C02", name: "Movimento Fundamental" },
  { id: "PATH-C03", code: "C03", name: "Relação Inicial" },
];

export function WhitePathCheckpoints() {
  const { state } = useWhiteProgress();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<Record<string, string>>({});

  return (
    <div className="journey checkpoint-journey">
      {PATHS.map((path) => {
        const ids = pathNucleusIds(path.id);
        const completeCount = ids.filter((id) => {
          const row = state.progress[id] ?? {};
          return row.lesson && row.practice && row.quiz;
        }).length;
        const unlocked = completeCount === ids.length;
        const completed = Boolean(state.pathCheckpoints[path.id]);
        const submit = () => {
          const result = completePathCheckpoint(path.id, drafts[path.id] ?? "");
          setMessage((current) => ({ ...current, [path.id]: result.ok ? "Checkpoint registrado." : "Complete os quatro Núcleos e escreva sua reflexão." }));
        };
        return (
          <section className={`journey-path checkpoint-path ${completed ? "checkpoint-complete" : ""}`} key={path.id}>
            <div className="journey-head"><div className="journey-index">{path.code}</div><div><span className="meta">Checkpoint de Caminho</span><h3>{path.name}</h3><p>{completeCount}/4 Núcleos completos. Este checkpoint registra reflexão; não concede graduação.</p></div></div>
            <div>
              <textarea className="reflection-input" disabled={!unlocked || completed} value={drafts[path.id] ?? ""} onChange={(event) => setDrafts((current) => ({ ...current, [path.id]: event.target.value }))} placeholder={completed ? "Checkpoint concluído." : unlocked ? "O que conectou os quatro Núcleos deste Caminho?" : "Conclua os quatro Núcleos para liberar."} />
              <div className="checkpoint-actions"><button className="btn primary" disabled={!unlocked || completed || !(drafts[path.id] ?? "").trim()} onClick={submit}>{completed ? "Checkpoint concluído" : "Registrar checkpoint"}</button>{message[path.id] ? <span className={completed ? "feedback success" : "feedback warning"}>{message[path.id]}</span> : null}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function WhiteTraversalPanel() {
  const { state } = useWhiteProgress();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const ready = state.traversal.status === "ready" || state.traversal.status === "submitted";
  const submitted = state.traversal.status === "submitted";

  const submit = () => {
    const result = submitWhiteTraversal(text);
    setMessage(result.ok ? "Travessia enviada para avaliação futura. Nenhuma promoção foi concedida." : "Complete os três checkpoints e escreva a reflexão final.");
  };

  return (
    <section className={`traversal-panel ${ready ? "is-ready" : ""}`}>
      <div><span className="eyebrow">Travessia Branca · simulação</span><h2>{submitted ? "Enviada para revisão." : ready ? "Pronta para submissão." : "Ainda bloqueada."}</h2><p>A Travessia reúne evidências da Faixa Branca. Neste MVP, ela apenas registra uma submissão local em estado <strong>submitted</strong>. A promoção para Amarela exige decisão formal futura de avaliador autorizado.</p></div>
      <div className="promotion-gate"><strong>PROMOTION GATE</strong><span>BELT-WHITE → BELT-YELLOW: <b>NOT AUTOMATIC</b></span><span>Requer evaluator decision + authorization + persistent evidence.</span></div>
      <textarea className="reflection-input inverse-input" disabled={!ready || submitted} value={text} onChange={(event) => setText(event.target.value)} placeholder={submitted ? state.traversal.reflection : ready ? "O que a Faixa Branca mudou na sua forma de aprender, mover e agir com Safety?" : "Conclua C01, C02 e C03 para liberar."} />
      <div className="checkpoint-actions"><button className="btn light" disabled={!ready || submitted || !text.trim()} onClick={submit}>{submitted ? "Travessia enviada" : "Enviar para futura avaliação"}</button>{message ? <span className="traversal-message">{message}</span> : null}</div>
    </section>
  );
}

export function EvidenceHistory() {
  const { state } = useWhiteProgress();
  return (
    <div className="history-list">
      {state.events.length === 0 ? <div className="empty-state"><strong>Nenhum evento ainda.</strong><p>Conclua uma etapa ou registre evidência para começar o histórico.</p></div> : state.events.map((entry) => (
        <article className="history-row" key={entry.id}><div><span className="meta">{entry.type}</span><strong>{entry.detail}</strong></div><time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString("pt-BR")}</time></article>
      ))}
    </div>
  );
}
