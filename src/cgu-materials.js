// Plano mestre de materiais · Camile · CGU 2026 · Auditoria
// Versão v1.5 · livros rastreáveis + prioridades pós-edital.
// Regra central: FONTE PRINCIPAL → COMPLEMENTO SELETIVO → NÃO DUPLICAR.
// Prioridade atual: AFO/Finanças → Auditoria → Administração Pública/DCON/DAD.
// Sociedade Brasileira/Diversidade fica para a fase final e não integra o ciclo principal.

export const PHASE_PLAN=Object.freeze([
 {id:'fase-1',label:'Fase 1 · AFO / Finanças Públicas',subjects:['afo'],priority:'MÁXIMA',active:true},
 {id:'fase-2',label:'Fase 2 · Auditoria',subjects:['auditoria'],priority:'MÁXIMA',active:true},
 {id:'fase-3',label:'Fase 3 · Administração Pública + DCON + DAD',subjects:['adm-publica','dcon','dad'],priority:'ALTA',active:true},
 {id:'manutencao',label:'Manutenção transversal',subjects:['politicas','port','ti'],priority:'MANUTENÇÃO',active:true},
 {id:'fase-4',label:'Fase 4 · Sociedade Brasileira / Diversidade',subjects:['diversidade'],priority:'FINAL',active:false}
]);

const COMMON_COMPLIANCE_CHAPTERS='2, 5, 6, 7, 8, 9, 10, 15, 16, 17, 24, 26 e 28';
const CAMILE_EXTRA_COMPLIANCE_CHAPTERS='12, 13, 19, 20, 25 e 27';

export const BOOK_ROUTES=Object.freeze([
 {
  id:'compliance-integridade-2026',
  title:'Compliance e Integridade no Setor Público e Privado',
  authors:'Giovanni Pacelli + Francisco Netto',
  edition:'3ª ed. · 2026',
  subjects:['adm-publica','auditoria'],
  rule:'Leitura dirigida; não ler linearmente como novo curso. Os capítulos comuns vêm antes dos extras exclusivos da Camile.',
  chapters:[
   {number:2,topic:'Conceitos essenciais dos programas de compliance e integridade',track:'comum',codes:['B3','C1']},
   {number:5,topic:'Instâncias responsáveis pelas funções de integridade',track:'comum',codes:['B3','C1','C5.5']},
   {number:6,topic:'Promoção da ética nas organizações',track:'comum',codes:['B3']},
   {number:7,topic:'Ouvidoria e tratamento de denúncias',track:'comum',codes:['C2','A5']},
   {number:8,topic:'Acesso à informação',track:'comum',codes:['C2','A5']},
   {number:9,topic:'Promoção da transparência ativa',track:'comum',codes:['C2','A5']},
   {number:10,topic:'Prevenção do conflito de interesses',track:'comum',codes:['B3','A5']},
   {number:15,topic:'Unidade de Gestão da Integridade e seu papel matricial',track:'comum',codes:['C1','C5.5']},
   {number:16,topic:'Elaboração e implementação de programa de integridade no setor público',track:'comum',codes:['C1','A5']},
   {number:17,topic:'Monitoramento de programa de integridade no setor público',track:'comum',codes:['C1','A5']},
   {number:24,topic:'Assédio, discriminação e tratamento organizacional',track:'comum',codes:['B3','C1','C3.5','A5']},
   {number:26,topic:'Proteção aos dados pessoais · LGPD e LAI',track:'comum',codes:['C2','C4.4','A5']},
   {number:28,topic:'Participação social e organizações da sociedade civil na promoção da integridade',track:'comum',codes:['C2','C5.5']},
   {number:12,topic:'Procedimentos de responsabilização',track:'camile',codes:['C3','A5']},
   {number:13,topic:'Controle interno e auditoria interna sob a perspectiva da integridade',track:'camile',codes:['C5','A1','A5']},
   {number:19,topic:'Programas de integridade em empresas com relações negociais com o poder público',track:'camile',codes:['C1.4','A5']},
   {number:20,topic:'Programa de integridade privado · elaboração, implementação e monitoramento',track:'camile',codes:['C1.4','A5']},
   {number:25,topic:'Liderança organizacional e comprometimento da alta administração',track:'camile',codes:['C1','A5']},
   {number:27,topic:'Due diligence e sua importância para ética e integridade',track:'camile',codes:['C1.4','A5']}
  ]
 },
 {
  id:'corrupcao-licitacoes-2024',
  title:'Como Combater a Corrupção em Licitações',
  authors:'Franklin Brasil Santos + Kleberson Roberto de Souza',
  edition:'4ª ed. · 2024',
  subjects:['auditoria'],
  rule:'Só iniciar após Rafael U12 e a base correspondente de Auditoria. Capítulo 4 exige base Marcelo em achados/evidências.',
  chapters:[
   {number:2,topic:'Tipologia de fraudes em licitação',track:'camile',codes:['A4.1','A4.2','A4.4']},
   {number:3,topic:'Técnicas de detecção de fraudes',track:'camile',codes:['A4.4','A1.3','A1.4']},
   {number:6,topic:'Prevenção de fraudes em licitação',track:'camile',codes:['A4.1','A4.2','A5']},
   {number:4,topic:'Elaboração dos achados',track:'camile',codes:['A1.4','A4.4','A4.5']},
   {number:5,topic:'Responsabilização',track:'camile',codes:['A4.5','A5']}
  ]
 }
]);

