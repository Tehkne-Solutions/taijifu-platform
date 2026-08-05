export const learningCycle = [
  { id:"KNOW", order:1, title:"Conhecer", text:"Compreender conceitos, linguagem, função e contexto antes de executar." },
  { id:"PRACTICE", order:2, title:"Praticar", text:"Transformar conhecimento em experiência por tarefas, exercícios e prática orientada." },
  { id:"DEMONSTRATE", order:3, title:"Demonstrar", text:"Produzir evidência observável de competência, respeitando Safety e contexto." },
  { id:"TRANSFER", order:4, title:"Transferir", text:"Levar a competência para variações de parceiro, ambiente, pressão e Capacity State." },
  { id:"CONSOLIDATE", order:5, title:"Consolidar", text:"Revisitar, reter, refletir e sustentar competência ao longo do tempo." }
] as const;

export const integralMethod = {
  principle: "O Método Integral desenvolve atenção, respiração, imaginação, auto-observação, autorregulação, disciplina e reflexão como competências transversais da formação Taijifu.",
  bardonScope: "Franz Bardon é uma influência metodológica contemporânea de estudo por progressão disciplinada. O Taijifu não reproduz suas etapas exercício por exercício, não declara equivalência doutrinária e não transforma afirmações externas em fato canônico.",
  rules: [
    "Método Integral não substitui treino corporal, Safety, evidência nem avaliação técnica.",
    "A prática mental e respiratória deve permanecer proporcional ao contexto, à idade, à saúde e à capacidade atual.",
    "Progresso subjetivo pode gerar reflexão e registro, mas não concede promoção automática.",
    "As dez etapas acompanham a função pedagógica das dez faixas sem criar uma segunda hierarquia de graduação.",
    "Experiências pessoais são registradas como experiência do praticante, não como prova universal."
  ],
  stages: [
    { order:1, beltId:"BELT-WHITE", function:"Entrar", focus:"Presença e segurança interna", practices:["atenção ao corpo","respiração natural observada","auto-observação básica","registro simples de estado"] },
    { order:2, beltId:"BELT-YELLOW", function:"Perceber", focus:"Percepção e estabilidade atencional", practices:["atenção sustentada breve","percepção de tensão e relaxamento","observação de impulso e reação","respiração como referência"] },
    { order:3, beltId:"BELT-ORANGE", function:"Compreender", focus:"Clareza mental e relação causa–efeito", practices:["revisão reflexiva","imaginação funcional simples","identificação de padrões","separação entre sensação, interpretação e decisão"] },
    { order:4, beltId:"BELT-RED", function:"Manifestar", focus:"Intenção regulada em ação", practices:["definição consciente de intenção","respiração durante tarefa","recuperação após ativação","execução sem perda deliberada de controle"] },
    { order:5, beltId:"BELT-GREEN", function:"Conectar", focus:"Integração corpo–atenção–decisão", practices:["transição de foco","coordenação entre respiração e movimento","atenção ampla e focal","reflexão após sequências"] },
    { order:6, beltId:"BELT-CYAN", function:"Expandir", focus:"Flexibilidade cognitiva e imaginativa", practices:["variação consciente de perspectiva","visualização de alternativas","adaptação de estratégia","observação sem apego a uma única resposta"] },
    { order:7, beltId:"BELT-BLUE", function:"Sustentar", focus:"Continuidade sob fadiga e pressão", practices:["retorno ao centro atencional","controle respiratório não-forçado","monitoramento de degradação","recuperação deliberada"] },
    { order:8, beltId:"BELT-VIOLET", function:"Aprofundar", focus:"Autoconhecimento e investigação pessoal", practices:["diário de prática","hipóteses pessoais testáveis","revisão de vieses","refinamento de rotina"] },
    { order:9, beltId:"BELT-BROWN", function:"Governar", focus:"Disciplina, julgamento e responsabilidade", practices:["planejamento de ciclos","feedback responsável","limites de escopo","decisão ética sob incerteza"] },
    { order:10, beltId:"BELT-BLACK", function:"Sintetizar", focus:"Integração contínua e serviço", practices:["síntese transversal","prática autônoma responsável","transmissão com humildade epistemológica","revisão permanente do próprio método"] }
  ]
} as const;
