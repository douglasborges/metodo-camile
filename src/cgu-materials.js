// Plano mestre de materiais · Camile · CGU 2026 · Auditoria
// Derivado das decisões do chat “Análise De Cursos para a CGU [2026] e para o TCU”.
// Regra: fonte principal primeiro; complemento somente depois; pacote genérico apenas para lacuna/atualização.

export const MATERIAL_PLAN=Object.freeze({
 port:{
  label:'Português',
  principal:['Marcello Giullian · curso integral · manter até concluir'],
  complement:['Andresan · resolução de questões Cebraspe por assunto'],
  avoid:['Não reabrir teoria equivalente do Estratégia/Direção enquanto o mesmo assunto estiver sendo coberto pelo Marcello.'],
  order:'Marcello → questões Andresan → pacote somente se surgir lacuna objetiva do edital.'
 },
 dcon:{
  label:'Direito Constitucional',
  principal:['Nelma Fontana · curso principal'],
  complement:['Estratégia · Art. 5º em 24 videoaulas, como ponte específica','Estratégia/Direção · somente atualização ou lacuna que a Nelma não cubra'],
  avoid:['Não duplicar no pacote geral assuntos já concluídos pela Nelma.','Não considerar Art. 5º concluído antes de terminar a ponte específica e os exercícios previstos.'],
  order:'Nelma Aula 01 → ponte do Art. 5º pelo Estratégia → retomar Nelma → lacunas do edital.'
 },
 afo:{
  label:'AFO / Finanças Públicas',
  principal:['Leandro Ravyelle · BizurAFO · primeira passagem e organização da disciplina'],
  complement:['Estratégia/Direção · somente lacunas do novo edital quando os pacotes terminarem a atualização'],
  avoid:['Não repetir no pacote aula equivalente já coberta pelo BizurAFO sem necessidade de atualização.','Módulo 13 · Regime de Ajustes Fiscais permanece fora do primeiro giro.'],
  order:'BizurAFO em sequência → baterias/checkpoints do Método ET → lacunas pós-atualização.'
 },
 ti:{
  label:'Dados e IA',
  principal:['Ramon · TI TOTAL · trilha CGU'],
  complement:['Estratégia/Direção · somente lacunas específicas do edital após atualização dos pacotes'],
  avoid:['Não transformar a trilha da Camile em um curso completo de TI sem relação com o edital.','TI07 e TI62 ficam como reserva neste primeiro giro.'],
  order:'FD01 → TI60 → TI63 → TI83 → Monitoria 36 → TI37-I → TI36 → TI61 → TI35 → TI97 → lacunas.'
 },
 'adm-publica':{
  label:'Administração Pública / Governança',
  principal:['Marcelo · Administração Pública · material definido no plano mestre'],
  complement:['Estratégia/Direção · governança, riscos, integridade e demais lacunas específicas do edital'],
  avoid:['Não assistir no pacote a mesma teoria já concluída no curso principal.'],
  order:'Marcelo Administração Pública → complemento de governança/riscos/integridade → lacunas do edital.'
 },
 diversidade:{
  label:'Sociedade, Desigualdades e Diversidade',
  principal:['Estratégia/Direção · pacote CGU atualizado, conforme disponibilidade'],
  complement:['Questões Cebraspe e revisão do próprio material'],
  avoid:['Não abrir materiais paralelos antes de o pacote atualizado mostrar uma lacuna real.'],
  order:'Pacote CGU → questões → revisão/checkpoint.'
 },
 dad:{
  label:'Direito Administrativo',
  principal:['Rafael Oliveira · curso principal'],
  complement:['Herbert Almeida · atualização, legislação e lacunas pontuais','Estratégia/Direção · apenas o que continuar faltando após Rafael + Herbert'],
  avoid:['Não duplicar no pacote geral tema já estudado pelo Rafael.','Usar Herbert como complemento, não como reinício integral da disciplina.'],
  order:'Rafael Oliveira → Herbert seletivo → lacunas finais do edital.'
 },
 politicas:{
  label:'Políticas Públicas e Avaliação',
  principal:['Estratégia · curso de Políticas Públicas/Avaliação · fonte principal'],
  complement:['Marcelo Soares · material já adquirido · uso seletivo onde acrescentar à avaliação e aos métodos'],
  avoid:['Não usar Direção como fonte desta disciplina neste plano.','Não adquirir/reabrir curso próprio do Rodrigo Rennó.','Não repetir no Marcelo Soares tópico já plenamente fechado pelo Estratégia sem ganho metodológico.'],
  order:'Estratégia PP/Avaliação → Marcelo Soares seletivo → questões e lacunas.'
 },
 auditoria:{
  label:'Auditoria Governamental',
  principal:['Marcelo Soares · curso principal e prioridade máxima'],
  complement:['Estratégia/Direção · somente lacunas do edital CGU 2026 após o curso principal'],
  avoid:['Não começar pelo pacote genérico antes do Marcelo.','Não duplicar aula equivalente apenas porque o pacote foi atualizado.'],
  order:'Marcelo Soares → pacote atualizado somente para lacunas → questões/checkpoints.'
 }
});

export const CYCLE_SOURCE_LABEL=Object.freeze({
 port:'Marcello · próxima etapa sequencial',
 dcon:'Nelma / ponte Art. 5º · próxima etapa do Método ET',
 afo:'BizurAFO · próximo módulo elegível / revisão correspondente',
 ti:'Ramon TI TOTAL · próxima aula da trilha CGU',
 'adm-publica':'Marcelo · Administração Pública · próxima etapa',
 diversidade:'Pacote CGU · próximo tópico de Diversidade',
 dad:'Rafael Oliveira · próxima etapa · Herbert só complemento',
 politicas:'Estratégia PP/Avaliação · próxima etapa · Marcelo Soares seletivo',
 auditoria:'Marcelo Soares · próxima etapa de Auditoria'
});

export function materialPlanFor(id){return MATERIAL_PLAN[id]||null;}
export function cycleSourceLabel(id){return CYCLE_SOURCE_LABEL[id]||id;}
