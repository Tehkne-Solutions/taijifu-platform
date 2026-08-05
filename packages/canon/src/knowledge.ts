export const manifestoValues = [
  { name: "Presença", text: "Perceber corpo, espaço, intenção e consequência antes de agir." },
  { name: "Adaptação", text: "Mudar sem perder identidade, centro ou finalidade." },
  { name: "Eficiência", text: "Usar ação suficiente, evitando desperdício e excesso." },
  { name: "Integração", text: "Unir alcance, contato, fluxo e sobrevivência em contexto." },
  { name: "Domínio próprio", text: "Governar impulso, ego, medo e potência." },
  { name: "Serviço à vida", text: "Proteger, ensinar, amadurecer e restaurar." }
] as const;

export const principles = [
  "Adapte-se ao espaço disponível.",
  "Perceba antes de agir.",
  "Preserve equilíbrio, respiração e consciência.",
  "Use a menor ação capaz de resolver o problema.",
  "Não permaneça em uma distância que deixou de existir.",
  "Conecte defesa, transição e saída.",
  "Controle a estrutura antes de disputar força.",
  "Mantenha técnica e intenção proporcionais ao risco.",
  "Treine respostas, não coreografias vazias.",
  "Conheça a falha, a defesa e a contramedida de cada técnica.",
  "Evolua sem transformar tradição em dogma.",
  "Preserve a vida, a integridade e a responsabilidade do praticante."
] as const;

export type KnowledgeSection = { title: string; body: string; items?: readonly string[] };
export type KnowledgePage = { slug: string; title: string; eyebrow: string; summary: string; sections: readonly KnowledgeSection[] };

