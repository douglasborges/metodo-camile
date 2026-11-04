// Catálogo do Combo: "Disciplina de INFO e TI_Dados - Rodrigo.pdf" pp. 3–29 (04/11/2026).
// 67 módulos, 222 videoaulas de teoria; 32 videoaulas de questões (500 questões anunciadas).
// As capturas mostram os números das aulas, mas NÃO títulos individuais: manter "Aula n".
const rows=`
Hardware e Software|13|6
Windows 10|9|7
Windows 11|6|7
Linux|5|8
Software Livre|2|8
Word 2019|12|9
Excel 2019|18|10
PowerPoint 2019|3|11
Word 365|9|12
Excel 365|14|12
PowerPoint 365|1|12
LibreOffice Writer 7|9|13
LibreOffice Calc 7|12|13
LibreOffice Impress 7|1|13
Segurança da Informação|8|14
Tokens|1|14
LGPD|6|15
Redes de Computadores, Internet e Intranet|9|15
Correio Eletrônico|1|16
Outlook 2019|1|16
Outlook 365|1|16
Outlook Express|1|16
Mozilla Thunderbird|1|16
Webmail|1|17
Gmail|5|17
Navegadores|1|18
Google Chrome|5|18
Mozilla Firefox|5|18
Microsoft Edge|5|19
Internet Explorer 11|3|19
Busca e Pesquisa|3|19
Banco de Dados - Conceitos e Características|5|20
Educação a distância|1|21
MS-Teams|1|21
WebEx|1|21
Skype|1|21
Hangouts|1|21
Google Drive|1|22
Google Meet|1|22
Google Agenda|1|22
Utilitários - compactadores, chat, e-mail, vídeo, imagem e antivírus|1|22
Acesso a distância a computadores e transferência de arquivos|1|22
Tecnologias e Ferramentas Multimídia|1|23
Computação em Nuvem|1|23
Transferência de Arquivos e Dados|1|23
URL e Links|1|23
Redes Sociais|2|23
Proteção de estações de trabalho|1|24
Sistemas de suporte à decisão e inteligência de negócio|1|24
Fundamentos sobre análise de dados|1|24
Noções de videoconferência|2|24
Internet das coisas (IoT)|1|24
Ferramentas Colaborativas|1|25
Google Documentos|2|25
Google Planilha|3|25
Google Sala de Aula|1|25
Google Formulários|1|25
Google Apresentações|2|26
Backup|1|26
Celulares e Tablets|1|26
Moedas Virtuais|1|26
Big data|1|26
Teoria Geral de Sistemas - TGS|1|27
Sistemas de Informação e Teoria da Informação|2|27
Metadados de arquivos|1|27
API|1|27
Inteligência Artificial e Aprendizado de Máquina|5|28
`.trim().split('\n').map(line=>{const [title,n,page]=line.split('|');return{title,count:Number(n),sourcePage:Number(page)};});
export const BASE_ORDER=Object.freeze([1,3,9,10,11,12,13,14,18,26,27,31,46,45,19,24,25,21,15,16,59,48,17,4,5,44,53,34,38,39,40,54,55,57,41,42,32,49,50,62]);
export const BASE_BRIDGE=Object.freeze([32,49,50,62]);
export const LEGACY_RESERVE=Object.freeze([22,30,36,37]);
export const COMBO_GROUPS=Object.freeze(rows.map((r,i)=>Object.freeze({...r,
 id:'rs-info-'+String(i+1).padStart(2,'0'),number:i+1,
 track:BASE_BRIDGE.includes(i+1)?'ponte':BASE_ORDER.includes(i+1)?'essencial':LEGACY_RESERVE.includes(i+1)?'reserva':'sob-edital',
 activeOrder:BASE_ORDER.indexOf(i+1)+1
})));
export const COMBO_QUESTIONS=Object.freeze([
 'Redes e Internet','Segurança da Informação','Excel','Word','PowerPoint','Windows',
 'Linux','Navegadores','Correio Eletrônico','LibreOffice Writer','LibreOffice Calc','LibreOffice Impress',
 'Hardware e Software','Banco de Dados','Computação em Nuvem','Big Data',
 'Python','Linguagem R','Aprendizado de Máquina','Teoria Geral de Sistemas e Sistemas de Informação',
 'Mineração de Dados, Metadados e API','Internet e Intranet','Segurança da Informação 2','Excel 2',
 'Word 2','Windows Parte 2','LibreOffice Writer Parte 2','LibreOffice Calc Parte 2',
 'Questões Diversas Parte 1','Questões Diversas Parte 2','Questões Diversas Parte 3','Windows 11'
]);
export const COMBO_COUNTS=Object.freeze({
 theory:COMBO_GROUPS.reduce((n,r)=>n+r.count,0),
 base:COMBO_GROUPS.filter(x=>x.track==='essencial').reduce((n,r)=>n+r.count,0),
 bridge:COMBO_GROUPS.filter(x=>x.track==='ponte').reduce((n,r)=>n+r.count,0),
 questions:COMBO_QUESTIONS.length
});
if(COMBO_COUNTS.theory!==222||COMBO_COUNTS.base!==131||COMBO_COUNTS.bridge!==8||COMBO_COUNTS.questions!==32)throw Error('Catálogo Combo VEON: confira contagens com PDF.');
