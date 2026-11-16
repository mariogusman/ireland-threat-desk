import {filterRelevantNews} from './relevance.mjs';
export const SOURCES = [
  {id:'met', name:'Met Éireann', kind:'weather', url:'https://www.met.ie/Open_Data/json/warning_IRELAND.json', home:'https://www.met.ie/warnings-today.html'},
  {id:'ncsc', name:'NCSC Ireland', kind:'cyber', url:'https://www.ncsc.gov.ie/news/alerts.rss', home:'https://www.ncsc.gov.ie/news/'},
  {id:'journal', name:'TheJournal.ie', kind:'news', url:'https://www.thejournal.ie/feed/', home:'https://www.thejournal.ie/'},
  {id:'rte', name:'RTÉ News', kind:'news', url:'https://www.rte.ie/feeds/rss/?index=/news/ireland/', home:'https://www.rte.ie/news/ireland/'}
];
export function text(value='') {
  return String(value).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]*>/g,' ').replace(/&#(x[\da-f]+|\d+);/gi,(_,n)=>{const c=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n);return c>0 && c<=0x10ffff?String.fromCodePoint(c):'';}).replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' '})[m]).replace(/\s+/g,' ').trim();
}
export function safeUrl(value,base) {
  try {const u=new URL(value,base);return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}
}
export function parseRSS(xml, source) {
  if(!/<(?:rss|feed)(?:\s|>)/i.test(xml)) throw new Error('Source did not return an RSS/Atom feed');
  const items=[...xml.matchAll(/<(?:item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/(?:item|entry)>/gi)];
  if (!items.length && !/<channel[\s>]|<feed[\s>]/i.test(xml)) throw new Error('Invalid feed');
  return items.slice(0,50).map(([,entry])=>{
    const tag=(name)=>entry.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'))?.[1]||'';
    const link=tag('link') || entry.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] || tag('guid');
    const url=safeUrl(text(link),source.home), title=text(tag('title'));
    const published=Date.parse(text(tag('pubDate')||tag('published')||tag('updated')||tag('dc:date')));
    return {id:url,title,url,summary:text(tag('description')||tag('summary')||tag('content')).slice(0,650),published:Number.isFinite(published)?new Date(published).toISOString():null,source:source.id,kind:source.kind};
  }).filter(x=>x.title&&x.url);
}
export function parseWarnings(data) {
  if(!Array.isArray(data)) throw new Error('Met Éireann returned an unexpected format');
  const grouped=new Map();
  for(const w of data){
    if(!w.headline || !Number.isFinite(Date.parse(w.expiry)) || !Number.isFinite(Date.parse(w.onset)) || !['yellow','orange','red','green'].includes(String(w.level).toLowerCase())) throw new Error('Unrecognised warning data');
    if(w.level==='green')continue;
    const key=[w.headline,w.onset,w.expiry,w.level].join('|');
    const old=grouped.get(key);
    if(old){if(!old.types.includes(w.type))old.types.push(text(w.type));continue;}
    grouped.set(key,{id:String(w.capId||w.id),title:text(w.headline),description:text(w.description),level:w.level.toLowerCase(),types:[text(w.type)],onset:w.onset,expiry:w.expiry,issued:w.updated||w.issued,url:'https://www.met.ie/warnings-today.html'});
  }
  return [...grouped.values()];
}
export async function collect(previous={sources:{}},fetcher=fetch) {
  const now=new Date().toISOString();
  const sources=await Promise.all(SOURCES.map(async s=>{
    try{
      const r=await fetcher(s.url,{headers:{'User-Agent':'IrelandThreatDesk/1.0 (+https://github.com/mariogusman/ireland-threat-desk)','Accept':'application/json, application/rss+xml, application/xml, text/xml'},signal:AbortSignal.timeout(18000)});
      if(!r.ok)throw new Error(`HTTP ${r.status}`);
      const body=await r.text();
      const parsed=s.kind==='weather'?parseWarnings(JSON.parse(body)):parseRSS(body,s);
      if(s.kind!=='weather'&&!parsed.length)throw new Error('Feed contained no readable items');
      const items=s.kind==='weather'?parsed:filterRelevantNews(parsed);
      return [s.id,{...s,ok:true,checkedAt:now,fetchedAt:now,items}];
    }catch(e){const old=previous.sources?.[s.id];return [s.id,{...s,ok:false,checkedAt:now,fetchedAt:old?.fetchedAt||null,error:String(e.message).slice(0,180),items:s.kind==='weather'?(old?.items||[]):filterRelevantNews(old?.items||[])}];}
  }));
  return {version:1,generatedAt:now,sources:Object.fromEntries(sources)};
}
