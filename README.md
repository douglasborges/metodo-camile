# Método ET · Camile · CGU 2026

Build atual: **1.4.0-cgu-books** (família v1.4).

Aplicação independente da Camile para o pós-edital da **CGU — Auditor Federal de Finanças e Controle · Especialidade Auditoria**, sem apagar o histórico anterior e preservando o TCU como objetivo secundário de longo prazo.

## Prazo e carga

- **Prova:** 13/12/2026.
- **Referência diária:** 5h líquidas.
- **Meta semanal:** 30h líquidas.
- **Metas ET:** 8 metas semanais de 30h, de 13/10 a 07/12.
- **Sprint final:** 08/12 a 12/12.
- Tempo real sempre prevalece: a duração de referência não é uma cota artificial.

## Arquitetura de prioridades v1.4

### Ciclo prioritário
**AFO/Finanças → Auditoria → Administração Pública → DCON → DAD**

Cada Meta prevê:
- **4 voltas** do ciclo prioritário = 20 ocorrências;
- **1 ocorrência semanal** de Políticas Públicas;
- **1 ocorrência semanal** de TI/Dados;
- **1 ocorrência semanal** de Português;
- 30h reais para fechamento da Meta.

A referência de planejamento é aproximadamente 24h no ciclo prioritário + 3h de manutenção + restante para legislação, questões, checkpoints e variação real.

### Fases
1. **Fase 1 · AFO / Finanças Públicas** — prioridade máxima.
2. **Fase 2 · Auditoria** — prioridade máxima.
3. **Fase 3 · Administração Pública + DCON + DAD** — prioridade alta.
4. **Fase 4 · Sociedade Brasileira / Diversidade** — prioridade final, `active=false`, fora do ciclo atual.

Português, TI/Dados e Políticas Públicas permanecem cadastrados e ativos em manutenção semanal.

## Plano mestre de materiais

### AFO / Finanças / Contabilidade Pública
- **Leandro Ravyelle · BizurAFO** primeiro.
- **Celso Natale** somente nas lacunas de A2.1.
- **Gilmar Possati** somente em A2.4–A2.6.
- A2.7 continua como lacuna controlada.
- BizurAFO M13 permanece fora do primeiro giro; M16 é diagnóstico/opcional.

### Auditoria
- **Marcelo Soares** é a base principal e vem antes de complementos.
- Depois de Marcelo: Direção/TSE para papéis, testes, amostragem, execução, evidências e achados; comunicação/relatório/monitoramento apenas se necessário.
- NBC TA/IPPF somente em lacuna concreta.
- **Não usar Auditoria Governamental do Estratégia.**
- Ramon complementa A1.5 no recorte Dados/IA.

### Livro · Compliance e Integridade no Setor Público e Privado
**Pacelli / Francisco Netto · 2026**

Leitura dirigida comum:
**cap. 2 → 5 → 6 → 7 → 8 → 9 → 10 → 15 → 16 → 17 → 24 → 26 → 28**

Camile acrescenta:
**cap. 12 → 13 → 19 → 20 → 25 → 27**

O livro entra nos recortes de integridade, transparência, ouvidoria e responsabilização; não deve ser lido linearmente como novo curso integral.

### Livro · Como Combater a Corrupção em Licitações · 2024
Rota da Camile:
**cap. 2 → 3 → 6 → 4 → 5**

Dependências:
- entrar depois da base de **Rafael U12 · Licitações e Contratos** e do conteúdo correspondente de Auditoria;
- **capítulo 4 somente depois da base Marcelo em Auditoria**;
- usar principalmente para A4 e conexões A1/A5.

### Administração Pública / Governança / Ética
- **Marcelo** no núcleo de Administração Pública.
- **Pacelli/Francisco Netto** nos capítulos dirigidos.
- Direção apenas para lacunas de Estado/capacidades, valor público, corrupção/captura, governança, riscos e integridade.
- Herbert/Estratégia, quando necessário, para LAI, LIA, LGPD, Lei 9.784/1999, Lei 12.813/2013 e LINDB/Decreto 9.830.

### Direito Constitucional
- **Nelma Fontana** principal.
- **Art. 5º pelo Estratégia**, em 24 videoaulas.
- Progresso histórico preservado.

### Direito Administrativo
- **Rafael Oliveira** principal.
- Camile acrescenta **U12 Licitações/Contratos** e **U8 PPP seletivo**.
- **Herbert Almeida / Estratégia** apenas para atualização e lacunas legislativas.

### Políticas Públicas
- **Estratégia** como fonte principal.
- **Marcelo Soares** apenas seletivamente.
- Não usar Direção nesta disciplina.
- Não adquirir/reabrir curso próprio do Rodrigo Rennó.

### TI / Dados
- **Ramon · TI TOTAL**, rota CGU:
  **FD01 → TI60 → TI63 → TI83 → Monitoria 36 → TI37-I → TI36 → TI61 → TI35 → TI97**.
- TI07 e TI62 ficam em reserva.
- Uma ocorrência semanal na fase atual.

### Português
- **Marcello Giulian** principal.
- **Andresan** para questões Cebraspe.
- Uma ocorrência semanal de manutenção.

### Sociedade Brasileira / Diversidade
- **Direção · bloco B2 integral**.
- Fase 4, prioridade FINAL, fora do ciclo prioritário enquanto as cinco matérias centrais ainda exigirem avanço.

## Check do edital

Os identificadores **B1, C1, A1, CD1 etc. são códigos internos da matriz**, não siglas oficiais da CGU/Cebraspe. A interface v1.4 exibe primeiro:
- prova/bloco;
- nome real da disciplina;
- item do conteúdo;
- código interno apenas como referência técnica.

## Legislação Seca

**30 min por dia**, mantendo o rodízio atual:
- Dia 1: CF/88 + LAI.
- Dia 2: Legislação CGU + LGPD.

A legislação entra nas 30h reais. A revisão noturna permanece separada.

## Preservação e sincronização

- LocalStorage: `metodo-et:camile:v1`
- Backup vivo: `Metodo ET - Camile - Dados.json`
- Propriedade Drive: `camile-cloud-v1`
- **GOAL_PLAN_VERSION permanece 3:** a v1.4 remodela a rota sem zerar Meta, horas ou histórico.
- Migração do ciclo usa `CYCLE_PLAN_VERSION` para apontar o aparelho ao novo ciclo sem confundir índice antigo.
- Branch de segurança: `backup-2026-10-13-pre-v1.4-books`.
- A aba **Dados** mostra o build realmente carregado no aparelho.
- A PWA consulta `version.json` sem cache e força atualização quando um build novo é publicado.

🌻 **Prioridade clara, material certo, sem duplicação — uma Meta por vez até a CGU.**
