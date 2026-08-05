import whiteConfig from "../data/white-belt-content.json";
import yellowConfig from "../data/yellow-belt-content.json";
import orangeConfig from "../data/orange-belt-content.json";
import redConfig from "../data/red-belt-content.json";
import greenConfig from "../data/green-belt-content.json";
import cyanConfig from "../data/cyan-belt-content.json";
import blueConfig from "../data/blue-belt-content.json";
import violetConfig from "../data/violet-belt-content.json";
import brownConfig from "../data/brown-belt-content.json";
import { nuclei } from "@taijifu/canon";
const safety="Interrompa a atividade sempre que houver Tap, comando de parada, perda de controle ou condição insegura.";
const evidencePrompt="Registre uma observação curta: o que você percebeu, que evidência sustenta sua leitura e qual correção de rota é necessária?";
const safetyGate="Atue somente dentro do seu Role, Credential, Authorization e nível de supervisão aplicável.";
const config=[...whiteConfig,...yellowConfig,...orangeConfig,...redConfig,...greenConfig,...cyanConfig,...blueConfig,...violetConfig,...brownConfig];
const nodes:any[]=[];
for(const item of config){
  const n=nuclei.find(x=>x.id===item.id)!;
  const common={canonicalEntityId:n.id,audience:["adult"],difficulty:"foundation",status:"published",version:"1.0.0",beltId:n.beltId,pathId:n.pathId};
  nodes.push({id:`CONTENT-${n.code}-LESSON`,...common,type:"lesson",title:`${n.code} · ${n.name}`,summary:item.summary,durationMinutes:12,body:{learningObjective:item.summary,sections:[{kind:"concept",title:"Por que importa",text:item.summary},{kind:"principle",title:"Regra de prática",text:"Priorize evidência, escopo, responsabilidade, Safety e rastreabilidade antes de autoridade ou status."},{kind:"safety",title:"Safety",text:safety}]}});
  nodes.push({id:`CONTENT-${n.code}-QUIZ`,...common,type:"quiz",title:`Checkpoint · ${n.code}`,summary:`Verificação conceitual do Núcleo ${n.code}.`,durationMinutes:4,questions:[{id:`CONTENT-${n.code}-QUIZ-Q1`,prompt:`Qual é o foco principal de ${n.name}?`,kind:"single-choice",options:[item.summary,"Tomar decisões sem registrar contexto","Substituir evidência por autoridade pessoal"],correctIndex:0},{id:`CONTENT-${n.code}-QUIZ-Q2`,prompt:"O que deve limitar uma decisão de governança?",kind:"single-choice",options:["Preferência individual","Escopo, evidência, Safety e autorização","Tempo de prática isoladamente"],correctIndex:1}]});
  nodes.push({id:`CONTENT-${n.code}-GUIDED`,...common,type:"guided-practice",title:`Prática guiada · ${n.code}`,summary:item.practice,durationMinutes:10,practice:{instruction:item.practice,evidencePrompt,safetyGate}});
}
export default nodes;