export function bookRoutesFor(subjectId){
 return BOOK_ROUTES.filter(book=>book.subjects.includes(subjectId));
}

export const MATERIAL_PLAN=Object.freeze({
 port:{
  label:'Português',
  phase:'Manutenção transversal',priority:'MANUTENÇÃO',active:true,
  principal:['Marcello Giulian · curso principal · continuar do ponto real, sem reiniciar'],
  complement:['Andresan · questões Cebraspe por assunto'],
  books:[],
  avoid:['Não reabrir teoria equivalente do Estratégia/Direção enquanto o mesmo assunto estiver coberto pelo Marcello.'],
  order:'Marcello → questões Andresan → lacuna objetiva somente se aparecer.'
 },
 dcon:{
  label:'Direito Constitucional',
  phase:'Fase 3',priority:'ALTA',active:true,
  principal:['Nelma Fontana · curso principal'],
  complement:['Estratégia · Art. 5º em 24 videoaulas, como ponte específica','Atualização pontual somente onde a Nelma não fechar o edital'],
  books:[],
  avoid:['Não duplicar em pacote geral assunto já concluído pela Nelma.','Não considerar Art. 5º concluído antes de terminar a ponte específica + exercícios.'],
  order:'Nelma A01 → Art. 5º pelo Estratégia → retomar Nelma na ordem definida → lacunas pontuais.'
 },
 afo:{
  label:'AFO / Finanças Públicas / Contabilidade Pública',
  phase:'Fase 1',priority:'MÁXIMA',active:true,
  principal:['Leandro Ravyelle · BizurAFO · primeira passagem e eixo dos três slots de AFO do ciclo'],
  complement:[
   'Celso Natale · somente lacunas A2.1: bens públicos, externalidades, monopólios, federalismo fiscal, progressividade/regressividade, resultado primário/nominal e déficit',
   'Gilmar Possati · A2.4–A2.6: CASP/MCASP/NBC TSP, NBC TSP 34/MIC/custos e informação societária de estatais',
   'Pacote pós-edital · apenas A2.7 e lacuna residual comprovada'
  ],
  books:[],
  avoid:[
   'Celso/Gilmar não viram cursos paralelos completos: entram só depois da base BizurAFO e na lacuna definida.',
   'Não repetir em pacote aula equivalente já coberta.',
   'BizurAFO M13 permanece fora do primeiro giro; M16 é diagnóstico/opcional.'
  ],
  order:'BizurAFO → Celso A2.1 se necessário → Gilmar A2.4–A2.6 → A2.7/lacunas residuais.'
 },
 ti:{
  label:'Dados e IA',
  phase:'Manutenção transversal',priority:'MANUTENÇÃO',active:true,
  principal:['Ramon · TI TOTAL · trilha CGU da Camile'],
  complement:['Pacote pós-edital somente se surgir lacuna específica depois da trilha Ramon'],
  books:[],
  avoid:['Não transformar a trilha da Camile em curso completo de TI.','TI07 e TI62 ficam em reserva no primeiro giro.','Não abrir BD/SQL/Python/R/Big Data amplo sem relação direta com o recorte da Camile.'],
  order:'FD01 → TI60 → TI63 → TI83 → Monitoria 36 → TI37-I → TI36 → TI61 → TI35 → TI97 → lacunas.'
 },
 'adm-publica':{
  label:'Administração Pública / Governança / Ética / Integridade',
  phase:'Fase 3',priority:'ALTA',active:true,
  principal:[
   'Marcelo · Administração Pública · modelos, planejamento, governança, resultados, excelência, transparência/accountability',
   'Pacelli + Francisco Netto · Compliance e Integridade no Setor Público e Privado (2026) · leitura dirigida'
  ],
  complement:[
   'Direção · somente blocos específicos de Estado/capacidades, valor público, corrupção/captura, governança, riscos e integridade',
   'Herbert/Estratégia · LAI, LIA, LGPD, Lei 9.784/1999, Lei 12.813/2013 e LINDB/Decreto 9.830 quando o item exigir',
   'Nelma/Rafael/Estratégia quando o próprio tópico já pertence à trilha principal dessas disciplinas'
  ],
  books:[
   'Livro: Compliance e Integridade no Setor Público e Privado · Pacelli/Francisco Netto · 2026 · cobertura dirigida: B3, C1, C2, C3, C5.5 e A5.',
   'Trilha comum do livro: capítulos '+COMMON_COMPLIANCE_CHAPTERS+'.',
   'Os capítulos extras exclusivos da Camile ('+CAMILE_EXTRA_COMPLIANCE_CHAPTERS+') entram no aprofundamento de Auditoria/A5, não como duplicação aqui.'
  ],
  avoid:['Não assistir no pacote a mesma teoria já concluída em Marcelo, Nelma ou Rafael.','Não usar o livro para reler integralmente conteúdo já fechado; leitura é dirigida aos capítulos selecionados.','Não reiniciar Administração Pública por pacote genérico.'],
  order:'Marcelo → Pacelli/Netto capítulos comuns → Direção/Herbert/Estratégia apenas nas lacunas nominais → questões.'
 },
 diversidade:{
  label:'Sociedade Brasileira, Desigualdades, Diversidade e Desenvolvimento',
  phase:'Fase 4',priority:'FINAL',active:false,
  principal:['Direção · bloco B2 integral, somente quando a fase final for ativada'],
  complement:['Questões Cebraspe e revisão do próprio material'],
  books:[],
  avoid:['Não consumir horas do ciclo principal enquanto AFO, Auditoria, Administração Pública, DCON e DAD ainda tiverem prioridade.','Não abrir material paralelo enquanto o Direção cobrir B2.'],
  order:'FASE FINAL / active=false → Direção B2 → questões → revisão.'
 },
 dad:{
  label:'Direito Administrativo',
  phase:'Fase 3',priority:'ALTA',active:true,
  principal:['Rafael Oliveira · curso principal'],
  complement:[
   'Herbert Almeida · atualização, legislação e lacunas pontuais',
   'Estratégia/Herbert · leitura/aula dirigida para LAI, LIA, LGPD, Lei 9.784/1999, Lei 12.813/2013 e LINDB + Decreto 9.830',
   'Rafael U12 · Licitações e Contratos; U8 PPP apenas seletivo para a Camile'
  ],
  books:[],
  avoid:['Não duplicar no pacote geral tema já estudado pelo Rafael.','Herbert é complemento, não reinício integral da disciplina.'],
  order:'Rafael → U12 Licitações/Contratos + U8 PPP seletivo quando chegar → Herbert/Estratégia na legislação/lacuna → revisão.'
 },
 politicas:{
  label:'Políticas Públicas e Avaliação',
  phase:'Manutenção transversal',priority:'MANUTENÇÃO',active:true,
  principal:['Estratégia · Políticas Públicas/Avaliação · fonte principal'],
  complement:['Marcelo Soares · seletivo somente onde acrescentar método/avaliação'],
  books:[],
  avoid:['Não usar Direção nesta disciplina.','Não adquirir/reabrir curso do site próprio do Rodrigo Rennó.','Não repetir no Marcelo tópico plenamente fechado pelo Estratégia.'],
  order:'Estratégia PP Aula 01 → Aula 02 → Ex Ante → Ex Post → CMAP seletivo → Passo → Marcelo seletivo/lacunas.'
 },
 auditoria:{
  label:'Auditoria Governamental / Contratações / Integridade aplicada',
  phase:'Fase 2',priority:'MÁXIMA',active:true,
  principal:[
   'Marcelo Soares · Auditoria Governamental · base principal antes de complementos',
   'Pacelli + Francisco Netto · Compliance e Integridade no Setor Público e Privado (2026) · capítulos selecionados',
   'Livro Como Combater a Corrupção em Licitações (2024) · leitura dirigida para A4 e conexões A1/A5'
  ],
  complement:[
   'Direção/TSE · papéis de trabalho + testes + amostragem + execução + evidências + achados, somente após Marcelo',
   'Direção/TSE · comunicação + relatório + monitoramento se a lacuna persistir',
   'Direção/CGU · NBC TA 230, 500, 505/520 e 320/330 seletivamente; IPPF/riscos/três linhas apenas se lacuna concreta',
   'Ramon · Dados/IA para A1.5',
   'Base jurídica Rafael/Herbert/Estratégia para Lei 14.133, LAI, LIA, LGPD, Lei 9.784, Lei 12.813 e LINDB/Decreto 9.830'
  ],
  books:[
   'Compliance e Integridade no Setor Público e Privado · cobertura dirigida B3/C1/C2/C3/C5.5/A5 · trilha comum: capítulos '+COMMON_COMPLIANCE_CHAPTERS+'.',
   'Camile acrescenta no mesmo livro: capítulos '+CAMILE_EXTRA_COMPLIANCE_CHAPTERS+'.',
   'Como Combater a Corrupção em Licitações · ordem Camile: capítulos 2 → 3 → 6 → 4 → 5.',
   'Dependência do livro de licitações: entrar depois de Rafael U12 (Licitações/Contratos) e da base correspondente com Marcelo.'
  ],
  avoid:[
   'NÃO USAR Auditoria Governamental do Estratégia.',
   'Não começar Direção antes de concluir a base Marcelo.',
   'Não ler os livros de ponta a ponta: seguir apenas os capítulos mapeados.',
   'Sociedade Brasileira não entra como substituto de nenhuma lacuna de Auditoria.'
  ],
  order:'Marcelo → Pacelli/Netto dirigido → Rafael U12/base jurídica → livro de licitações 2→3→6→4→5 → Direção técnico seletivo → NBC/IPPF/lacunas.'
 }
});

export const CYCLE_SOURCE_LABEL=Object.freeze({
 afo:'Fase 1 · BizurAFO primeiro; Celso/Gilmar só na lacuna',
 auditoria:'Fase 2 · Marcelo primeiro · livros dirigidos · Direção depois',
 'adm-publica':'Fase 3 · Marcelo + Pacelli/Netto · complementos seletivos',
 dcon:'Fase 3 · Nelma / ponte Art. 5º',
 dad:'Fase 3 · Rafael · Herbert/Estratégia seletivos',
 politicas:'Manutenção · Estratégia PP/Avaliação',
 port:'Manutenção · Marcello + Andresan',
 ti:'Manutenção · Ramon TI TOTAL',
 diversidade:'Fase 4 FINAL · fora do ciclo principal'
});

export function materialPlanFor(id){return MATERIAL_PLAN[id]||null;}
export function cycleSourceLabel(id){return CYCLE_SOURCE_LABEL[id]||id;}
