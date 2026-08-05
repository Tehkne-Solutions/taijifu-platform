export const graduationSystem = {
  principle: "A graduação do Taijifu representa desenvolvimento contínuo. O progresso permanece visível e aberto; a faixa não é tratada como um estado binário de concluído/não concluído.",
  dimensions: [
    { id: "BELT", title: "Faixa vigente", text: "Representa o estágio canônico principal do praticante na ordem oficial de dez faixas." },
    { id: "DEGREE", title: "Graus", text: "Registram progresso interno dentro da faixa vigente. Graus não criam uma nova faixa e não substituem avaliação formal." },
    { id: "BASES", title: "Bases Taijifu", text: "Mostram desenvolvimento relativo nas quatro Bases — Tai, Ji, Fu e Integração/Sobrevivência — sem transformar as Bases em graduações paralelas." },
    { id: "EVIDENCE", title: "Evidência", text: "Progresso visível deve estar associado a prática, checkpoints, Travessias e evidências quando aplicável; não concede promoção automática." }
  ],
  physicalBelt: {
    body: "preta",
    longitudinalLines: "linhas finas douradas de ponta a ponta",
    graduationEnd: "uma das pontas possui base dourada inspirada na área de graduação visual de faixas de jiu-jitsu",
    degreeMarkers: "os graus são aplicados nessa ponta dourada",
    currentLevel: "a faixa vigente deve permanecer identificável por marcador cromático compatível com a ordem oficial das faixas",
    baseIntegration: "a leitura visual pode integrar Tai, Ji, Fu e Integração/Sobrevivência sem substituir o marcador da faixa vigente nem os graus"
  },
  governance: [
    "Faixa, grau e desenvolvimento das Bases são dimensões relacionadas, mas distintas.",
    "O cliente/App pode exibir progresso, mas não pode conceder faixa ou grau oficial sozinho.",
    "A quantidade universal de graus por faixa não é fixada por este bloco enquanto não houver decisão canônica específica.",
    "A representação visual das Bases é informativa e pedagógica; não cria quatro currículos ou quatro hierarquias independentes.",
    "A progressão deve permanecer legível no Site Oficial, no App e em registros de avaliação."
  ]
} as const;

export const officialBeltOrder = ["Branca","Amarela","Laranja","Vermelha","Verde","Ciano","Azul","Violeta","Marrom","Preta"] as const;
