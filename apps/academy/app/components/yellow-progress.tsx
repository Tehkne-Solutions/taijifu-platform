"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningStep, YellowBeltLocalState } from "@taijifu/evidence/types";
import { ProgressRing } from "./progress";
import { YELLOW_NUCLEUS_IDS, completeYellowLearningStep, readYellowState, resetYellowDemo, subscribeYellowState } from "./yellow-evidence-store";

type QuizQuestion={id:string;prompt:string;options:string[];correctIndex:number};

export function useYellowProgress(){
  const[state,setState]=useState<YellowBeltLocalState>(()=>({schemaVersion:2,progress:{},evidence:[],pathCheckpoints:{},traversal:{status:"locked"},events:[]}));
  useEffect(()=>{const sync=()=>setState(readYellowState());sync();return subscribeYellowState(sync);},[]);
  const complete=(nucleusId:string,step:LearningStep)=>setState(completeYellowLearningStep(nucleusId,step));
  const reset=()=>{resetYellowDemo();setState(readYellowState());};
  const stats=useMemo(()=>{const totalSteps=YELLOW_NUCLEUS_IDS.length*3;let completedSteps=0,completedNuclei=0;for(const id of YELLOW_NUCLEUS_IDS){const row=state.progress[id]??{};const count=Number(Boolean(row.lesson))+Number(Boolean(row.practice))+Number(Boolean(row.quiz));completedSteps+=count;if(count===3)completedNuclei+=1;}return{completedSteps,totalSteps,completedNuclei,xp:completedSteps*10,percent:Math.round((completedSteps/totalSteps)*100),evidenceCount:state.evidence.length,pathCheckpoints:Object.values(state.pathCheckpoints).filter(Boolean).length,traversalStatus:state.traversal.status};},[state]);
  return{state,complete,reset,stats};
}

export function YellowProgressSummary(){const{stats,reset}=useYellowProgress();return <div className="progress-panel"><ProgressRing value={stats.percent} label="Faixa Amarela"/><div className="progress-copy"><span className="eyebrow">Progresso local · schema v2</span><h3>{stats.completedNuclei} de 12 Núcleos consolidados</h3><p>{stats.completedSteps} de {stats.totalSteps} etapas · {stats.xp} XP · {stats.evidenceCount} evidências · {stats.pathCheckpoints}/3 checkpoints de Caminho.</p><p><strong>Travessia:</strong> {stats.traversalStatus}. Conclusão do app não concede promoção automática.</p></div>{stats.completedSteps>0?<button className="text-button" onClick={reset}>Reiniciar demo</button>:null}</div>;}

export function YellowNucleusProgress({nucleusId}:{nucleusId:string}){const{state}=useYellowProgress();const row=state.progress[nucleusId]??{};const count=Number(Boolean(row.lesson))+Number(Boolean(row.quiz))+Number(Boolean(row.practice));return <div className="mini-progress" aria-label={`${count} de 3 etapas concluídas`}>{(["lesson","practice","quiz"] as LearningStep[]).map(step=><span key={step} className={row[step]?"done":""} title={{lesson:"Lição",practice:"Prática",quiz:"Checkpoint"}[step]}/>)}</div>;}

export function YellowLessonActions({nucleusId,quizQuestions,practiceText}:{nucleusId:string;quizQuestions:QuizQuestion[];practiceText:string}){
  const{state,complete}=useYellowProgress();const row=state.progress[nucleusId]??{};const[answers,setAnswers]=useState<Record<string,number>>({});const[submitted,setSubmitted]=useState(false);const score=quizQuestions.reduce((sum,q)=>sum+(answers[q.id]===q.correctIndex?1:0),0);const quizPassed=submitted&&score===quizQuestions.length;
  const submitQuiz=()=>{setSubmitted(true);const nextScore=quizQuestions.reduce((sum,q)=>sum+(answers[q.id]===q.correctIndex?1:0),0);if(nextScore===quizQuestions.length)complete(nucleusId,"quiz");};
  return <div className="learning-stack">
    <section className={`learning-card ${row.lesson?"is-complete":""}`}><div className="step-index">01</div><div><span className="eyebrow">Lição</span><h2>Perceber</h2><p>Leia o Núcleo e explique qual informação precisa ser percebida antes de agir.</p><button className="btn primary" onClick={()=>complete(nucleusId,"lesson")}>{row.lesson?"Lição concluída":"Concluir lição"}</button></div></section>
    <section className={`learning-card ${row.practice?"is-complete":""} ${!row.lesson?"is-locked":""}`}><div className="step-index">02</div><div><span className="eyebrow">Prática guiada</span><h2>Observar em movimento</h2><p>{practiceText}</p><div className="safety-box"><strong>Safety Gate</strong><span>Execute apenas dentro do nível de contato, intensidade e supervisão adequados. Pare diante de qualquer condição insegura.</span></div><button className="btn primary" disabled={!row.lesson} onClick={()=>complete(nucleusId,"practice")}>{row.practice?"Prática registrada":row.lesson?"Registrar prática":"Conclua a lição primeiro"}</button></div></section>
    <section className={`learning-card ${row.quiz?"is-complete":""} ${!row.practice?"is-locked":""}`}><div className="step-index">03</div><div className="quiz-block"><span className="eyebrow">Checkpoint</span><h2>Verificar percepção</h2>{quizQuestions.map((q,qi)=><fieldset key={q.id} className="question" disabled={!row.practice}><legend>{qi+1}. {q.prompt}</legend>{q.options.map((option,oi)=><label key={option} className="option"><input type="radio" name={q.id} checked={answers[q.id]===oi} onChange={()=>setAnswers(prev=>({...prev,[q.id]:oi}))}/><span>{option}</span></label>)}</fieldset>)}<div className="checkpoint-actions"><button className="btn primary" disabled={!row.practice} onClick={submitQuiz}>{row.practice?"Validar checkpoint":"Registre a prática primeiro"}</button>{submitted?<span className={quizPassed?"feedback success":"feedback warning"}>{quizPassed?`Aprovado · ${score}/${quizQuestions.length}`:`Revise e tente novamente · ${score}/${quizQuestions.length}`}</span>:null}</div></div></section>
  </div>;
}
