// Plano mestre de materiais · Camile · CGU 2026 · Auditoria
// Versão v1.6.1 · correção AFO/CPU de 16/10/2026.
// Regra-mestra: UM TÓPICO DO EDITAL = UMA FONTE PRINCIPAL.
// Complemento só entra depois da fonte principal; pacote paralelo não repete teoria já coberta.
// O histórico individual deve ser preservado quando a fonte/material muda.

export const PHASE_PLAN=Object.freeze([
 {id:'fase-1',label:'Fase 1 · Núcleo prioritário',subjects:['afo','auditoria','adm-publica','dcon','dad'],priority:'MÁXIMA',active:true,rule:'Entram desde já no ciclo; não esperar concluir uma disciplina inteira para iniciar a seguinte.'},
 {id:'fase-2',label:'Fase 2 · P3 e fechamento comum',subjects:['politicas','ti','afo','auditoria','adm-publica'],priority:'ALTA',active:true,rule:'Políticas Públicas/Avaliação, Integridade/Transparência e Dados/IA comum entram à medida que a base da Fase 1 amadurece.'},
 {id:'fase-3',label:'Fase 3 · Complementos institucionais',subjects:['adm-publica','auditoria','dcon','dad'],priority:'SELETIVA',active:true,rule:'Estado/Democracia, Ética aplicada, Organização/Competências CGU e lacunas Direção; não duplicar fontes-base.'},
 {id:'fase-4',label:'Fase 4 · CPU + Sociedade Brasileira / Diversidade',subjects:['cpu','diversidade'],priority:'FINAL',active:false,rule:'Contabilidade Pública com Pacelli e Sociedade Brasileira/Diversidade ficam juntas para o final, depois dos blocos de maior retorno.'}
]);

export const SPECIAL_LAWS=Object.freeze([
 {id:'lei-9784',title:'Lei 9.784/1999',source:'Estratégia/Herbert · Processo Administrativo',use:'Fechamento normativo de B3.3.2/C3.2/A5; depois de Rafael U11.'},
 {id:'lia',title:'Lei 8.429/1992 · LIA',source:'Estratégia/Herbert · Improbidade Administrativa',use:'Fechamento normativo de C3.4/A5.5; depois de Rafael U20.'},
 {id:'conflito',title:'Lei 12.813/2013 · Conflito de Interesses',source:'Estratégia/Herbert · Improbidade + Conflito',use:'B3.3.1/A5.4.4; depois, Pacelli cap. 10.'},
 {id:'lai',title:'Lei 12.527/2011 · LAI',source:'Estratégia/Herbert · LAI + Dados Abertos',use:'Fonte legal de C2.1/C2.4/A5.2; depois, Pacelli caps. 8/9.'},
 {id:'lgpd',title:'Lei 13.709/2018 · LGPD',source:'Estratégia · aula LGPD do pacote CGU',use:'Fonte legal de C2.2/C4.4/A5.2; depois, Pacelli cap. 26.'},
 {id:'lindb',title:'LINDB + Decreto 9.830/2019',source:'Estratégia · Direito Administrativo · itens 14 a 16',use:'Complemento obrigatório de C3.1 depois de Rafael U10.'}
]);

export const INSTITUTIONAL_ROUTES=Object.freeze([
 {
  id:'organizacao-cgu',
  title:'Estratégia · Organização, Competências e Sistemas da CGU',
  order:'A02 Lei 10.180 → A03 Decreto 3.591 seletivo → A05 SisOuv → A06 SITAI/Integridade → A00/A01 síntese de competências → A04 Correição seletivo',
  use:'C3/C5.5 e integração institucional.',
  avoid:'Curso Estratégia “Legislação” pré-edital fica como reserva/lei seca; não fazer segunda teoria.'
 },
 {
  id:'etica-integridade',
  title:'Ética / Integridade / Transparência',
  order:'Estratégia Ética A01 (Dec. 1.171) → A02 (Dec. 6.029) → Código de Conduta CGU → Herbert nas leis especiais → Pacelli/Netto nos capítulos selecionados',
  use:'B3/C1/C2/C3/A5.',
  avoid:'Direção C1/C2 só entra se restar lacuna nominal.'
 }
]);

