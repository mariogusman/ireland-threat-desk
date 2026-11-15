import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,cleanPlan,quantities,isFresh,activeWarnings,inCounty,safeURL,COUNTY_COORDS,KIT} from '../core.js';
import {parseWarnings,parseRSS,collect,SOURCES} from '../scripts/feeds.mjs';
const now=Date.parse('2026-11-15T23:00:00Z');
test('household quantities scale correctly and checklist checks are unique',()=>{
 const p=cleanPlan({people:4,days:7,checks:['water','water','invented']});assert.deepEqual(p.checks,['water']);assert.equal(quantities(p).water,112);assert.equal(quantities(p).meals,84);assert.equal(quantities(p).percent,Math.round(100/KIT.length));
});
test('invalid backups are bounded and do not introduce unknown fields',()=>{
 const p=cleanPlan({people:-4,days:100000,county:'Belfast',contact:'x'.repeat(1000),checks:'water',outageStart:Date.now()+1000000,waterStock:-5,theme:'invalid',injected:true});assert.equal(p.people,2);assert.equal(p.days,3);assert.equal(p.county,'All counties');assert.equal(p.contact.length,250);assert.equal(p.outageStart,null);assert.equal(p.waterStock,0);assert.equal(p.injected,undefined);assert.deepEqual(cleanPlan(null),defaults());assert.equal(Object.keys(COUNTY_COORDS).length,26);
});
test('a failed, old or future check can never report current weather',()=>{
 const src={ok:true,fetchedAt:new Date(now-5*60000).toISOString()};assert.equal(isFresh(src,30,now),true);assert.equal(isFresh({...src,ok:false},30,now),false);assert.equal(isFresh({...src,fetchedAt:new Date(now-31*60000).toISOString()},30,now),false);assert.equal(isFresh({...src,fetchedAt:new Date(now+5*60000).toISOString()},30,now),false);
});
test('expired warnings are removed, upcoming warnings remain visible',()=>{
 const warnings=activeWarnings({items:[{expiry:'2026-11-15T22:00:00Z'},{expiry:'2026-11-17T00:00:00Z',onset:'2026-11-16T12:00:00Z'}]},now);assert.equal(warnings.length,1);
});
test('county matching avoids partial-name collisions and retains national warnings',()=>{
 assert.equal(inCounty({title:'Wind warning for Westmeath'},'Meath'),false);assert.equal(inCounty({title:'Wind warning for Cork, Waterford'},'Cork'),true);assert.equal(inCounty({title:'Wind warning for Ireland'},'Dublin'),true);assert.equal(inCounty({title:'Wind warning for Kerry'},'All counties'),true);
});
test('Met warnings merge duplicate hazard notices and reject malformed data',()=>{
 const base={headline:'Wind and rain warning for Cork',onset:'2026-11-16T12:00:00Z',expiry:'2026-11-17T00:00:00Z',level:'yellow',description:'<p>Strong &amp; gusty.</p>'};const list=parseWarnings([{...base,id:1,type:'Wind'},{...base,id:2,type:'Rain'}]);assert.equal(list.length,1);assert.deepEqual(list[0].types,['Wind','Rain']);assert.equal(list[0].description,'Strong & gusty.');assert.throws(()=>parseWarnings({}));assert.throws(()=>parseWarnings([{...base,expiry:'bad'}]));assert.deepEqual(parseWarnings([]),[]);
});
test('RSS parser supports Irish feed CDATA, dates, links and safe plain text',()=>{
 const xml='<rss><channel><item><title><![CDATA[A &amp; B]]></title><link>https://www.ncsc.gov.ie/report?a=1&amp;b=2</link><pubDate>Sun, 15 Nov 2026 12:00:00 GMT</pubDate><description><![CDATA[<p>A notice <strong>today</strong></p>]]></description></item><item><title>Unsafe</title><link>javascript:alert(1)</link></item></channel></rss>';const parsed=parseRSS(xml,SOURCES[1]);assert.equal(parsed.length,1);assert.equal(parsed[0].title,'A & B');assert.equal(parsed[0].url,'https://www.ncsc.gov.ie/report?a=1&b=2');assert.equal(parsed[0].summary,'A notice today');assert.equal(parsed[0].published,'2026-11-15T12:00:00.000Z');assert.throws(()=>parseRSS('<html>Denied</html>',SOURCES[1]));assert.equal(safeURL('javascript:alert(1)'), '');
});
test('Atom feeds parse alternate links and malformed dates safely',()=>{
 const result=parseRSS('<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Notice</title><link href="/report"/><updated>invalid</updated><summary>Notice</summary></entry></feed>',SOURCES[1]);assert.equal(result[0].url,'https://www.ncsc.gov.ie/report');assert.equal(result[0].published,null);
});
test('source failure retains last known data and timestamp without claiming success',async()=>{
 const old={sources:{met:{fetchedAt:'2026-11-15T22:00:00Z',items:[{title:'Saved warning'}]}}};const result=await collect(old,async()=>{throw new Error('Offline');});assert.equal(result.sources.met.ok,false);assert.equal(result.sources.met.fetchedAt,old.sources.met.fetchedAt);assert.equal(result.sources.met.items[0].title,'Saved warning');assert.equal(result.sources.rte.fetchedAt,null);
});
