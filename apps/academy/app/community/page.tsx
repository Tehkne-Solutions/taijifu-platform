"use client";
import { FormEvent, useEffect, useState } from "react";

type FeedItem={id:string;display_name?:string|null;handle?:string|null;body:string;post_type:string;created_at:string;group_name?:string|null;canonical_entity_ids?:string[]};
type Group={id:string;slug:string;name:string;group_type:string;description:string;member_role:string;member_status:string};

export default function CommunityPage(){
  const [feed,setFeed]=useState<FeedItem[]>([]);const [groups,setGroups]=useState<Group[]>([]);const [body,setBody]=useState("");const [error,setError]=useState("");
  async function load(){try{const [f,g]=await Promise.all([fetch("/api/community/feed"),fetch("/api/community/groups")]);const fd=await f.json();const gd=await g.json();if(!f.ok)throw new Error(fd.error??"feed-error");if(!g.ok)throw new Error(gd.error??"groups-error");setFeed(fd.feed??[]);setGroups(gd.groups??[]);}catch(e){setError(e instanceof Error?e.message:"community-error");}}
  useEffect(()=>{void load();},[]);
  async function publish(event:FormEvent){event.preventDefault();setError("");const response=await fetch("/api/community/feed",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({body,postType:"reflection"})});const data=await response.json();if(!response.ok){setError(data.error??"post-error");return;}setBody("");await load();}
  return <main><section className="compact-hero"><span className="eyebrow">Taijifu Community</span><h1>Comunidade conectada ao Canon, não à vaidade.</h1><p className="lead">Compartilhe reflexão, prática e pesquisa. Popularidade não concede faixa, credencial ou autoridade.</p></section>
  <section className="ai-layout"><form className="ai-composer" onSubmit={publish}><label htmlFor="community-post">Nova reflexão</label><textarea id="community-post" value={body} onChange={(e)=>setBody(e.target.value)} maxLength={4000}/><button className="btn primary" disabled={body.trim().length<3}>Publicar</button>{error&&<p className="feedback warning">{error}</p>}</form><article className="ai-answer"><span className="eyebrow">Grupos</span><div className="source-list">{groups.map((g)=><div className="source-chip" key={g.id}><strong>{g.name}</strong><span>{g.group_type} · {g.member_role}</span></div>)}</div></article></section>
  <section className="content-section"><div className="section-head"><div><span className="eyebrow">Feed</span><h2>Prática, perguntas e pesquisa</h2></div></div><div className="path-grid">{feed.map((p)=><article className="path-card" key={p.id}><span className="eyebrow">{p.post_type}{p.group_name?` · ${p.group_name}`:""}</span><h3>{p.display_name||p.handle||"Praticante Taijifu"}</h3><p>{p.body}</p><small>{new Date(p.created_at).toLocaleString("pt-BR")}</small></article>)}</div>{!feed.length&&!error&&<p className="lead">A comunidade ainda não publicou conteúdo.</p>}</section></main>;
}