export const BOOK_ROUTES=Object.freeze([
 {
  id:'compliance-integridade-2026',
  title:'Compliance e Integridade no Setor Público e Privado',
  authors:'Giovanni Pacelli + Francisco Netto',
  edition:'3ª ed. · 2026',
  subjects:['adm-publica','auditoria'],
  rule:'Leitura dirigida obrigatória. Ativar após a base normativa correspondente; não ler as 656 páginas linearmente.',
  chapters:[
   {number:2,topic:'Conceitos essenciais dos programas de compliance e integridade',track:'principal',codes:['C1.2','C1.3','C1.5'],priority:'ALTA'},
   {number:5,topic:'Visão geral das instâncias responsáveis pelas funções de integridade',track:'principal',codes:['C1.1','C5.5'],priority:'ALTA'},
   {number:6,topic:'Promoção da ética nas organizações',track:'principal',codes:['B3.1','B3.2','B3.5'],priority:'MÉDIA-ALTA · após Ética A01/A02'},
   {number:7,topic:'Ouvidoria e tratamento de denúncias',track:'principal',codes:['C2.3','C3.5','C5.5','A5.3'],priority:'ALTÍSSIMA'},
   {number:8,topic:'Acesso à informação',track:'principal',codes:['C2.1','A5.2'],priority:'ALTA · após Herbert/LAI'},
   {number:9,topic:'Promoção da transparência ativa',track:'principal',codes:['C2.1','C2.4','A5.2'],priority:'ALTA'},
   {number:10,topic:'Prevenção do conflito de interesses',track:'principal',codes:['B3.3.1','A5.4.4'],priority:'ALTÍSSIMA · após Herbert'},
   {number:15,topic:'Unidade de Gestão da Integridade e seu papel matricial',track:'principal',codes:['C1.2','C1.3','C1.5','C5.5'],priority:'ALTA'},
   {number:16,topic:'Elaboração e implementação de programa de integridade no setor público',track:'principal',codes:['C1.3','C1.5','A5.4'],priority:'ALTA'},
   {number:17,topic:'Monitoramento de programa de integridade no setor público',track:'principal',codes:['C1.5','C5.5','A5.7'],priority:'ALTA'},
   {number:24,topic:'Prevenção e enfrentamento do assédio e da discriminação',track:'principal',codes:['B3.4','C3.5','A5.3'],priority:'ALTÍSSIMA'},
   {number:26,topic:'Proteção aos dados pessoais',track:'principal',codes:['C2.2','C4.4','A5.2','A5.3'],priority:'ALTA · após LGPD'},
   {number:28,topic:'Participação social e organizações da sociedade civil na promoção da integridade',track:'principal',codes:['C2.4','B1.8'],priority:'MÉDIA-ALTA'},
   {number:12,topic:'Procedimentos de responsabilização',track:'camile',codes:['C3.4','A5.5','A5.6'],priority:'ALTA · após DAD/Processo'},
   {number:13,topic:'Controle interno e auditoria interna sob a perspectiva da integridade',track:'camile',codes:['C5.5','A5.1','A5.7'],priority:'SELETIVO · depois do Marcelo'},
   {number:19,topic:'Programa de integridade para empresas com relações negociais com o poder público',track:'camile',codes:['C1.4','A5.4','A5.5'],priority:'ALTA'},
   {number:20,topic:'Programa de integridade privado: elaboração ao monitoramento',track:'camile',codes:['C1.4','A5.4'],priority:'ALTA'},
   {number:25,topic:'Liderança organizacional e implementação do programa de integridade',track:'camile',codes:['C1.3','C1.5','A5.4'],priority:'MÉDIA'},
   {number:27,topic:'Due diligence e sua importância para ética e integridade',track:'camile',codes:['C1.4','A5.4.2'],priority:'MÉDIA-ALTA'},
   {number:22,topic:'Economia comportamental aplicada à integridade',track:'reserva',codes:['B1.7'],priority:'RESERVA · não entra na primeira volta'},
   {number:29,topic:'Fomento à integridade por políticas públicas',track:'reserva',codes:['B1','A3'],priority:'RESERVA · revisão transversal'}
  ]
 },
 {
  id:'corrupcao-licitacoes-2024',
  title:'Como Combater a Corrupção em Licitações',
  authors:'Franklin Brasil Santos + Kleberson Roberto de Souza',
  edition:'4ª ed. · 2024',
  subjects:['auditoria'],
  rule:'Fonte aplicada de A4 e complemento A1/A5. Entrar depois de Rafael U12; capítulo 4 somente depois da base de Auditoria do Marcelo.',
  chapters:[
   {number:1,topic:'Conceitos básicos',track:'rápida',codes:['A4'],priority:'LEITURA RÁPIDA'},
   {number:2,topic:'Tipologia de fraudes em licitação',track:'principal',codes:['A4.1.1','A4.4.1'],priority:'OBRIGATÓRIO'},
   {number:3,topic:'Técnicas de detecção de fraudes',track:'principal',codes:['A4.4.1','A1.3','A1.5'],priority:'OBRIGATÓRIO'},
   {number:6,topic:'Prevenção de fraudes em licitação',track:'principal',codes:['A4.1.1','A4.4.1','C1.2'],priority:'OBRIGATÓRIO'},
   {number:4,topic:'Elaboração dos achados',track:'principal',codes:['A1.4.1','A4.5.1','C5.3'],priority:'OBRIGATÓRIO · depois do Marcelo'},
   {number:5,topic:'Responsabilização',track:'camile',codes:['A4.5.1','A5.5'],priority:'SELETIVO · após DAD/Responsabilização'}
  ]
 }
]);

