# Taijifu Platform

Plataforma oficial do Taijifu.

## Objetivo central

A plataforma possui duas responsabilidades principais:

1. **ser a fonte oficial de informação, documentação e conhecimento do Taijifu**;
2. **oferecer o App/Academy para estudo, treino orientado, prática, evidências e progressão do praticante**.

Jogos, produtos paralelos e experiências externas ao Taijifu Platform não fazem parte deste repositório e não participam da progressão marcial real.

## Source of Truth

O Canon é a fonte de verdade da plataforma. Site oficial, Academy/App, Dojo, Admin e IA consomem as mesmas entidades versionadas.

### Canon 1.0

- 4 Bases
- 10 faixas
- 32 Caminhos
- 128 Núcleos
- Preta sintetiza C01–C32 / N001–N128

## Arquitetura de produto

```text
CANON / KNOWLEDGE GRAPH
        │
        ├── SITE OFICIAL
        │   └── informação, manifesto, método, faixas, Caminhos, Núcleos, ciência, história e referências
        │
        └── APP / ACADEMY
            └── aprender, praticar, registrar, revisar, demonstrar, transferir e evoluir
```

### Site oficial — prioridade máxima

O site é a superfície pública de referência do Taijifu. Deve tornar todo o conhecimento oficial pesquisável, navegável, versionado e compreensível.

Áreas principais:

- Manifesto e identidade;
- história e proveniência;
- quatro Bases;
- 12 Princípios;
- dez faixas;
- 32 Caminhos;
- 128 Núcleos;
- Ciência Marcial;
- Artes Cinéticas;
- PFI;
- Método Integral;
- Kids & Youth;
- Lifetime;
- Safety;
- formação e governança;
- glossário, referências e changelog do Canon.

### App / Academy — prática

O App transforma o mesmo Canon em experiência prática:

```text
Faixa
→ Caminho
→ Núcleo
→ Lição
→ Prática guiada
→ Checkpoint
→ Evidência/reflexão
→ Transferência
→ Travessia
→ Avaliação autorizada
```

XP, conclusão de conteúdo ou uso do aplicativo não concedem faixa automaticamente.

## Camadas de suporte

- **Evidence:** registra prática, reflexão, avaliação e Travessias.
- **Dojo Workspace:** organiza turmas, sessões, presença, Safety e avaliação presencial.
- **IA Taijifu:** explica e recupera conhecimento sempre subordinada ao Canon vigente.
- **Community:** recurso complementar de troca entre praticantes; não é o objetivo central da plataforma e não concede autoridade marcial.

## Fora do escopo deste repositório

- jogos;
- progresso de jogos;
- achievements externos;
- integrações de XP lúdico;
- produtos comerciais independentes;
- qualquer ponte que converta experiência externa em graduação Taijifu.

Integrações futuras, se necessárias, devem existir nos produtos externos e consumir apenas interfaces públicas/documentadas da plataforma, sem entrar no núcleo do Canon ou da progressão.

## Validação

```bash
npm run validate
pnpm typecheck
pnpm build
```

## Prioridades atuais

1. completar o **Site Oficial / Canon Explorer**;
2. aprofundar o **App de prática** além da Faixa Branca;
3. completar Evidence e experiência de Travessia;
4. consolidar busca, glossário, referências e histórico de versão;
5. melhorar UX mobile-first para treino;
6. somente depois expandir recursos complementares.

Assinatura institucional: **Tehkné Solutions**.