export const knowledgePages: readonly KnowledgePage[] = [
  {
    slug: "ciencia-marcial",
    title: "Ciência Marcial",
    eyebrow: "Investigar",
    summary: "O domínio que investiga sistematicamente prática, aprendizagem, eficácia, risco, adaptação e transferência no Taijifu.",
    sections: [
      { title: "Função", body: "A Ciência Marcial transforma perguntas de prática em investigação organizada. Tradição não é evidência suficiente; novidade também não." },
      { title: "Ciclo BMC", body: "BMC é o nome oficial do sistema operacional contemporâneo de investigação, revisão, replicação e governança de conhecimento.", items: ["Observar", "Perguntar", "Investigar", "Registrar", "Replicar", "Revisar", "Decidir", "Monitorar"] },
      { title: "Context Lock", body: "Conclusões só fazem sentido dentro do contexto em que foram observadas: população, experiência, ambiente, regras, equipamento, intensidade, restrições e objetivo." }
    ]
  },
  {
    slug: "artes-cineticas",
    title: "Artes Cinéticas",
    eyebrow: "Mover",
    summary: "Estudo e desenvolvimento intencional do movimento humano para além da função combativa imediata.",
    sections: [
      { title: "Domínios", body: "O Taijifu organiza as Artes Cinéticas como uma linguagem transversal de movimento.", items: ["Movement Literacy", "Locomoção", "Eixo e rotação", "Quedas", "Ground Movement", "Ritmo", "Acrobacia", "Parkour e obstáculos", "Expressão cinética"] },
      { title: "Integração", body: "Artes Cinéticas não formam um currículo concorrente. Elas atravessam Caminhos e Núcleos conforme função, nível de risco e objetivo pedagógico." }
    ]
  },
  {
    slug: "pfi",
    title: "PFI",
    eyebrow: "Preparar",
    summary: "Sistema Taijifu de organização e desenvolvimento das capacidades físicas relevantes à prática, robustez, funcionalidade e longevidade.",
    sections: [
      { title: "Capacidades", body: "PFI organiza capacidades, não uma modalidade esportiva específica.", items: ["Força", "Potência", "Capacidade aeróbica", "Condicionamento integrado", "Calistenia", "Mobilidade funcional", "Equilíbrio", "Coordenação", "Robustez", "Recuperação"] },
      { title: "Ferramentas", body: "Musculação, treinamento aeróbico, métodos funcionais, calistenia, corrida, bicicleta, remo, pesos livres, máquinas, kettlebells e circuitos podem ser usados como ferramentas. Nenhum deles é sinônimo de PFI." }
    ]
  },
  {
    slug: "metodo-integral",
    title: "Método Integral",
    eyebrow: "Regular",
    summary: "Desenvolvimento de atenção, concentração, respiração, imaginação, auto-observação, autorregulação e reflexão integrado à formação marcial.",
    sections: [
      { title: "Prática", body: "O Método Integral conecta consciência, disciplina e reflexão ao processo técnico sem substituir treino corporal ou evidência." },
      { title: "Bardon", body: "Franz Bardon é influência contemporânea de estudo com escopo genealógico limitado. O Taijifu não alega equivalência literal exercício por exercício nem adota promessas externas como fato canônico." }
    ]
  },
  {
    slug: "safety",
    title: "Safety",
    eyebrow: "Preservar",
    summary: "Safety prevalece sobre qualquer objetivo pedagógico, técnico, competitivo ou hierárquico.",
    sections: [
      { title: "Hard Stop", body: "Tap físico ou verbal significa parar imediatamente. Stop Response e Control Capacity são competências técnicas, não formalidades." },
      { title: "Escopo", body: "Cabeça, pescoço, quedas, grappling, submissões, instrumental, PFI, Kids e Lifetime exigem progressão de risco adequada." },
      { title: "Governança", body: "Incidentes e Near Misses relevantes devem ser registrados. Ocultar incidente para proteger reputação, instrutor, dojo ou evento é falha grave de governança." }
    ]
  },
  {
    slug: "kids-youth",
    title: "Kids & Youth",
    eyebrow: "Desenvolver",
    summary: "Uma View do mesmo Canon, adaptada ao desenvolvimento sem criar uma arte separada.",
    sections: [
      { title: "Estágios", body: "A progressão pedagógica adapta linguagem, tarefa, intensidade e responsabilidade.", items: ["K0 — Exploradores", "K1 — Movimentadores", "K2 — Construtores", "Y1 — Desenvolvedores", "Y2 — Transição"] },
      { title: "Safeguarding", body: "Proteção de crianças e jovens vai além de Safety físico e inclui relações de poder, conduta, ambiente e credenciais adequadas de ensino." }
    ]
  },
  {
    slug: "lifetime",
    title: "Lifetime",
    eyebrow: "Continuar",
    summary: "Arquitetura de continuidade da prática ao longo da vida, preservando função, aprendizagem e identidade.",
    sections: [
      { title: "Fases", body: "A adaptação muda implementação, não valor ou identidade marcial.", items: ["LT1 — Construir", "LT2 — Desenvolver", "LT3 — Sustentar", "LT4 — Adaptar", "LT5 — Transmitir"] },
      { title: "Capacidade", body: "Capacity State representa o estado funcional atual e não é igual à graduação histórica. Envelhecimento, recuperação ou limitação não apagam automaticamente faixa ou conhecimento." }
    ]
  }
] as const;

export const historyMilestones = [
  { label: "Origem", text: "Taijifu se consolida como arte marcial brasileira voltada à adaptação, eficiência e fluidez." },
  { label: "Primeiras bases", text: "Tai, Ji e Fu organizam influências funcionais; Integração/Sobrevivência amadurece como quarta Base própria." },
  { label: "Currículo", text: "A estrutura de 32 Caminhos é preservada e a arquitetura contemporânea organiza 128 Núcleos." },
  { label: "Canon 1.0", text: "Dez faixas, quatro Bases, 32 Caminhos e 128 Núcleos passam a compor a primeira publicação canônica unificada." },
  { label: "Plataforma", text: "O site passa a ser a fonte oficial de conhecimento e o App/Academy a superfície de estudo e prática." }
] as const;