export function bookRoutesFor(subjectId){
 return BOOK_ROUTES.filter(book=>book.subjects.includes(subjectId));
}

export const GAP_REGISTER=Object.freeze([
 {code:'A3.7',gap:'Ética da investigação',action:'Permanece pendente; usar somente material pós-edital específico quando localizado.',priority:'GAP CONTROLADO'},
 {code:'A5.6',gap:'PAD/PAR, prescrição, dosimetria, leniência, TAC e coordenação de instâncias',action:'Permanece pendente; fechamento jurídico pós-edital prioritário, sem inventar cobertura.',priority:'GAP JURÍDICO PRIORITÁRIO'}
]);

export const DEFERRED_MATERIALS=Object.freeze([
 {code:'CPU',label:'Contabilidade Pública',status:'FASE FINAL',futureSource:'Giovanni Pacelli',rule:'Estudar somente na Fase 4, junto com Sociedade Brasileira/Diversidade. Videoaulas: módulos 6, 7, 8, 13, 14 e 15.'}
])

export const MATERIAL_PLAN=Object.freeze({
 port:{
  label:'Português',
  phase:'Manutenção transversal',priority:'MANUTENÇÃO',active:true,
  principal:['Marcello Giulian · curso principal · continuar do ponto real'],
  complement:['Andresan · questões Cebraspe por assunto'],
  books:[],
  avoid:['Não reabrir teoria equivalente do Estratégia/Direção enquanto Marcello cobrir o assunto.'],
  order:'Marcello → questões Andresan → lacuna objetiva somente se aparecer.'
 },
 dcon:{
  label:'Direito Constitucional',
  phase:'Fase 1',priority:'ALTA',active:true,
  principal:[
   'Nelma A01 → Estratégia/Nelma A03 Teoria dos Direitos → Estratégia A04 Art. 5º (24 vídeos + exercícios) → Nelma Cebraspe A03 Direitos Sociais → A04 Direitos Políticos → A05 Organização do Estado → A06 seletivo → A08 Fiscalização/Executivo → A09 seletivo → A15 Ordem Econômica'
  ],
  complement:['Material pós-edital apenas para capacidades, coordenação federativa e modelos de desenvolvimento que extrapolem a base constitucional.'],
  books:[],
  avoid:['Pular Nelma A02, A07 e A10-A14.','Nelma A16 fica em reserva.','Não repetir em pacote geral conteúdo já fechado.'],
  order:'Seguir a rota acima; Art. 5º só fecha após 24 vídeos + exercícios.'
 },
 afo:{
  label:'AFO / Finanças Públicas',
  phase:'Fase 1',priority:'MÁXIMA',active:true,
  principal:[
   'Leandro Ravyelle · BizurAFO · única trilha de AFO da Camile: M1 → M2 → M3 → M4 → M6 → M7 → M8/M9 → M10 somente RAP → M11 → M13 → M14 seletivo → M15 → questões.'
  ],
  complement:['Questões Cebraspe e revisão do próprio BizurAFO depois da teoria correspondente.'],
  books:[],
  avoid:[
   'Não adicionar segunda trilha de AFO em paralelo.',
   'M5 e M12 não integram a rota atual; M10 é somente RAP; M14 é seletivo.',
   'Contabilidade Pública é disciplina separada e só entra na Fase 4 com Giovanni Pacelli.'
  ],
  order:'BizurAFO, na ordem definida → questões/revisão. Nenhuma trilha paralela de AFO.'
 },
 ti:{
  label:'Fundamentos de Evidências, Dados e IA',
  phase:'Fase 2',priority:'MANUTENÇÃO ALTA',active:true,
  principal:[
   'Estratégia · Lucas Ianni · Fundamentos de Evidência, Dados e IA para C4.1 e recorte comum C4.2-C4.5.',
   'Ramon · TI TOTAL · fonte técnica individual da Camile, sobretudo C4.2-C4.3, C4.5 e A1.5.',
   'Estratégia pós-edital · Integridade da Informação para C2.5/C4.4 quando aderente ao item.'
  ],
  complement:[
   'Herbert LGPD + Pacelli cap. 26 em C4.4.',
   'Marcelo no contexto de evidência/auditoria.',
   'Estatística entra em C4.2-C4.3 conforme o material técnico já adotado; o Plano Mestre não fixa professor específico.'
  ],
  books:[],
  avoid:['Não transformar a trilha em curso técnico amplo desconectado da CGU.','TI07 e TI62 continuam em reserva no primeiro giro.'],
  order:'Lucas Ianni recorte comum + Ramon rota CGU: FD01 → TI60 → TI63 → TI83 → Monitoria 36 → TI37-I → TI36 → TI61 → TI35 → TI97 → lacunas.'
 },
 'adm-publica':{
  label:'Administração Pública / Governança / Ética / Integridade',
  phase:'Fase 1 + Fases 2/3',priority:'ALTA',active:true,
  principal:[
   'Marcelo Soares · Faixa Preta Cebraspe: Evolução APU T01-T03 + questões Reforma Burocrática/Gerencial → Governança T01/T02 → Gestão para Resultados → Planejamento (conceito/princípios + tipos) → Excelência T01/T02 → Transparência/Accountability.',
   'Estratégia Ética A01/A02 + Código de Conduta CGU + Herbert nas leis especiais.',
   'Pacelli/Netto · leitura dirigida de Integridade/Transparência.'
  ],
  complement:[
   'B1/Estado/Democracia: Direção apenas nas lacunas nominais; Nelma/PP conforme item.',
   'Estratégia pós-edital · Serviços Públicos, Transformação Digital e IA para B4.5, somente no recorte do edital.',
   'Organização/Competências CGU: A02 → A03 seletivo → A05 → A06 → A00/A01 → A04 seletivo.'
  ],
  books:['Pacelli/Netto · capítulos rastreados na app, ativados pela base normativa correspondente.'],
  avoid:['Direção B4 Gestão por Resultados/Governança/Planejamento = duplicado.','TGA/Projetos/Processos completos = reserva TCU.','Não reiniciar Administração Pública por pacote genérico.'],
  order:'Marcelo na sequência final → Ética/leis especiais → Pacelli/Netto → complementos institucionais seletivos.'
 },
 cpu:{
  label:'Contabilidade Pública',
  phase:'Fase 4',priority:'FINAL / BAIXA',active:false,
  principal:[
   'Giovanni Pacelli · Contabilidade Pública · videoaulas dos módulos 6, 7, 8, 13, 14 e 15.'
  ],
  complement:['Questões e revisão somente depois das videoaulas selecionadas.'],
  books:[],
  avoid:[
   'Não iniciar CPU antes da Fase 4.',
   'Não estudar curso completo de CPU: usar somente os módulos selecionados.'
  ],
  order:'M06 → M07 → M08 → M13 → M14 → M15 → questões/revisão.'
 },
 diversidade:{
  label:'Sociedade Brasileira, Desigualdades, Diversidade e Desenvolvimento',
  phase:'Fase 4',priority:'FINAL / BAIXA',active:false,
  principal:['Direção · Sociedade Brasileira, Desigualdades, Diversidade e Desenvolvimento · bloco B2 integral'],
  complement:['Questões Cebraspe e revisão do próprio material'],
  books:[],
  avoid:['Nenhum outro curso agora.','Não consumir horas do núcleo prioritário antes da Fase 4.'],
  order:'FASE FINAL / active=false → estudar em paralelo com CPU/Pacelli → Direção B2 → questões → revisão.'
 },
 dad:{
  label:'Direito Administrativo',
  phase:'Fase 1',priority:'ALTA',active:true,
  principal:[
   'Rafael Oliveira · U2 Organização → U3 Administração Indireta → U7 Consórcios → U17 Agentes → U10 Atos → U11 Processo → U19 Controle → U6 Usuário.',
   'Seletivos: U1, U4, U9, U20, U22.',
   'Camile acrescenta U12 Licitações/Contratos e U8 PPP seletivo.'
  ],
  complement:[
   'Lei 9.784/1999 depois de Rafael U11.',
   'LIA/Lei 8.429 + Conflito de Interesses; LAI; LGPD; LINDB + Decreto 9.830 conforme SPECIAL_LAWS.'
  ],
  books:[],
  avoid:['Não refazer DAD integral pelo Direção/Estratégia.','Herbert/Estratégia são fechamento normativo, não professor-base.'],
  order:'Rafael na rota final → U12 + U8 seletivo → leis especiais no ponto correspondente.'
 },
 politicas:{
  label:'Políticas Públicas e Avaliação',
  phase:'Fase 2',priority:'MANUTENÇÃO ALTA',active:true,
  principal:[
   'Estratégia · Rodrigo Rennó · PP Aula 01 → PP Aula 02.',
   'Estratégia pós-edital · Arranjos Institucionais → Intersetorialidade → Instrumentos → Avaliação Ex Ante → Avaliação de Políticas Públicas/Comissão (2 aulas) → Avaliação Ex Post.',
   'Depois: CMAP seletivo → Passo A01/A02 → simulados.'
  ],
  complement:['PP A03/A04 apenas como reaproveitamento em B1 (intermediação/corrupção), não como segunda teoria de Políticas Públicas.'],
  books:[],
  avoid:['Políticas Públicas é exclusivamente Estratégia na rota atual.','Não usar curso do site próprio do Rodrigo Rennó.','Não usar Direção PP se o conteúdo já estiver coberto.'],
  order:'PP A01 → A02 → Arranjos Institucionais → Intersetorialidade → Instrumentos → Ex Ante → Avaliação Comissão 1/2 → Ex Post → CMAP seletivo → Passo A01/A02 → simulados.'
 },
 auditoria:{
  label:'Auditoria Governamental / Contratações / Integridade aplicada',
  phase:'Fase 1 + Fases 2/3',priority:'MÁXIMA',active:true,
  principal:[
   'Marcelo Soares · Auditoria CGU: AIG → Avaliação → Consultoria → Apuração → Objetividade → PGMQ → PAINT → Planejamento Individual T1/T2 → demais módulos Marcelo conforme liberados.',
   'Ramon TI TOTAL em A1.5.',
   'Rafael U12 + livro Como Combater a Corrupção em Licitações para A4.',
   'Pacelli/Netto + Estratégia Organização/leis especiais para A5 e C5.5.'
  ],
  complement:[
   'Depois do Marcelo: Direção/TSE · Papéis de trabalho + Testes + Amostragem + Execução + Evidências + Achados.',
   'Direção/CGU · NBC TA 230, 500, 505/520 e 320/330 somente em lacunas documentais/evidenciais/materialidade/testes.',
   'Direção/TSE · Comunicação + Relatório + Monitoramento apenas se o módulo equivalente do Marcelo não estiver liberado.',
   'A4.2 execução contratual: Estratégia pós-edital específico; Direção somente se ainda restar lacuna.',
   'A4.3 transferências/parcerias: Estratégia pós-edital específico; Direção somente se ainda restar lacuna.',
   'A5.6: complemento jurídico pós-edital prioritário.'
  ],
  books:[
   'Compliance e Integridade no Setor Público e Privado · capítulos rastreados na app.',
   'Como Combater a Corrupção em Licitações · cap. 1 rápido → 2 → 3 → 6 → 4 → 5; o livro NÃO fecha A4.2/A4.3.'
  ],
  avoid:['ESTRATÉGIA · Auditoria Governamental e Controle pré-edital: REMOVIDO / NÃO ESTUDAR. O pós-edital geral fica em RESERVA; usar apenas aulas específicas de lacunas mapeadas.','Não começar Direção antes da base Marcelo.','Não ler os livros de ponta a ponta.'],
  order:'Marcelo completo na ordem final → Direção/TSE técnico → NBC TA seletivas → Comunicação/Monitoramento se faltar; livros entram pelas dependências A4/A5.'
 }
});

export const CYCLE_SOURCE_LABEL=Object.freeze({
 afo:'Fase 1 · somente BizurAFO',
 auditoria:'Fase 1 · Marcelo AIG→Planejamento; Direção só depois',
 'adm-publica':'Fase 1 · Marcelo Faixa Preta; ética/integridade depois',
 dcon:'Fase 1 · Nelma + ponte Estratégia Art. 5º',
 dad:'Fase 1 · Rafael rota final + U12/U8 seletivos',
 politicas:'Fase 2 · Estratégia Rodrigo PP/Avaliação',
 port:'Manutenção · Marcello + Andresan',
 ti:'Fase 2 · Lucas Ianni comum + Ramon técnico + Integridade da Informação seletiva',
 cpu:'Fase 4 FINAL · Pacelli M06–M08 + M13–M15',
 diversidade:'Fase 4 FINAL · junto com CPU, fora do ciclo principal'
});

export function materialPlanFor(id){return MATERIAL_PLAN[id]||null;}
export function cycleSourceLabel(id){return CYCLE_SOURCE_LABEL[id]||id;}
