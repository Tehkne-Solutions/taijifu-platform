import whiteSlice from "@taijifu/content/data/white-belt";
import yellowSlice from "@taijifu/content/data/yellow-belt";
import orangeSlice from "@taijifu/content/data/orange-belt";
import redSlice from "@taijifu/content/data/red-belt";
import nodes from "@taijifu/content/data/nodes";
import paths from "@taijifu/canon/data/paths";
import { AcademyProgressSummary } from "./components/progress";
import { YellowProgressSummary } from "./components/yellow-progress";
import { OrangeProgressSummary } from "./components/orange-progress";
import { BeltProgressSummary } from "./components/belt-runtime-ui";
import { redRuntime } from "./components/red-runtime";

export default function Page() {
  const all = nodes as any[];
  const lessonCount=(beltId:string)=>all.filter((n)=>n.type==="lesson"&&n.beltId===beltId).length;
  const publishedBelts=["BELT-WHITE","BELT-YELLOW","BELT-ORANGE","BELT-RED"];
  const publishedPaths=(paths as any[]).filter((p)=>publishedBelts.includes(p.beltId));
  const beltHref=(beltId:string)=>beltId==="BELT-WHITE"?"/belt/branca":beltId==="BELT-YELLOW"?"/belt/amarela":beltId==="BELT-ORANGE"?"/belt/laranja":"/belt/vermelha";
  return <main>
    <section className="academy-hero"><div className="hero-copy"><div className="eyebrow inverse">SimpleWay Taijifu · App de prática</div><h1>Aprenda. Pratique. Registre.</h1><p className="lead inverse">O App transforma o Canon oficial em jornadas de estudo e prática. Conclusão digital registra aprendizagem; graduação real continua dependente de evidência, Travessia e avaliação autorizada.</p><div className="actions"><a className="btn light" href="/belt/branca">Começar na Branca</a><a className="btn ghost" href="/belt/vermelha">Ver progressão publicada</a></div></div><div className="hero-orbit" aria-hidden="true"><span>TAI</span><span>JI</span><span>FU</span><strong>習</strong></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Jornadas publicadas</span><h2>Quatro faixas praticáveis.</h2></div><p>Entrar, Perceber, Compreender e Manifestar formam o primeiro arco completo do App, sempre separado da decisão real de graduação.</p></div><div className="path-grid"><a className="path-card" href="/belt/branca"><span className="path-number">01</span><div><span className="meta">Branca · Entrar</span><h3>C01–C03 · N001–N012</h3><p>Presença, movimento e relação inicial.</p></div></a><a className="path-card" href="/belt/amarela"><span className="path-number">02</span><div><span className="meta">Amarela · Perceber</span><h3>C04–C06 · N013–N024</h3><p>Distância, timing, estrutura e intenção.</p></div></a><a className="path-card" href="/belt/laranja"><span className="path-number">03</span><div><span className="meta">Laranja · Compreender</span><h3>C07–C09 · N025–N036</h3><p>Mecânica, função, defesa e contramedida.</p></div></a><a className="path-card dark-card" href="/belt/vermelha"><span className="path-number">04</span><div><span className="meta">Vermelha · Manifestar</span><h3>C10–C12 · N037–N048</h3><p>Entrada, aplicação, controle, pressão e resolução.</p></div></a></div></section>
    <AcademyProgressSummary/><YellowProgressSummary/><OrangeProgressSummary/><BeltProgressSummary runtime={redRuntime}/>
    <section className="section" id="mapa"><div className="section-heading"><div><span className="eyebrow">Mapa publicado</span><h2>12 Caminhos · 48 Núcleos</h2></div><p>Cada experiência aponta para uma entidade oficial do Canon e adiciona lição, prática guiada e checkpoint sem alterar o significado do Núcleo.</p></div><div className="path-grid">{publishedPaths.map((path,index)=><a className="path-card" href={beltHref(path.beltId)} key={path.id}><span className="path-number">{String(index+1).padStart(2,"0")}</span><div><div className="meta">{path.code}</div><h3>{path.name}</h3><p>{path.function}</p><span className="text-link">Abrir jornada →</span></div></a>)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Content Graph</span><h2>Prática derivada do Canon.</h2></div></div><div className="metric-grid"><article className="metric-card"><span>01</span><strong>{whiteSlice.nuclei.length+yellowSlice.nuclei.length+orangeSlice.nuclei.length+redSlice.nuclei.length}</strong><p>Núcleos praticáveis N001–N048</p></article><article className="metric-card"><span>02</span><strong>{publishedBelts.reduce((sum,id)=>sum+lessonCount(id),0)}</strong><p>Lições conectadas ao Canon</p></article><article className="metric-card"><span>03</span><strong>{all.length}</strong><p>Lesson + Quiz + Guided Practice</p></article></div></section>
  </main>;
}
