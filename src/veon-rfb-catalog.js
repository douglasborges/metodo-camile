// Curso RFB: pp. 31–36 do PDF fornecido em 04/11/2026.
// 37 aulas de conteúdo, 20 aulas de questões. Não presumir SQL, ETL ou bibliotecas não citadas.
const rows=[
 ['Fluência em dados',2,32],['Análise de dados',4,32],
 ['Aprendizado de Máquina e Inteligência Artificial',5,32],
 ['Processamento de Linguagem Natural',1,33],['Governança de Dados',2,33],
 ['Ciência de dados',3,33],['Big Data',5,33],['Computação em nuvens',2,34],
 ['Linguagem Python',4,34],['Linguagem R',4,34],
 ['Bancos de dados não relacionais',2,35],["Principais SGBD's",3,35]
];
export const RFB_ORDER=Object.freeze([1,6,2,5,12,11,7,8,3,4,9,10]);
export const RFB_GROUPS=Object.freeze(rows.map(([title,count,sourcePage],i)=>Object.freeze({
 id:'rs-rfb-'+String(i+1).padStart(2,'0'),number:i+1,title,count,sourcePage,
 track:'fase2',activeOrder:RFB_ORDER.indexOf(i+1)+1
})));
export const RFB_COUNTS=Object.freeze({
 theory:RFB_GROUPS.reduce((n,x)=>n+x.count,0),
 questionVideos:20
});
if(RFB_COUNTS.theory!==37)throw Error('Catálogo RFB: total de aulas não confere.');
