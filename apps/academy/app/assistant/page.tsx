"use client";
import { FormEvent, useState } from "react";

type Source={ref:string;tier:string;canonicalEntityId:string;title:string};
type Usage={inputTokens:number;outputTokens:number;totalTokens:number};
type Result={conversationId:string;generationId:string;answer:string;mode:string;canonRelease:string;officialPositionAvailable:boolean;sources:Source[];usage:Usage;estimatedCostMicrousd:number};

export default function AcademyAssistantPage(){
  const [query,setQuery]=useState("O que devo desenvolver na Faixa Branca?");
  const [conversationId,setConversationId]=useState<string|undefined>();
  const [result,setResult]=useState<Result|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function submit(event:FormEvent){event.preventDefault();setLoading(true);setError("");try{const response=await fetch("/api/ai/query",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query,surface:"academy-tutor",conversationId})});const data=await response.json();if(!response.ok)throw new Error(data.error??"assistant-error");setConversationId(data.conversationId);setResult(data);}catch(e){setError(e instanceof Error?e.message:"assistant-error");}finally{setLoading(false)}}
  return <main>
    <section className="compact-hero"><span className="eyebrow">IA Taijifu · Tutor</span><h1>Consulte o Canon, não um palpite.</h1><p className="lead">Cada consulta é persistida e auditável. O tutor usa sua faixa oficial como contexto e recupera primeiro o Canon vigente.</p><p><a href="/assistant/history">Ver histórico persistente →</a></p></section>
    <section className="ai-layout">
      <form className="ai-composer" onSubmit={submit}><label htmlFor="taijifu-query">Pergunta</label><textarea id="taijifu-query" value={query} onChange={(e)=>setQuery(e.target.value)} maxLength={1200}/><button className="btn primary" disabled={loading||query.trim().length<3}>{loading?"Consultando…":"Consultar Canon"}</button>{conversationId&&<p className="ai-meta">Conversa: {conversationId}</p>}{error&&<p className="feedback warning">{error}</p>}</form>
      <article className="ai-answer"><span className="eyebrow">Resposta fundamentada</span>{result?<><h2>{result.officialPositionAvailable?"Posição canônica localizada":"Sem posição canônica suficiente"}</h2><p className="ai-body">{result.answer}</p><div className="ai-meta"><span>{result.canonRelease}</span><span>{result.mode}</span><span>{result.generationId}</span><span>{result.usage.totalTokens} tokens</span><span>{result.estimatedCostMicrousd} μUSD</span></div><div className="source-list">{result.sources.map((s)=><div key={s.ref} className="source-chip"><strong>[{s.ref}] {s.title}</strong><span>{s.tier} · {s.canonicalEntityId}</span></div>)}</div></>:<p className="lead">Faça uma pergunta para ver quais entidades do Canon sustentam a resposta.</p>}</article>
    </section>
  </main>;
}
