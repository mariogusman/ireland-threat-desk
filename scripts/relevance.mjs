// Shared by the collector and the browser, including for older cached snapshots.
// Require a specific incident, warning or service impact; broad words such as
// "storm", "Garda", "HSE", "emergency", "AI" or "data" alone are insufficient.
const CYBER = /\b(?:cyber[ -]?(?:attacks?|incidents?|threats?|security|espionage)|ransomware|malware|phishing|ddos|zero[ -]day|data breach(?:es)?|data leaks?|credential theft|hackers?|hacked|security vulnerabilit(?:y|ies)|actively exploited|critical software flaws?)\b/i;
const ROUNDUP = /\b(?:quiz|quizzes|money diar(?:y|ies)|what happened today|here['’]s what happened|the 9 at 9|sitdown sunday|best of the box|winners and losers of the political week)\b/i;
const RETROSPECTIVE = /\b(?:court|trial|sentenc(?:e|ed|ing)|jailed|funeral|commemoration|inquiry|anniversary)\b/i;
const WEATHER = [
 /\b(?:status (?:yellow|orange|red)|weather warnings?|flood warnings?|flood alerts?|severe weather|flash flood(?:s|ing)?|coastal flood(?:s|ing)?|storm surge|cold snap|heatwave|heat wave|freezing fog|icy (?:roads?|stretches)|black ice)\b/i,
 /\b(?:storms?|flood(?:s|ing)?|snow|ice|frost|rain|wind|gales?|thunderstorms?|extreme heat|extreme cold)\b/i,
 /\b(?:warn(?:s|ed|ing|ings)?|forecast|expected|approach(?:es|ing)?|hit(?:s|ting)?|disrupt(?:s|ed|ion)?|evacuat\w*|clos(?:ed|ures?)|damage|danger|risk|spread|overnight)\b/i
];
export function newsTopic(item) {
 if(!item || typeof item.title!=='string')return '';
 const title=item.title, body=`${title} ${typeof item.summary==='string'?item.summary:''}`;
 if(item.source==='ncsc')return 'Cyber security';
 if(ROUNDUP.test(title))return '';
 if(CYBER.test(body))return 'Cyber security';
 if(RETROSPECTIVE.test(title))return '';
 if(WEATHER[0].test(title)||(WEATHER[1].test(title)&&WEATHER[2].test(body)))return 'Weather & flooding';
 if(/\b(?:boil[ -]water|do[ -]not[ -]drink|water contamination|gas leak|gas emergency|carbon monoxide (?:alarm|alert|warning|poisoning))\b/i.test(body))return 'Utilities & safety';
 if(/\b(?:power|electricity|water|gas supply|broadband|internet|telecoms?|mobile network|microsoft|teams|outlook|cloudflare|aws|google cloud|payment systems?)\b/i.test(title)
   && /\b(?:outages?|power cuts?|blackouts?|disrupt\w*|interrupt\w*|fail(?:ure|ures|ed)?|shortages?|ration\w*|restor\w*|down|unavailable)\b/i.test(body))return 'Service disruption';
 if(/\b(?:flights?|airports?|airspace|ferries|ferry|rail|railway|trains?|buses|bus services?|roads?|motorways?|traffic|transport|irish rail|dublin bus|luas)\b/i.test(title)
   && /\b(?:cancel\w*|delays?|delayed|disrupt\w*|clos(?:ed|ure|ures)|suspend\w*|restrict\w*|ground(?:ed|ing)|strikes?|shutdowns?)\b/i.test(body))return 'Travel disruption';
 if(/\b(?:public[ -]health (?:alert|warning|emergency)|disease outbreak|food recalls?|product recalls?|unsafe (?:food|products?)|contaminated (?:food|medicine)|pandemic|epidemic)\b/i.test(body)
   || (/\b(?:measles|meningitis|norovirus|avian flu|bird flu|influenza|e\.? coli|salmonella|listeria|cholera|covid[ -]?19)\b/i.test(title)&&/\b(?:outbreak|alert|warning|cases|spread|surge)\b/i.test(body)))return 'Public health';
 if(/\b(?:evacuat\w*|shelter[ -]in[ -]place|major incident|chemical spill|toxic (?:spill|plume|leak)|wildfires?|forest fires?)\b/i.test(title)
   || (/\b(?:fire|explosion|explosive device|bomb scare)\b/i.test(title)&&/\b(?:evacuat\w*|major|industrial|chemical|alert|warning|ongoing|emergency services|cordon|residents|homes)\b/i.test(body)))return 'Public safety';
 return '';
}
export function filterRelevantNews(items) {
 return items.map(item=>({...item,topic:newsTopic(item)})).filter(item=>item.topic);
}
