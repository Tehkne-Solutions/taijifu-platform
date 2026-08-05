import whiteConfig from "../data/white-belt-content.json";
import yellowConfig from "../data/yellow-belt-content.json";
import orangeConfig from "../data/orange-belt-content.json";
import redConfig from "../data/red-belt-content.json";
import greenConfig from "../data/green-belt-content.json";
import cyanConfig from "../data/cyan-belt-content.json";
import blueConfig from "../data/blue-belt-content.json";
import violetConfig from "../data/violet-belt-content.json";
import { nuclei } from "@taijifu/canon";
const safety="Interrompa a atividade sempre que houver Tap, comando de parada, perda de controle ou condição insegura.";
const evidencePrompt="Registre uma observação curta: o que você percebeu, o que controlou e o que precisa praticar novamente?";
const safetyGate="Executar apenas dentro do nível de contato, intensidade e supervisão adequados.";
const config=[...whiteConfig,...yellowConfig,...orangeConfig,...redConfig,...greenConfig,...cyanConfig,...blueConfig,...violetConfig];
const nodes:any[]=[];
for(const item of config){
  const n=nuclei.find(x=>x.id===item.id)!;
  const common={canonicalEntityId:n.id,audience:["adult"],difficulty:"foundation",status:"published",version:"1.0.0",beltId:n.beltId,pathId:n.pathId};
  nodes.push({id:`CONTENT-${n.code}-LESSON`,...common,type:"lesson",title:`${n.code} · ${n.name}`,summary:item.summary,durationMinutes:12,body:{learningObjective:item.summary,sections:[{kind:"concept",title:"Por que importa",text:item.summary},{kind:"principle",title:"Regra de prática",text:"Priorize evidência, reflexão, ética, Safety e correção de rota antes de complexidade ou status."},{kind:"safety",title:"Safety",text:safety}]}});
  nodes.push({id:`CONTENT-${n.code}-QUIZ`,...common,type:"quiz",title:`Checkpoint · ${n.code}`,summary:`Verificação conceitual do Núcleo ${n.code}.`,durationMinutes:4,questions:[{id:`CONTENT-${n.code}-QUIZ-Q1`,prompt:`Qual é o foco principal de ${n.name}?`,kind:"single-choice",options:[item.summary,"Confirmar a primeira impressão sem revisar evidência","Aumentar complexidade independentemente do contexto"],correctIndex:0},{id:`CONTENT-${n.code}-QUIZ-Q2`,prompt:"O que deve orientar correção de rota?",kind:"single-choice",options:["Status pessoal","Evidência, Safety e contexto","Preferência sem teste"],correctIndex:1}]});
  nodes.push({id:`CONTENT-${n.code}-GUIDED`,...common,type:"guided-practice",title:`Prática guiada · ${n.code}`,summary:item.practice,durationMinutes:10,practice:{instruction:item.practice,evidencePrompt,safetyGate}});
}
export default nodes;
