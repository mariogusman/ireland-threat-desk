import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {collect} from './feeds.mjs';
let old={};try{old=JSON.parse(await readFile('data/status.json','utf8'));}catch{}
const result=await collect(old);
await mkdir('data',{recursive:true});
await writeFile('data/status.json.tmp',JSON.stringify(result,null,2)+'\n');
await rename('data/status.json.tmp','data/status.json');
for(const s of Object.values(result.sources)) console.log(`${s.name}: ${s.ok?'OK':'UNAVAILABLE'} (${s.items.length} items)${s.error?' — '+s.error:''}`);
if(!Object.values(result.sources).some(x=>x.ok))process.exitCode=1;
