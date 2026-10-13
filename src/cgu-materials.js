// Plano mestre de materiais · Camile · CGU 2026 · Auditoria
// Consolidado a partir das decisões finais do chat “Análise De Cursos para a CGU [2026] e para o TCU”.
// Regra central: FONTE PRINCIPAL → COMPLEMENTO SELETIVO → NÃO DUPLICAR.
// O ciclo permanece: Port → DCON → AFO → TI → Adm. Pública → Diversidade → AFO → DAD → Políticas Públicas → Auditoria → AFO.

export const MATERIAL_PLAN=Object.freeze({
 port:{
  label:'Português',
  principal:['Marcello Giulian · curso integral · manter em sequência até concluir'],
  complement:['Andresan · resolução de questões Cebraspe por assunto'],
  avoid:['Não reabrir teoria equivalente do Estratégia/Direção enquanto o mesmo assunto estiver sendo coberto pelo Marcello.'],
  order:'Marcello → questões Andresan → pacote somente se surgir lacuna objetiva do edital.'
 },
 dcon:{
  label:'Direito Constitucional',
  principal:['Nelma Fontana · curso principal'],
  complement:['Estratégia · Art. 5º em 24 videoaulas, como ponte específica','Estratégia/Direção · somente atualização ou lacuna comprovada que a Nelma não cubra'],
  avoid:['Não duplicar no pacote geral assuntos já concluídos pela Nelma.','Não considerar Art. 5º concluído antes de terminar a ponte específica e os exercícios previstos.'],
  order:'Nelma Aula 01 → ponte do Art. 5º pelo Estratégia → retomar Nelma → lacunas pontuais do edital.'
 },
 afo:{
  label:'AFO / Finanças Públicas / Contabilidade Pública',
  principal:['Leandro Ravyelle · BizurAFO · primeira passagem e eixo dos três slots de AFO do ciclo'],
  complement:[
   'Celso Natale · somente lacunas A2.1: bens públicos, externalidades, monopólios, federalismo fiscal, progressividade/regressividade, resultado primário/nominal e déficit',
   'Gilmar Possati · Contabilidade Pública/estatais · A2.4–A2.6: CASP/MCASP/NBC TSP, NBC TSP 34/MIC/custos e informação societária de estatais',
   'Pacote pós-edital · somente A2.7 e eventual lacuna residual depois de BizurAFO + Celso + Gilmar'
  ],
  avoid:[
   'Não estudar Celso ou Gilmar como cursos paralelos completos: entram apenas depois da base BizurAFO e nos tópicos de lacuna definidos.',
   'Não repetir em pacote aula equivalente já coberta pelo BizurAFO/Celso/Gilmar sem necessidade objetiva.',
   'BizurAFO Módulo 13 · Regime de Ajustes Fiscais permanece fora do primeiro giro.'
  ],
  order:'BizurAFO em sequência → Celso Natale nas lacunas A2.1 → Gilmar Possati em A2.4–A2.6 → A2.7/lacunas residuais pós-edital.'
 },
 ti:{
  label:'Dados e IA',
  principal:['Ramon · TI TOTAL · trilha CGU'],
  complement:['Pacote pós-edital somente se aparecer lacuna específica depois da trilha Ramon'],
  avoid:['Não transformar a trilha da Camile em um curso completo de TI sem relação com o edital.','TI07 e TI62 ficam como reserva neste primeiro giro.','Banco de Dados/SQL/Python/R/Big Data não entram no caminho principal da Camile só por estarem disponíveis em outras trilhas.'],
  order:'FD01 → TI60 → TI63 → TI83 → Monitoria 36 → TI37-I → TI36 → TI61 → TI35 → TI97 → lacunas.'
 },
 'adm-publica':{
  label:'Administração Pública / Governança / Ética',
  principal:[
   'Marcelo · Administração Pública · modelos, planejamento e serviços',
   'Direção · blocos específicos de Estado/capacidades, valor público, corrupção/captura, ética, governança, riscos e integridade'
  ],
  complement:[
   'Nelma/Rafael/Estratégia quando o próprio tópico já pertence à trilha principal dessas disciplinas',
   'Código de Conduta da CGU e Lei 12.813/2013 nos pontos de ética/conflito de interesses'
  ],
  avoid:['Não assistir no pacote a mesma teoria já concluída em Marcelo, Nelma ou Rafael.','Não usar pacote genérico como reinício integral de Administração Pública.'],
  order:'Marcelo no núcleo de Administração Pública → Direção apenas nos blocos B1/B3/C1 definidos como lacuna → normas específicas → revisão por questões.'
 },
 diversidade:{
  label:'Sociedade, Desigualdades e Diversidade',
  principal:['Direção · bloco B2 integral'],
  complement:['Questões Cebraspe e revisão do próprio material'],
  avoid:['Não abrir material paralelo enquanto o curso do Direção estiver cobrindo integralmente o bloco B2.'],
  order:'Direção B2 integral → questões → revisão/checkpoint.'
 },
 dad:{
  label:'Direito Administrativo',
  principal:['Rafael Oliveira · curso principal'],
  complement:['Herbert Almeida · atualização, legislação e lacunas pontuais','Pacote pós-edital apenas no que continuar faltando após Rafael + Herbert'],
  avoid:['Não duplicar no pacote geral tema já estudado pelo Rafael.','Usar Herbert como complemento, não como reinício integral da disciplina.'],
  order:'Rafael Oliveira → Herbert seletivo → lacunas finais do edital.'
 },
 politicas:{
  label:'Políticas Públicas e Avaliação',
  principal:['Estratégia · curso de Políticas Públicas/Avaliação · fonte principal'],
  complement:['Marcelo Soares · material já adquirido · uso seletivo apenas onde acrescentar método/avaliação ao que o Estratégia não fechou'],
  avoid:['Não usar Direção como fonte desta disciplina neste plano.','Não adquirir/reabrir curso do site próprio do Rodrigo Rennó.','Não repetir no Marcelo Soares tópico já plenamente fechado pelo Estratégia sem ganho metodológico.'],
  order:'Estratégia PP/Avaliação → Marcelo Soares seletivo → questões e lacunas.'
 },
 auditoria:{
  label:'Auditoria Governamental',
  principal:['Marcelo Soares · curso principal · concluir antes de qualquer complemento de Auditoria'],
  complement:[
   'Direção/TSE · Papéis de trabalho + Testes + Amostragem + Execução + Evidências + Achados',
   'Direção/TSE · Comunicação + Relatório + Monitoramento, se a lacuna permanecer após Marcelo',
   'Direção/CGU · NBC TA 230, 500, 505/520 e 320/330 apenas seletivamente',
   'Direção/CGU · IPPF, riscos e três linhas somente se ainda houver lacuna concreta',
   'Ramon · Dados/IA para o recorte A1.5'
  ],
  avoid:[
   'NÃO USAR Auditoria Governamental do Estratégia neste plano.',
   'Não começar Direção antes de concluir a base de Auditoria com Marcelo.',
   'Não assistir NBC TA/IPPF por completude se o conteúdo já estiver fechado pelo Marcelo.'
  ],
  order:'Marcelo Soares → Direção/TSE papéis/testes/amostragem/evidências/achados → comunicação/relatório/monitoramento se necessário → NBC TA/IPPF seletivos → lacunas A4/A5 pós-edital.'
 }
});

export const CYCLE_SOURCE_LABEL=Object.freeze({
 port:'Marcello · próxima etapa sequencial',
 dcon:'Nelma / ponte Art. 5º · próxima etapa do Método ET',
 afo:'Trilha A2 · BizurAFO primeiro; depois Celso/Gilmar somente nas lacunas',
 ti:'Ramon TI TOTAL · próxima aula da trilha CGU',
 'adm-publica':'Marcelo + Direção seletivo · próxima etapa sem duplicação',
 diversidade:'Direção · bloco B2 integral · próxima etapa',
 dad:'Rafael Oliveira · próxima etapa · Herbert só complemento',
 politicas:'Estratégia PP/Avaliação · próxima etapa · Marcelo Soares seletivo',
 auditoria:'Marcelo Soares primeiro · Direção somente depois'
});

export function materialPlanFor(id){return MATERIAL_PLAN[id]||null;}
export function cycleSourceLabel(id){return CYCLE_SOURCE_LABEL[id]||id;}
