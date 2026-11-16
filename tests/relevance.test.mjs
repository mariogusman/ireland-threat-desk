import test from 'node:test';
import assert from 'node:assert/strict';
import {newsTopic,filterRelevantNews} from '../scripts/relevance.mjs';
import {collect} from '../scripts/feeds.mjs';
const news=(title,summary='')=>({title,summary,source:'journal',kind:'news',url:'https://www.thejournal.ie/report/'});
test('relevant warnings and service impacts are retained and categorised',()=>{
 const cases=[
  ['Frost and icy stretches forecast to spread overnight','','Weather & flooding'],
  ['Cold snap to hit country with lows of -3C forecast','','Weather & flooding'],
  ['Status Orange rain warning for Cork','','Weather & flooding'],
  ['Storm Éowyn approaches Ireland','Met Éireann warns of dangerous winds.','Weather & flooding'],
  ['Water supply interrupted across Cork','','Service disruption'],
  ['Thousands without power after network outage','','Service disruption'],
  ['Microsoft services fully restored after global outage','','Service disruption'],
  ['Boil water notice issued for Galway','','Utilities & safety'],
  ['Residents told to avoid taps','A do-not-drink notice follows water contamination.','Utilities & safety'],
  ['Some Irish flights affected by US cancellations, delays','','Travel disruption'],
  ['Dublin traffic restrictions on second day of EU meetings','','Travel disruption'],
  ['Irish Rail services suspended after signal failure','','Travel disruption'],
  ['Ransomware attack affects Irish hospitals','','Cyber security'],
  ['Hackers steal customer records','','Cyber security'],
  ['Bank confirms data breach','','Cyber security'],
  ['Public health alert after measles outbreak','','Public health'],
  ['Food recall announced over listeria risk','','Public health'],
  ['Homes evacuated following chemical spill','','Public safety'],
  ['Factory explosion prompts warning to residents','','Public safety']
 ];
 for(const [title,summary,topic]of cases)assert.equal(newsTopic(news(title,summary)),topic,title);
});
test('general news, broad trigger words and historical incidents do not enter the desk',()=>{
 const cases=[
  ['Quiz: How much do you know about storms?','Storm season is upon us.'],
  ['The 9 at 9: Sunday','Irish flights delayed; frost and icy stretches forecast.'],
  ["Here's What Happened Today: Sunday",'Flood warnings announced.'],
  ['Three castles boiling: Coddle weather is here','Try this warming recipe.'],
  ['Christmas is coming! Want to be prepared? How about keeping a Money Diary for us?',''],
  ['Scotland grind out narrow Murrayfield win against Australia',''],
  ['What you need to know about The Altruists on Netflix','The series stars an Irish actor.'],
  ['Senator takes political rivals by storm','A storm over party funding.'],
  ['Record 18,065 people in emergency accommodation',''],
  ["CUH staff fearful of meetings amid recording concerns",'The HSE chief spoke publicly.'],
  ['Gardaí investigate after body found in park',''],
  ['Teenager jailed after high-speed pursuit through Tallaght',''],
  ['Man held after allegedly pulling fake gun on bus driver',''],
  ['Hundreds attend commemoration event for road victims',''],
  ["Garda-MI5 source drove Omagh bomb car - former officer",'A public inquiry into the 1998 attack.'],
  ['Coalition discusses AI at summit',''],
  ['Shop around to save on insurance','New financial data released.'],
  ['Is it worth paying more for an SEAI-registered installer?',''],
  ['Why young people are not becoming landlords',''],
  ['Domestic economy to grow 3.5% this year','']
 ];
 for(const [title,summary]of cases)assert.equal(newsTopic(news(title,summary)),'',title);
});
test('NCSC Ireland advisories stay visible without relying on headline keywords',()=>{
 assert.equal(newsTopic({...news('CVE-2026-1234 — action required'),source:'ncsc'}),'Cyber security');
 assert.equal(newsTopic({...news('Unrelated entertainment'),kind:'cyber'}),'');
 assert.equal(newsTopic(null),'');
});
test('cached topic labels cannot bypass the current relevance rules',()=>{
 const items=filterRelevantNews([{...news('Celebrity returns to Dublin'),topic:'Public safety'},news('Power outage hits Dublin')]);
 assert.equal(items.length,1);assert.equal(items[0].topic,'Service disruption');
});
test('a working general-news feed with zero relevant articles remains healthy',async()=>{
 const xml='<rss><channel><item><title>Singer announces Irish tour</title><link>https://example.org/tour/</link></item></channel></rss>';
 const result=await collect({},async url=>({ok:true,text:async()=>url.includes('warning_IRELAND')?'[]':xml}));
 assert.equal(result.sources.journal.ok,true);assert.deepEqual(result.sources.journal.items,[]);
 assert.equal(result.sources.rte.ok,true);assert.deepEqual(result.sources.rte.items,[]);
 assert.equal(result.sources.ncsc.items.length,1);
});
test('failed refresh filters previously saved general news and retains the original retrieval time',async()=>{
 const previous={sources:{journal:{fetchedAt:'2026-11-15T22:00:00Z',items:[news('Singer announces tour'),news('Power outage affects Cork')]}}};
 const result=await collect(previous,async()=>{throw new Error('Offline');});
 assert.equal(result.sources.journal.ok,false);assert.equal(result.sources.journal.fetchedAt,previous.sources.journal.fetchedAt);
 assert.equal(result.sources.journal.items.length,1);assert.equal(result.sources.journal.items[0].title,'Power outage affects Cork');
});
