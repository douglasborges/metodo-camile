// Edital CGU 2026 · Auditor Federal de Finanças e Controle · Especialidade Auditoria
// Estrutura operacional: os 81 tópicos-mãe oficiais representam 266 tópicos e subtópicos do caderno Auditoria.
// Fonte de estrutura: edital verticalizado usado no Projeto CGU.
export const CGU_EXAM_DATE='2026-12-13';
export const CGU_CHECK_START='2026-10-12';
export const CGU_OFFICIAL_TOTAL=266;

const group=(id,block,name,officialCount,topics)=>({id,block,name,officialCount,topics:topics.map((title,i)=>({id:id+'.'+(i+1),title}))});

export const CGU_SYLLABUS=Object.freeze([
 group('B1','P1','Estado, Democracia, Direitos e Ciência Política',25,[
  'Estado e legitimidade','Democracia e representação','Federalismo e capacidades estatais','Ordem constitucional e direitos','Valor público e controle','Corrupção como fenômeno político e social','Mecanismos de reprodução e captura','Consequências e respostas à corrupção','Estado e modelos de desenvolvimento econômico'
 ]),
 group('B2','P1','Sociedade Brasileira, Desigualdades, Diversidade e Desenvolvimento',10,[
  'Fundamentos sociológicos','Formação social e cidadania no Brasil','População, território e trabalho','Diversidade e acesso a direitos','Desenvolvimento e realidade brasileira'
 ]),
 group('B3','P1','Ética Pública e Responsabilidade Profissional',13,[
  'Fundamentos da ética pública','Deveres profissionais','Conflitos de interesses e imparcialidade','Relações de trabalho e atendimento','Integridade como responsabilidade institucional'
 ]),
 group('B4','P1','Administração Pública e Fundamentos de Políticas Públicas',10,[
  'Organização administrativa','Modelos de administração','Políticas públicas','Planejamento e recursos','Serviços e transformação digital'
 ]),
 group('C1','P2','Fundamentos de Governança, Riscos e Integridade Pública e Privada',15,[
  'Governança e responsabilidades','Riscos e controles essenciais','Integridade pública','Integridade privada','Prevenção e melhoria institucional'
 ]),
 group('C2','P2','Fundamentos de Transparência, Ouvidoria e Participação Social',21,[
  'Acesso à informação','Transparência e proteção de dados','Ouvidoria e proteção das pessoas','Participação e melhoria de serviços','Integridade da informação e comunicação'
 ]),
 group('C3','P2','Fundamentos de Direito Público Aplicado, Controle e Responsabilização',16,[
  'Decisão administrativa','Processo e garantias','Funções de controle e melhoria da gestão','Responsabilização em nível introdutório','Proteção e encaminhamento'
 ]),
 group('C4','P2','Fundamentos de Evidências, Dados e Inteligência Artificial',17,[
  'Perguntas e fontes','Leitura de dados e indicadores','Inferências e erros de raciocínio','Integridade da evidência e proteção','Uso responsável de inteligência artificial'
 ]),
 group('C5','P2','Fundamentos de Auditoria Governamental e Atuação Integrada da CGU',18,[
  'Propósito, serviços e papéis','Ciclo do trabalho','Evidência e conclusão','Comunicação, recomendações e monitoramento','Atuação integrada da CGU'
 ]),
 group('A1','P3','Auditoria Governamental: Avaliação, Consultoria e Apuração',19,[
  'Avaliação, consultoria e apuração','Planejamento técnico do trabalho','Testes e amostragem','Achados, documentação e revisão','Auditoria de dados e IA','Comunicação, monitoramento e qualidade'
 ]),
 group('A2','P3','Finanças Públicas, Orçamento e Contabilidade Pública',25,[
  'Economia e finanças do setor público','Orçamento e planejamento','Execução e responsabilidade fiscal','Informação contábil aplicada ao controle','Custos e eficiência','Contabilidade societária de estatais','Governança e finalidade pública das estatais'
 ]),
 group('A3','P3','Políticas Públicas e Métodos de Investigação e Avaliação',28,[
  'Problema, desenho e avaliabilidade','Implementação, gestão e coordenação','Monitoramento e desenhos de avaliação','Estratégias qualitativas e mistas','Identificação causal e análise econômica','Conclusões, recomendações e uso dos resultados','Ética da investigação'
 ]),
 group('A4','P3','Auditoria de Contratações, Transferências e Execução de Recursos',10,[
  'Planejamento e seleção','Execução contratual','Transferências e parcerias','Testes e sinais de irregularidade','Encaminhamentos e resultados'
 ]),
 group('A5','P3','Integridade, Transparência e Responsabilização Aplicadas ao Controle Público',39,[
  'Direito público aplicado às respostas de controle','Informação, participação e qualidade dos serviços','Proteção do denunciante e tratamento seguro dos relatos','Avaliação e aperfeiçoamento da integridade pública e privada','Admissibilidade, prova e requisitos da responsabilização','Instrumentos de responsabilização e soluções consensuais','Resultados, comunicação e aprendizagem institucional'
 ])
]);

export const CGU_CHECK_TOPICS=Object.freeze(CGU_SYLLABUS.flatMap(g=>g.topics.map(t=>({...t,groupId:g.id,block:g.block,groupName:g.name}))));
export const CGU_OPERATIONAL_TOTAL=CGU_CHECK_TOPICS.length;

export function cguDaysRemaining(date=new Date()){
 const [y,m,d]=CGU_EXAM_DATE.split('-').map(Number),target=new Date(y,m-1,d,0,0,0,0),today=new Date(date.getFullYear(),date.getMonth(),date.getDate());
 return Math.max(0,Math.ceil((target-today)/86400000));
}
