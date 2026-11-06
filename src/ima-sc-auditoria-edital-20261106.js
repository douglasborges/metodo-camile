/**
 * Auditoria documental pós-edital IMA-SC 001/2026 (ANA) — 06/11/2026.
 * Bases: Anexo V pp. 56–59; ementas apresentadas de Thallius, Nelma, Leandro,
 * Guilherme, Rodrigo e Marcelo. Gran (código 212723) usado apenas como benchmark.
 * As correspondências são POR ASSUNTO; nenhuma aula é presumida concluída.
 */
export const IMA_AUDIT_VERSION='ima-ana-furb-20261106-v2';
const s=(id,topic,source,lesson,status='DIRETO',note='')=>({id,topic,source,lesson,status,note});
export const IMA_AUDIT=Object.freeze({
 dcon:[
 s('IMA-DCON-01','Aplicabilidade/eficácia; princípios fundamentais','Nelma Cebraspe','Aula 01','DIRETO','A capa do curso inclui princípios fundamentais; conferir apresentação efetiva nos vídeos'),
 s('IMA-DCON-02','Teoria dos direitos fundamentais e art. 5º','Nelma Cebraspe + Estratégia','Cebraspe A02; Estratégia A04 (24 VAs + VA25 questões), A05 (8 VAs remédios)','DIRETO','Manter progresso anterior; não repetir sem necessidade'),
 s('IMA-DCON-03','Direitos sociais e nacionalidade','Nelma Cebraspe','Aula 03'),
 s('IMA-DCON-04','Direitos políticos e partidos','Nelma Cebraspe','Aula 04'),
 s('IMA-DCON-05','Organização do Estado e Administração Pública','Nelma Cebraspe','Aula 05'),
 s('IMA-DCON-06','Poder Legislativo','Nelma Cebraspe','Aula 06'),
 s('IMA-DCON-07','Processo Legislativo','Nelma Cebraspe','Aula 07'),
 s('IMA-DCON-08','Fiscalização financeira/orçamentária e Poder Executivo','Nelma Cebraspe','Aula 08','SELETIVO','Integra também AFO; revisar só recortes exigidos'),
 s('IMA-DCON-09','Poder Judiciário','Nelma Cebraspe','Aula 09'),
 s('IMA-DCON-10','Funções essenciais à Justiça','Nelma Cebraspe','Aula 10'),
 s('IMA-DCON-15','Princípios da ordem econômica, política urbana','Nelma Cebraspe','Aula 15','PARCIAL','Conferir política urbana no conteúdo efetivo; completar via CF 182–183'),
 s('IMA-DCON-16','Ordem social, seguridade e meio ambiente','Nelma Cebraspe','Aula 16','PARCIAL','Reforçar seguridade social e art. 225 pela Constituição')
 ],
 dad:[
 s('IMA-DAD-02','Estado, governo, Administração, fontes e princípios','Thallius','Pasta 02: aulas 01–05'),
 s('IMA-DAD-03','Organização administrativa e indireta','Thallius','Pasta 03: aulas 01–05'),
 s('IMA-DAD-04','Órgãos públicos','Thallius','Pasta 04: aula 06 da sequência exibida'),
 s('IMA-DAD-05','Centralização, descentralização e desconcentração','Thallius','Pasta 05: aulas 01–02'),
 s('IMA-DAD-06','Princípios constitucionais e regime jurídico','Thallius','Pasta 06: aulas 01–03'),
 s('IMA-DAD-07','Atos administrativos','Thallius','Pasta 07: aulas 01–08'),
 s('IMA-DAD-08','Poderes administrativos e abuso de poder','Thallius','Pasta 08: aulas 01–05'),
 s('IMA-DAD-09','Agentes públicos e regimes','Thallius','Pasta 09: aulas 01–09','PARCIAL','A pasta 10 trata da Lei federal 8.112/1990 e NÃO substitui a Lei estadual 6.745/1985'),
 s('IMA-DAD-SC6745','Lei estadual 6.745/1985: provimento, vacância, deveres e PAD','Lei seca SC + Estratégia IMA','Legislação: Títulos I, II, V no curso apresentado; outros dispositivos relevantes pelo texto da lei','COMPLEMENTO','Não limitar automaticamente o edital aos três títulos mostrados no curso'),
 s('IMA-DAD-11','Improbidade: Lei 8.429/1992 atualizada','Thallius','Pasta 11: aulas 01–09'),
 s('IMA-DAD-12','Processo Administrativo: Lei 9.784/1999','Thallius','Pasta 12: aulas 01–08'),
 s('IMA-DAD-13','Responsabilidade civil do Estado','Thallius','Pasta 13: aulas 01–05'),
 s('IMA-DAD-16','Controle da Administração','Thallius','Pasta 16: aulas 01–06'),
 s('IMA-DAD-17','Serviços públicos','Thallius','Pasta 17: aulas 01–05'),
 s('IMA-DAD-19','Terceiro setor, OS e OSCIP','Thallius','Pasta 19: aulas 01–02','PARCIAL','Complementar 9.637/1998, 9.790/1999 e 13.019/2014'),
 s('IMA-DAD-LINDB','LINDB: vigência, aplicação, interpretação, integração e conflitos','Lei seca + fonte complementar','Decreto-Lei 4.657/1942; não há aula própria demonstrada nos prints do Thallius','COMPLEMENTO'),
 s('IMA-DAD-LC741','Organização administrativa estadual','Lei seca SC + fonte complementar','LC estadual 741/2019; não há aula própria demonstrada nos prints do Thallius','COMPLEMENTO'),
 s('IMA-DAD-26','Transparência e acesso à informação: LAI','Thallius','Pasta 26: aulas 01–08'),
 s('IMA-DAD-27','Lei Anticorrupção 12.846/2013','Thallius','Pasta 27: aulas 01–03'),
 s('IMA-DAD-28','LGPD: proteção de dados no setor público','Thallius','Pasta 28: aulas 01–10','PARCIAL','Aplicação ao poder público: confrontar capítulos e complementar pela leitura da lei'),
 s('IMA-DAD-ETICA','Ética e relações humanas no trabalho','Lei 6.745/1985 + prática FURB','Leitura de deveres e responsabilidades + caderno de questões','COMPLEMENTO','Tema expresso, sem aula específica comprovada nos PDFs')
 ],
 afo:[
 s('IMA-AFO-M01','Conceitos, funções do orçamento e intervenção estatal','BizurAFO Leandro','Módulo 1, aulas 1–3','SELETIVO'),
 s('IMA-AFO-M02','PPA, LDO e LOA','BizurAFO Leandro','Módulo 2, aulas 1, 3, 4 e 5','DIRETO'),
 s('IMA-AFO-M03','Princípios orçamentários','BizurAFO Leandro','Módulo 3, aulas 1–4'),
 s('IMA-AFO-M04','Créditos adicionais','BizurAFO Leandro','Módulo 4, aulas 1–3'),
 s('IMA-AFO-M05','Ciclo, emendas e execução','BizurAFO Leandro','Módulo 5, aulas 1–4','DIRETO','OBRIGATÓRIO; estava incorretamente excluído da rota anterior'),
 s('IMA-AFO-M06','Orçamento-programa e técnicas','BizurAFO Leandro','Módulo 6, aulas 1–3','SELETIVO'),
 s('IMA-AFO-M07','Receita pública, classificações, estágios','BizurAFO Leandro','Módulo 7, aulas 1–7','DIRETO'),
 s('IMA-AFO-M08','Despesa pública, classificações e estágios','BizurAFO Leandro','Módulo 8, aulas 1–7','DIRETO'),
 s('IMA-AFO-M09','Programação financeira e descentralização','BizurAFO Leandro','Módulo 9, aulas 1–2','DIRETO'),
 s('IMA-AFO-M10','Restos a pagar, DEA e suprimento de fundos','BizurAFO Leandro','Módulo 10 (RAP/DEA/SF): aulas 1–3','SELETIVO','Dois módulos intitulados 10; não confundir com Sistemas Estruturadores'),
 s('IMA-AFO-M11','LRF — LC 101/2000: metas, renúncia, despesa, transferências, transparência e controle','BizurAFO Leandro','Módulo 11 — aula 1 até tópicos de fiscalização (inclui aulas 12 e 13 conforme catalogação)','DIRETO','A LRF é EXPRESSAMENTE exigida na parte específica do edital; retirar de EM ESPERA'),
 s('IMA-AFO-M14','Lei 4.320/1964, classificações e créditos','BizurAFO Leandro','Módulo 14 — partes 1–6; aula longa apenas se necessário','DIRETO'),
 s('IMA-AFO-CF165','CF arts. 165–169','Texto constitucional + Leandro','Leitura constitucional + aulas PPA/LDO/LOA/Emendas','COMPLEMENTO')
 ],
 rl:[
 s('IMA-RL-A01','Proposições, conectivos e sentenças','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 1'),
 s('IMA-RL-A02','Tabelas verdade','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 2'),
 s('IMA-RL-A03','Equivalências e negações','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 3'),
 s('IMA-RL-A04','Inferências, argumentos e dedução','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 4'),
 s('IMA-RL-A08','Sequências e padrões','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 8; Módulo regular 38 se necessário','PARCIAL'),
 s('IMA-RL-A06','Análise combinatória','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 6'),
 s('IMA-RL-A07','Probabilidade','Guilherme Neves','Enxuto Raciocínio Lógico: Aula 7'),
 s('IMA-MAT-M01','Números naturais e operações','Guilherme Neves','Alfabetização Matemática Enxuta: módulos 1–2','NIVELAMENTO'),
 s('IMA-MAT-M04','Orientação temporal','Guilherme Neves','Alfabetização Matemática Enxuta: módulo 4'),
 s('IMA-MAT-M05','Frações, decimais e inteiros','Guilherme Neves','Alfabetização Matemática Enxuta: módulos 5, 6, 8 e 9','NIVELAMENTO'),
 s('IMA-MAT-M07','Sistema métrico: comprimento, área, volume e tempo','Guilherme Neves','Alfabetização Matemática Enxuta: módulo 7'),
 s('IMA-MAT-M11','Equações e sistemas básicos para problemas','Guilherme Neves','Alfabetização Matemática Enxuta: módulo 11; Enxuto RL Aula 5 se necessário'),
 s('IMA-MAT-M12','Porcentagem e aumentos/descontos','Guilherme Neves','Alfabetização Matemática Enxuta: módulo 12'),
 s('IMA-MAT-M13','Razões, proporções e regra de três','Guilherme Neves','Alfabetização Matemática Enxuta: módulos 13 e 14'),
 s('IMA-MAT-M20','Conjuntos','Guilherme Neves','Alfabetização Matemática Enxuta: módulo 20'),
 s('IMA-MAT-M31','Geometria plana e interpretação geométrica','Guilherme Neves','Módulo regular 31 — seleção de aulas de figuras, áreas e perímetros','COMPLEMENTO','O Gran oferece várias aulas: geometria não pode ser descartada'),
 s('IMA-MAT-M32','Geometria espacial: volume','Guilherme Neves','Módulo regular 32 — recortes de volumes','COMPLEMENTO'),
 s('IMA-EST-M49','Tabelas, gráficos, média simples e ponderada','Guilherme Neves','Módulo regular 49 (Estatística Descritiva), somente partes pertinentes','SELETIVO'),
 s('IMA-RL-M39','Associação lógica, dedução com pessoas/objetos','Guilherme Neves','Módulo regular 39, questões seletivas','COMPLEMENTO'),
 s('IMA-RL-M41','Orientação espacial','Guilherme Neves','Módulo regular 41, questões seletivas','COMPLEMENTO'),
 s('IMA-RL-FORM','Formação e classificação de conceitos','Questões FURB + material complementar','Enunciados de classificação, discriminação e critérios lógicos','COMPLEMENTO')
 ],
 apu:[
 s('IMA-APU-MARC-T01','Transparência ativa, passiva e publicidade','Marcelo Soares','Faixa Preta Administração Pública, Transparência e Accountability — T01 Transparência na Administração Pública','DIRETO','O módulo tem 2 VAs, ebook e flashcards, não 4 videoaulas'),
 s('IMA-APU-MARC-T02','Controle social, prestação de contas e accountability','Marcelo Soares','Mesmo módulo — T01 Accountability Cebraspe','DIRETO','Questões FURB devem predominar'),
 s('IMA-APU-CROSS','Administração, princípios, atos, processo, orçamento, ética e integridade','Thallius + Leandro + leis','Conceitos em DAD 02–08; processo pasta 12; AFO módulos 1–5; ética por leitura','CONTEUDO_COMPARTILHADO','Não duplicar horas de teoria'),
 s('IMA-APU-GAPS','Governança, evolução da AP, Gestão por Resultados','Marcelo Soares','OUTROS módulos do Faixa Preta','NAO_EXIGIDO','Não são itens literais do cargo ANA nem da matéria Noções de AP')
 ],
 ti:[
 s('IMA-TI-R67','Fundamentos de IA e aprendizado de máquina','Rodrigo Schaeffer','Combo Informática — Inteligência Artificial e Aprendizado de Máquina, aulas 01–05','PARCIAL','Não se pode confirmar quais das 5 aulas tratam de IA generativa, riscos e vieses sem conteúdo interno'),
 s('IMA-TI-R49','Apoio à decisão e inteligência de negócios','Rodrigo Schaeffer','Combo — Sistemas de suporte à decisão e inteligência de negócio, aula 01','DIRETO'),
 s('IMA-TI-R15','Segurança da informação relevante para IA','Rodrigo Schaeffer','Combo — Segurança da Informação, aulas 01–08 (seleção por assunto)','PARCIAL','A ementa não discrimina conteúdos de cada aula'),
 s('IMA-TI-DIG','Transformação digital, automação e serviços públicos','Anexo V + fonte complementar','Leitura dirigida + questões da FURB','COMPLEMENTO','Não há aula com esse título explícito nos materiais'),
 s('IMA-TI-RESP','IA responsável: vieses, transparência, explicabilidade, supervisão humana, responsabilidade','Anexo V + fonte complementar','Apostila temática e estudos de caso','COMPLEMENTO','Não declarar suprido somente pelo grupo IA do Rodrigo'),
 s('IMA-TI-LGPD','Dados pessoais e poder público','Thallius','Pasta 28 LGPD — aulas 01–10; validar aplicação pública','CONTEUDO_COMPARTILHADO','Carga própria de TI permanece; teoria legal em DAD para não duplicar')
 ],
 ambiental:[
 s('IMA-ENV-CF225','CF/88 art. 225','Constituição + Nelma','CF art. 225; Nelma Cebraspe A16 para contexto','DIRETO'),
 s('IMA-ENV-LC140','Competências ambientais comuns e cooperação federativa','LC 140/2011','Lei seca; não há aula integral demonstrada nos cursos efetivamente assinados','COMPLEMENTO','Gran tem aula, mas serve apenas como referência, sem assinatura'),
 s('IMA-ENV-PNMA','PNMA, SISNAMA e instrumentos','Estratégia — André Rocha','Conhecimentos Específicos Engenheiro Ambiental: Política Nacional do Meio Ambiente (Lei 6.938/1981)','DIRETO','Aula realmente exibida no print enviado'),
 s('IMA-ENV-SC14675','Código Ambiental SC, apenas Títulos I e II','Lei estadual 14.675/2009','Leitura dirigida; curso Estratégia exibido não identifica aula acessível sobre esses títulos','COMPLEMENTO'),
 s('IMA-ENV-SC17354','Natureza, competências, finalidade e estrutura do IMA','Lei estadual 17.354/2017','Leitura dirigida; sem aula comprovada nos materiais','COMPLEMENTO')
 ],
 port:[
 s('IMA-PORT-BASE','Gramática: morfologia, sintaxe, pontuação, concordância, regência','Marcello Giulian','Extensivo já em andamento — preservar 40 aulas e progresso','DIRETO','Edital FURB, questões múltipla escolha; não reiniciar'),
 s('IMA-PORT-SEM','Semântica, figuras, funções da linguagem, variação linguística','Marcello Giulian + material complementar','Validar títulos de aulas faltantes do Extensivo antes de atribuir números','COMPLEMENTO','Gran indica cobertura desse grupo, mas não é fonte de estudo'),
 s('IMA-PORT-TEXT','Interpretação, coesão, coerência, gêneros e reescrita','TEC + Marcello Giulian','Baterias FURB de interpretação e reescrita','COMPLEMENTO','Andresan questões Cebraspe em espera; formato FURB prevalece')
 ]
});
export const IMA_TOPIC_TOTAL=Object.values(IMA_AUDIT).reduce((n,x)=>n+x.length,0);
const clone=v=>JSON.parse(JSON.stringify(v));
const defaultUnit=(r,order)=>({
 id:r.id,title:r.topic+' | '+r.source+' — '+r.lesson,order,
 source:r.source,sourceLesson:r.lesson,editalTopic:r.topic,coverageStatus:r.status,
 studyPlan:r.note,courseId:'ima-furb-auditoria-20261106',theoryDone:false,theoryDate:'',
 batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},
 general:{attempted:0,correct:0},legacy:[],marks:[],
 hiddenFromRoute:['NAO_EXIGIDO','CONTEUDO_COMPARTILHADO'].includes(r.status),
 deferred:['NAO_EXIGIDO','CONTEUDO_COMPARTILHADO'].includes(r.status),
 sourceProof:'Anexo V IMA/SC e ementa PDF de '+r.source
});
export function refineImaCurriculum(current){
 const st=clone(current),subjects=st.subjects||[],idToSubject={dcon:'dcon',dad:'dad',afo:'afo',rl:'rl-ima',apu:'adm-publica',ti:'ti-ima',ambiental:'leg-ambiental',port:'port'};
 for(const [group,rows] of Object.entries(IMA_AUDIT)){
  const id=idToSubject[group];
  let subj=subjects.find(x=>x.id===id);
  if(!subj){subj={id,phase:'new',course:'IMA-SC · '+group,slotMinutes:60,units:[],checkpoints:{},notebooks:[]};subjects.push(subj);}
  subj.units=Array.isArray(subj.units)?subj.units:[];
  // Nunca apagar ou reclassificar unidades concluídas. A catalogação é aditiva.
  for(const [i,row] of rows.entries()){
   const found=subj.units.find(u=>u.id===row.id);
   if(!found)subj.units.push(defaultUnit(row,2000+i));
   else {
     found.coverageStatus=row.status;found.editalTopic=row.topic;found.sourceLesson=row.lesson;
     found.studyPlan=row.note;found.title=row.topic+' | '+row.source+' — '+row.lesson;
     if(['NAO_EXIGIDO','CONTEUDO_COMPARTILHADO'].includes(row.status)){found.hiddenFromRoute=true;found.deferred=true;}
   }
  }
 }
 const dad=subjects.find(x=>x.id==='dad');
 if(dad)for(const u of dad.units){
   if(String(u.id)==='ima-tha-dad-01'){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='Material de consulta, não videoaula';}
   if(String(u.id)==='ima-tha-dad-10'){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='Lei 8.112/1990 fora do escopo específico';}
 }
 const lic=subjects.find(x=>x.id==='licita-ima');
 if(lic){
  const labels={
   'ima-lic-14':{
     title:'Thallius · Pasta 14 — Lei 14.133/2021 (videoaulas 01–21)',
     note:'Cobrir princípios, agentes, fases, contratação direta, alienações, auxiliares, sanções, PNCP; conferir partes não identificadas por assunto no PDF'
   },
   'ima-lic-15':{
     title:'Thallius · Pasta 15 — Contratos administrativos (videoaulas 01–08)',
     note:'Formalização, garantia, riscos, duração, execução, alterações, extinção, pagamentos, controvérsias; conferência pela Lei 14.133/2021'
   }
  };
  for(const u of lic.units){const v=labels[u.id];if(v){u.title=v.title;u.studyPlan=v.note;u.source='Thallius Moraes';}}
  if(!lic.units.some(x=>x.id==='IMA-LIC-CRIMES'))lic.units.push(defaultUnit(s('IMA-LIC-CRIMES','Crimes em licitações e contratos administrativos','Código Penal / fonte complementar','Arts. 337-E a 337-P do CP; não há aula específica comprovada no curso Thallius','COMPLEMENTO'),2010));
  if(!lic.units.some(x=>x.id==='IMA-LIC-PNCP'))lic.units.push(defaultUnit(s('IMA-LIC-PNCP','PNCP, fiscalização e controle das contratações','Lei 14.133/2021','Conferir nas pastas 14–15; complemento por leitura e questões','COMPLEMENTO'),2011));
  // Não bloquear todo o curso por causa da pasta 01 (Vade Mecum PDF).
  const basics=['02','03','04','05','06','07','08'];
  const ready=basics.every(n=>dad?.units.some(u=>u.id==='ima-tha-dad-'+n&&u.theoryDone));
  for(const u of lic.units){u.hiddenFromRoute=!ready;u.deferred=!ready;u.unlockCondition='Concluir fundamentos de DAD — pastas 02–08 (a pasta 01 é somente Vade Mecum)';}
 }
 const dcon=subjects.find(x=>x.id==='dcon');
 if(dcon)for(const u of dcon.units){
  if(/^NELMA-DCON-(11|12|13|14)$/.test(u.id)||u.id.startsWith('NELMA-DCON-AV-')){
   u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='Material avançado ou fora do núcleo literal do IMA, histórico preservado';
  }
 }
 const afo=subjects.find(x=>x.id==='afo');
 if(afo)for(const u of afo.units){
  if(/afo-u-11$/.test(u.id)){u.hiddenFromRoute=false;u.deferred=false;u.imaLegacyStatus='LC 101/2000 obrigatória';}
 }
 st.imaAudit={version:IMA_AUDIT_VERSION,exam:'2027-02-14',board:'FURB',proof:'Edital IMA-SC 001/2026 Anexo V pp. 56–59',topicTotal:IMA_TOPIC_TOTAL,
  cautions:['Curso Gran declara exclusões e não representa cobertura completa','FURB cobra cinco alternativas, não itens Cebraspe','Arquivos do aluno são ementas, não demonstram conclusão']};
 return st;
}
