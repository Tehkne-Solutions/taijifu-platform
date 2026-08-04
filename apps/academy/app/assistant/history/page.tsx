"use client";
import { useEffect, useState } from "react";

type Conversation={id:string;surface:string;dojo_id?:string|null;title?:string|null;created_at:string;updated_at:string};
type Usage={generations:number;estimated_cost_microusd:string|number};

export default function AiHistoryPage(){
  const [conversations,setConversations]=useState<Conversation[]>([]);
  const [usage,setUsage]=useState<Usage|null>(null);
  const [error,setError]=useState("");
  useEffect(()=>{void (async()=>{try{const response=await fetch("/api/ai/history");const data=await response.json();if(!response.ok)throw new Error(data.error??"history-error");setConversations(data.conversations??[]);setUsage(data.usage??null);}catch(e){setError(e instanceof Error?e.message:"history-error");}})();},[]);
  return <main>
    <section className="compact-hero"><span className="eyebrow">IA Taijifu · Histórico</span><h1>Conversas persistentes e auditáveis.</h1><p className="lead">As consultas ficam ligadas à sua identidade, superfície, contexto e custos registrados.</p><p><a href="/assistant">← Voltar ao Tutor</a></p></section>
    <section className="content-section"><div className="section-head"><div><span className="eyebrow">Últimos 30 dias</span><h2>Observabilidade pessoal</h2></div></div>{usage&&<div className="stat-grid"><article className="stat-card"><strong>{usage.generations}</strong><span>gerações concluídas</span></article><article className="stat-card"><strong>{String(usage.estimated_cost_microusd)}</strong><span>μUSD estimados</span></article></div>}{error&&<p className="feedback warning">{error}</p>}<div className="path-grid">{conversations.map((c)=><article className="path-card" key={c.id}><span className="eyebrow">{c.surface}</span><h3>{c.title||"Conversa Taijifu"}</h3><p>{c.id}</p><small>Atualizada em {new Date(c.updated_at).toLocaleString("pt-BR")}</small></article>)}</div>{!error&&!conversations.length&&<p className="lead">Ainda não há conversas persistidas.</p>}</section>
  </main>;
}
