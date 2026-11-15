export const STORAGE_KEY='ireland-threat-desk-v1';
export const COUNTY_COORDS={Carlow:[52.84,-6.93],Cavan:[53.99,-7.36],Clare:[52.84,-8.99],Cork:[51.90,-8.47],Donegal:[54.95,-7.73],Dublin:[53.35,-6.26],Galway:[53.27,-9.05],Kerry:[52.27,-9.70],Kildare:[53.22,-6.66],Kilkenny:[52.65,-7.25],Laois:[53.03,-7.30],Leitrim:[53.95,-8.09],Limerick:[52.66,-8.63],Longford:[53.73,-7.80],Louth:[54.00,-6.40],Mayo:[53.86,-9.30],Meath:[53.65,-6.68],Monaghan:[54.25,-6.97],Offaly:[53.27,-7.49],Roscommon:[53.63,-8.19],Sligo:[54.27,-8.47],Tipperary:[52.47,-8.16],Waterford:[52.26,-7.11],Westmeath:[53.53,-7.34],Wexford:[52.34,-6.46],Wicklow:[52.98,-6.05]};
export const CONTACTS=[
 {name:'Emergency services',number:'112',also:'999',detail:'Ambulance, Gardaí, fire service and Coast Guard. For immediate danger or a life-threatening emergency.',url:'https://www.112.ie/',label:'112 / 999 Ireland',emergency:true},
 {name:'ESB Networks',number:'1800 372 999',detail:'Electricity emergencies and dangerous or fallen power lines. Stay well clear of wires, even if the power appears off.',url:'https://www.esbnetworks.ie/',label:'ESB Networks official contact'},
 {name:'Gas Networks Ireland',number:'1800 20 50 50',detail:'If you smell gas, leave the area and call from a safe place. Avoid flames, electrical switches and phones near the leak.',url:'https://www.gasnetworks.ie/gas-safety/emergency-numbers',label:'Gas emergency contacts'},
 {name:'Uisce Éireann',number:'1800 278 278',detail:'Urgent public water and wastewater issues, 24 hours a day. Check your address for supply updates and boil water notices.',url:'https://www.water.ie/contact',label:'Uisce Éireann official contact'},
 {name:'Samaritans',number:'116 123',detail:'Free, confidential emotional support, day or night. In immediate danger, call 112 or 999.',url:'https://www.samaritans.org/ireland/how-we-can-help/contact-samaritan/',label:'Samaritans Ireland'},
 {name:'Garda Confidential',number:'1800 666 111',detail:'Provide information confidentially. For an emergency, use 112 or 999. Contact your local Garda station for routine matters.',url:'https://www.garda.ie/',label:'An Garda Síochána'}
];
export const SERVICES=[
 {name:'Power outages',source:'ESB NETWORKS',detail:'Check PowerCheck for local faults and estimated restoration times.',url:'https://powercheck.esbnetworks.ie/',link:'Open the outage map'},
 {name:'Water supply',source:'UISCE ÉIREANN',detail:'Find interruptions and boil water notices for your address.',url:'https://www.water.ie/help/supply',link:'Check supply updates'},
 {name:'Flood information',source:'OFFICE OF PUBLIC WORKS',detail:'View flood maps and preparation guidance. Maps are not live flood alerts.',url:'https://www.floodinfo.ie/',link:'Open FloodInfo.ie'},
 {name:'Health advice',source:'HSE',detail:'Find health guidance, urgent care and GP out-of-hours services.',url:'https://www2.hse.ie/',link:'Go to HSE services'},
 {name:'Local Garda information',source:'AN GARDA SÍOCHÁNA',detail:'Read official notices and find your local Garda station.',url:'https://www.garda.ie/',link:'Go to Garda.ie'},
 {name:'Travel & road conditions',source:'TRANSPORT INFRASTRUCTURE IRELAND',detail:'Check national road traffic and incidents before travelling.',url:'https://traffic.tii.ie/',link:'Check TII traffic'}
];
export const KIT=[
 {id:'water',group:'Water & food',name:'Safe drinking water',detail:(p,d)=>`${p*d*4} litres for ${p} people over ${d} days: a planning allowance of 4 L per person per day for drinking and food preparation. Add water for hygiene, pets and medical needs.`},
 {id:'food',group:'Water & food',name:'A shelf-stable food supply',detail:(p,d)=>`${p*d*3} person-meals for ${d} days. Include food that can be eaten without cooking; check allergies and dietary needs.`},
 {id:'opener',group:'Water & food',name:'Manual tin opener & utensils',detail:()=> 'Include clean containers and a way to wash hands safely.'},
 {id:'pets',group:'Water & food',name:'Infant, pet & dietary supplies',detail:()=> 'Allow extra food, water and any specialist feeding equipment needed in your household.'},
 {id:'light',group:'Light & communication',name:'Torches and spare batteries',detail:p=>`Plan a torch for each person (${p}) and keep them somewhere easy to find. Prefer torches to candles.`},
 {id:'battery',group:'Light & communication',name:'Charged power banks & cables',detail:()=> 'Charge regularly. Write down important numbers before your phone battery runs low.'},
 {id:'radio',group:'Light & communication',name:'Battery or wind-up radio',detail:()=> 'Know how to tune to RTÉ Radio 1 and a local radio station for public information.'},
 {id:'alerts',group:'Light & communication',name:'Official information bookmarked',detail:()=> 'Save Met Éireann, ESB PowerCheck, Uisce Éireann, HSE and your local authority.'},
 {id:'meds',group:'Health & warmth',name:'Prescribed medicines plan',detail:()=> 'Ask your pharmacist about continuity and refrigerated medicines. Do not alter your prescription or stockpile.'},
 {id:'firstaid',group:'Health & warmth',name:'First aid kit',detail:()=> 'Include your household’s medical information and check expiry dates.'},
 {id:'warmth',group:'Health & warmth',name:'Warm layers & blankets',detail:p=>`Warm, dry layers for ${p} people. Keep one room comfortable and check on vulnerable neighbours.`},
 {id:'co',group:'Health & warmth',name:'Working smoke & carbon monoxide alarms',detail:()=> 'Test regularly. Never use a camping stove, barbecue or generator inside a home, tent, garage or enclosed space.'},
 {id:'hygiene',group:'Home & essentials',name:'Hygiene and sanitation supplies',detail:()=> 'Soap, hand sanitiser, toilet supplies, sanitary products, nappies and refuse bags as needed.'},
 {id:'documents',group:'Home & essentials',name:'Copies of essential documents',detail:()=> 'Keep insurance, ID and medical information secure, with a paper copy of your contact plan.'},
 {id:'cash',group:'Home & essentials',name:'Some cash & essential keys',detail:()=> 'Card payments and ATMs may be unavailable. Keep keys and essentials accessible.'},
 {id:'neighbours',group:'Home & essentials',name:'Household & neighbour contact plan',detail:()=> 'Agree a meeting place and an out-of-area contact. Plan for mobility, access and caring needs.'},
 {id:'shutoffs',group:'Home & essentials',name:'Know your utility shut-offs',detail:()=> 'Locate the water stopcock and fuse board. Follow provider instructions; do not attempt repairs.'},
 {id:'bag',group:'Home & essentials',name:'Ready-to-go essentials bag',detail:()=> 'Pack medicines, a torch, charger, documents, water, a snack and spare warm clothing.'}
];
export function defaults(){return {people:2,days:3,county:'All counties',checks:[],contact:'',meeting:'',theme:'light',outageStart:null,waterStock:0};}
export function cleanPlan(raw){
 const d=defaults();if(!raw||typeof raw!=='object'||Array.isArray(raw))return d;
 const int=(v,min,max,fall)=>Number.isInteger(Number(v))&&Number(v)>=min&&Number(v)<=max?Number(v):fall;
 return {people:int(raw.people,1,20,2),days:int(raw.days,1,14,3),county:raw.county==='All counties'||Object.hasOwn(COUNTY_COORDS,raw.county)?raw.county:d.county,checks:Array.isArray(raw.checks)?[...new Set(raw.checks.filter(x=>KIT.some(k=>k.id===x)))]:[],contact:typeof raw.contact==='string'?raw.contact.slice(0,250):'',meeting:typeof raw.meeting==='string'?raw.meeting.slice(0,250):'',theme:raw.theme==='dark'?'dark':'light',outageStart:Number.isFinite(raw.outageStart)&&raw.outageStart>0&&raw.outageStart<=Date.now()?raw.outageStart:null,waterStock:Math.min(100000,Math.max(0,Number(raw.waterStock)||0))};
}
export function isFresh(source,minutes,now=Date.now()) {const t=Date.parse(source?.fetchedAt);return source?.ok===true&&Number.isFinite(t)&&now-t>=-60000&&now-t<=minutes*60000;}
export function activeWarnings(source,now=Date.now()){return (source?.items||[]).filter(w=>Number.isFinite(Date.parse(w.expiry))&&Date.parse(w.expiry)>now);}
export function inCounty(w,county){if(county==='All counties')return true;const t=String(w.title||'');const named=Object.keys(COUNTY_COORDS).filter(c=>new RegExp(`\\b${c}\\b`,'i').test(t));return !named.length||named.includes(county);}
export function quantities(plan){return {water:plan.people*plan.days*4,meals:plan.people*plan.days*3,drinking:plan.people*plan.days*2,percent:Math.round(plan.checks.length/KIT.length*100)};}
export function safeURL(url){try{const u=new URL(url);return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}}
export function validSnapshot(data){
 return data?.version===1&&typeof data.sources==='object'&&data.sources!==null&&!Array.isArray(data.sources)&&['met','ncsc','journal','rte'].every(id=>{const s=data.sources[id];return s&&Array.isArray(s.items)&&s.items.length<=100&&typeof s.ok==='boolean';});
}
