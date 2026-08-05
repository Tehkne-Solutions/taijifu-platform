export const influenceStatuses = [
  { id: "HISTORICAL_ORIGIN", title: "Origem histórica", text: "Referência documentada como parte da formação histórica ou genealógica do Taijifu." },
  { id: "FUNCTIONAL_INFLUENCE", title: "Influência funcional", text: "Fonte usada para compreender função, princípio, contexto ou problema de movimento sem incorporação automática ao Canon." },
  { id: "UNDER_STUDY", title: "Em estudo", text: "Referência submetida à Ciência Marcial/BMC para investigação, comparação e registro." },
  { id: "INCORPORATED", title: "Incorporada", text: "Elemento explicitamente aprovado por decisão canônica e integrado a Caminhos, Núcleos ou domínios oficiais." },
  { id: "REFERENCE_ONLY", title: "Referência", text: "Material útil para contraste, repertório ou pesquisa, sem status de conteúdo oficial Taijifu." }
] as const;

export const influenceDomains = [
  "Alcance e percussão",
  "Contato e controle",
  "Quedas e transições",
  "Solo e imobilização",
  "Armas e objetos",
  "Locomoção e obstáculos",
  "Ritmo, timing e coordenação",
  "Respiração, atenção e autorregulação",
  "Preparação física",
  "Pedagogia e método",
  "Safety e governança"
] as const;

export const influenceMatrix = [
  { id: "INF-TAIJIQUAN", source: "Taijiquan", provenance: "histórica", status: "HISTORICAL_ORIGIN", domains: ["Contato e controle", "Respiração, atenção e autorregulação", "Ritmo, timing e coordenação"], studiedElements: ["sensibilidade", "estrutura", "continuidade", "relaxamento funcional"], note: "Registrado como referência histórica associada à Base Tai; o Taijifu preserva identidade própria e não se apresenta como escola de Taijiquan." },
  { id: "INF-JIUJITSU", source: "Jiu-jitsu / grappling", provenance: "histórica e funcional", status: "FUNCTIONAL_INFLUENCE", domains: ["Contato e controle", "Quedas e transições", "Solo e imobilização", "Safety e governança"], studiedElements: ["controle posicional", "transições", "trabalho no solo", "sinalização de parada"], note: "Referência funcional para contato próximo e solo; elementos só são Taijifu quando explicitamente incorporados ao currículo canônico." },
  { id: "INF-BOXING", source: "Boxe", provenance: "funcional", status: "FUNCTIONAL_INFLUENCE", domains: ["Alcance e percussão", "Ritmo, timing e coordenação", "Preparação física"], studiedElements: ["distância", "timing", "deslocamento", "organização ofensivo-defensiva"], note: "Fonte de estudo para problemas de alcance, ritmo e economia de movimento, sem equivalência de regras esportivas." },
  { id: "INF-KALI", source: "Kali / Arnis / Eskrima filipino", provenance: "contemporânea", status: "UNDER_STUDY", domains: ["Armas e objetos", "Ritmo, timing e coordenação", "Contato e controle"], studiedElements: ["coordenação bilateral", "linhas de movimento", "transição objeto-mão", "ritmo"], note: "Referência contemporânea em estudo. Sua presença na matriz não significa incorporação automática de técnicas, nomenclaturas ou sistemas de armas ao Taijifu." },
  { id: "INF-CAPOEIRA", source: "Capoeira", provenance: "funcional e cultural", status: "REFERENCE_ONLY", domains: ["Locomoção e obstáculos", "Ritmo, timing e coordenação"], studiedElements: ["mobilidade", "ritmo", "mudança de nível", "movimento não linear"], note: "Referência de movimento e cultura corporal; qualquer incorporação futura exige proveniência e decisão canônica." },
  { id: "INF-PARKOUR", source: "Parkour", provenance: "contemporânea", status: "FUNCTIONAL_INFLUENCE", domains: ["Locomoção e obstáculos", "Preparação física"], studiedElements: ["adaptação ao ambiente", "eficiência locomotora", "obstáculos", "aterrissagem"], note: "Referência funcional principalmente para Artes Cinéticas e mobilidade ambiental, não uma arte marcial incorporada como bloco independente." },
  { id: "INF-GYMNASTICS", source: "Ginástica / acrobacia", provenance: "funcional", status: "REFERENCE_ONLY", domains: ["Locomoção e obstáculos", "Ritmo, timing e coordenação", "Preparação física"], studiedElements: ["coordenação", "orientação espacial", "controle corporal", "acrobacia progressiva"], note: "Referência para Artes Cinéticas e PFI; não cria uma graduação, modalidade ou trilha independente no Taijifu." },
  { id: "INF-BARDON", source: "Franz Bardon", provenance: "metodológica contemporânea", status: "FUNCTIONAL_INFLUENCE", domains: ["Respiração, atenção e autorregulação", "Pedagogia e método"], studiedElements: ["progressão disciplinada", "auto-observação", "atenção", "prática estruturada"], note: "Influência metodológica limitada. O Taijifu não afirma equivalência exercício por exercício, identidade doutrinária ou validação automática de afirmações externas." }
] as const;

export const influenceGovernance = [
  "Toda referência deve registrar proveniência, status e domínio funcional antes de aparecer como influência oficial.",
  "Estudar uma arte, método ou sistema não equivale a incorporar seu conteúdo ao Taijifu.",
  "A incorporação só ocorre por decisão canônica explícita e deve indicar onde o elemento passou a viver no currículo.",
  "Fontes históricas, funcionais, contemporâneas e apenas referenciais devem permanecer distinguíveis.",
  "A matriz de influências não substitui a genealogia das quatro Bases nem cria novos Caminhos ou Núcleos por si só.",
  "Quando houver incerteza histórica, o status deve permanecer como hipótese, reconstrução ou referência em vez de fato consolidado."
] as const;
