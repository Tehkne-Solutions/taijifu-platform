export const baseDetails = [
  { id:"BASE-TAI", slug:"tai", title:"Tai", genealogy:"Influência histórica direta relevante do Taekwondo, sem equivalência entre Tai e Taekwondo.", description:"A Base Tai organiza presença, alcance, mobilidade, longa distância, entrada e decisão. Seu foco não é colecionar chutes, mas compreender como agir quando distância, deslocamento e iniciativa são determinantes." },
  { id:"BASE-JI", slug:"ji", title:"Ji", genealogy:"Influência histórica direta relevante do Jiu-Jitsu, sem equivalência entre Ji e Jiu-Jitsu.", description:"A Base Ji organiza estrutura, proximidade, controle, desequilíbrio, solo e sobrevivência no contato. O objetivo é compreender pressão, base, conexão e recuperação quando a distância longa deixa de existir." },
  { id:"BASE-FU", slug:"fu", title:"Fu", genealogy:"Influência histórica relevante do Kung Fu e de estudos de fluxo, coordenação, respiração e transição.", description:"A Base Fu organiza fluxo, coordenação, ritmo, continuidade e transição. Ela conecta estados sem tratar cada técnica como uma ação isolada." },
  { id:"BASE-INTEGRATION", slug:"integracao", title:"Integração/Sobrevivência", genealogy:"Desenvolvimento próprio do Taijifu.", description:"A quarta Base governa síntese contextual, ambiente, adaptação, continuidade e saída segura. Ela existe para integrar Tai, Ji e Fu diante de terreno, objetos, terceiros, pressão, falha e mudança de contexto." }
] as const;

export const provenanceTypes = [
  { id:"RECOVERED", title:"Recuperado", text:"Conteúdo efetivamente encontrado em fontes internas preservadas." },
  { id:"HISTORICAL", title:"Histórico", text:"Conteúdo que pertence a uma versão anterior e permanece preservado como memória do sistema." },
  { id:"RECONSTRUCTED", title:"Reconstruído", text:"Estrutura historicamente sustentada cuja redação integral original não foi recuperada e foi formalizada novamente pelo Canon." },
  { id:"CURRENT_CANON", title:"Canon contemporâneo", text:"Decisão oficialmente vigente criada ou consolidada na construção atual do Taijifu." },
  { id:"EXTERNAL_REFERENCE", title:"Referência externa", text:"Fonte científica, histórica ou tradicional usada para sustentar afirmações que não devem depender apenas de documentação interna." }
] as const;

export const internalSources = [
  { id:"SRC-TJF-001", title:"TAIJIFU_MASTER_BLUEPRINT_v0.1", use:"Inventário histórico, Ciclo 1, princípios provisórios, Tai/Ji/Fu, artes estudadas e arquitetura inicial." },
  { id:"SRC-TJF-002", title:"TAIJIFU_MANIFESTO_v0.2", use:"Identidade, fundamento, filosofia, quatro Bases, claim types, simbologia e ética." },
  { id:"SRC-TJF-003", title:"TAIJIFU_FOUNDER_DECISIONS_2026-08-02", use:"Registro de decisões daquele estado histórico; decisões posteriores podem substituí-las sem apagar o registro." },
  { id:"SRC-TJF-004", title:"Manual / Ciclo 1 — linhagem histórica", use:"Proveniência curricular histórica. Binários finais não são tratados como recuperados quando não estão materializados." }
] as const;

export const claimTypes = [
  ["biblical-doctrinal","Fundamento bíblico-cristão"],
  ["taijifu-philosophical","Formulação própria do Taijifu"],
  ["historical-traditional","Conteúdo atribuído a uma tradição identificada"],
  ["symbolic-pedagogical","Metáfora para ensino, memória ou contemplação"],
  ["scientific-empirical","Afirmação dependente de evidência verificável"],
  ["fictional-ludic","Referência ficcional ou lúdica, quando aplicável fora do núcleo da plataforma"]
] as const;
