import {routeStages} from "./archive/campaign-routes";
import {dossiers,weaponGuides,stageGuides,manual,exSource,combatSource,checked} from "./archive/dw8xl";
export type Faction = "SHU" | "WEI" | "WU" | "OTHER";

export type Officer = {
  id: string; name: string; mark: string; faction: Faction; title: string; alias: string;
  summary: string; spoiler?: string; weapon: string; tags: string[]; games: string[];
  style: string; sourceStatus: "reviewed" | "draft"; revision: string;
};

export type Game = {
  id: string; short: string; title: string; year: number; platforms: string[]; era: string;
  summary: string; distinction: string; officers: string[]; status: "reviewed" | "draft";
  edition?: string; modes?: string[]; sourceUrl?: string;
};

export type Battle = { id: string; name: string; year: string; factions: string[]; games: string[]; summary: string };
export type Weapon = { id: string; name: string; style: string; wielders: string[]; games: string[] };
export type OfficerProfile = {
  id:string; kingdom:string; role:string; moveset:string; unlock:string; relationships:string[];
  battles:string[]; biography:string; gameplay:string; spoiler:string;
  citations:{label:string;url:string;kind:string}[]; revisions:{version:number;date:string;summary:string}[];
};

export const officers: Officer[] = [
  {id:"zhuge-liang",name:"Zhuge Liang",mark:"亮",faction:"SHU",title:"The Sleeping Dragon",alias:"Kongming",summary:"Shu’s chief strategist, portrayed as the series’ emblem of foresight. Usually a ranged, control-oriented character.",spoiler:"His later Shu campaigns ask how long a plan can hold together after the person who made it is gone.",weapon:"Feather Fan",tags:["Ranged","Zone control","High skill ceiling"],games:["dw3","dw8","dw9"],style:"zhuge",sourceStatus:"reviewed",revision:"2026-08-13"},
  {id:"cao-cao",name:"Cao Cao",mark:"操",faction:"WEI",title:"The Ambitious Unifier",alias:"Mengde",summary:"The founding figure of Wei, presented as a pragmatic and ambitious unifier rather than a straightforward villain.",spoiler:"Later entries frame his campaigns as an argument that order must precede virtue.",weapon:"General’s Sword",tags:["Crowd clear","Beginner friendly"],games:["dw3","dw8","dw9"],style:"cao",sourceStatus:"reviewed",revision:"2026-08-13"},
  {id:"liu-bei",name:"Liu Bei",mark:"備",faction:"SHU",title:"The Benevolent Lord",alias:"Xuande",summary:"The founder of Shu, written throughout the series as the benevolence-first counterweight to Cao Cao’s pragmatism.",weapon:"Twin Swords",tags:["Balanced","Beginner friendly"],games:["dw3","dw8","dw9"],style:"liu",sourceStatus:"reviewed",revision:"2026-08-13"},
  {id:"sun-shangxiang",name:"Sun Shangxiang",mark:"尚",faction:"WU",title:"The Bow Princess",alias:"Lady Sun",summary:"A Wu warrior whose marriage to Liu Bei places her between two kingdoms—a recurring conflict of loyalty.",weapon:"Chakram",tags:["Ranged","Mobile"],games:["dw3","dw8","dw9"],style:"sun",sourceStatus:"reviewed",revision:"2026-08-13"},
  {id:"guan-yu",name:"Guan Yu",mark:"羽",faction:"SHU",title:"God of War",alias:"Yunchang",summary:"A towering Shu general defined by honor, loyalty, and the sweeping reach of the Green Dragon weapon tradition.",weapon:"Crescent Blade",tags:["Power","Wide reach"],games:["dw3","dw8","dw9"],style:"liu",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"zhang-fei",name:"Zhang Fei",mark:"飛",faction:"SHU",title:"The Fierce Tiger",alias:"Yide",summary:"A ferocious frontline fighter whose explosive temperament is matched by fierce devotion to his sworn brothers.",weapon:"Double Pike",tags:["Power","Close range"],games:["dw3","dw8","dw9"],style:"zhuge",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"zhao-yun",name:"Zhao Yun",mark:"雲",faction:"SHU",title:"The Young Dragon",alias:"Zilong",summary:"An agile spear fighter and enduring series icon, celebrated for composure, courage, and heroic rescue missions.",weapon:"Dragon Spear",tags:["Mobile","Combo"],games:["dw3","dw8","dw9"],style:"liu",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"xiahou-dun",name:"Xiahou Dun",mark:"惇",faction:"WEI",title:"The One-Eyed General",alias:"Yuanrang",summary:"Cao Cao’s steadfast cousin and a forceful close-range officer associated with direct, relentless pressure.",weapon:"Podao",tags:["Power","Aggressive"],games:["dw3","dw8","dw9"],style:"cao",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"dian-wei",name:"Dian Wei",mark:"韋",faction:"WEI",title:"The Ancient Evil",alias:"Dian Wei",summary:"A loyal bodyguard whose heavy attacks and self-sacrificing defense make him one of Wei’s most imposing officers.",weapon:"Axe",tags:["Heavy","Guard break"],games:["dw3","dw8","dw9"],style:"cao",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"sima-yi",name:"Sima Yi",mark:"懿",faction:"WEI",title:"The Calculating Strategist",alias:"Zhongda",summary:"A rival strategist whose patience and ambition gradually shift the center of power beyond the three kingdoms.",weapon:"Horsehair Whip",tags:["Ranged","Control"],games:["dw3","dw8","dw9"],style:"cao",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"sun-jian",name:"Sun Jian",mark:"堅",faction:"WU",title:"The Tiger of Jiangdong",alias:"Wentai",summary:"The patriarch of the Sun family, portrayed as an audacious vanguard whose legacy becomes the foundation of Wu.",weapon:"Nine Rings Blade",tags:["Balanced","Rushdown"],games:["dw3","dw8","dw9"],style:"sun",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"sun-ce",name:"Sun Ce",mark:"策",faction:"WU",title:"The Little Conqueror",alias:"Bofu",summary:"A charismatic young conqueror whose rapid campaign establishes the territory his family will turn into Wu.",weapon:"Tonfa",tags:["Fast","Close range"],games:["dw3","dw8","dw9"],style:"sun",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"zhou-yu",name:"Zhou Yu",mark:"瑜",faction:"WU",title:"The Beautiful General",alias:"Gongjin",summary:"Wu’s elegant commander and strategist, most closely associated with the fire attack at Chibi.",weapon:"Staff",tags:["Technical","Elemental"],games:["dw3","dw8","dw9"],style:"sun",sourceStatus:"draft",revision:"2026-08-13"},
  {id:"lu-bu",name:"Lu Bu",mark:"布",faction:"OTHER",title:"The Flying General",alias:"Fengxian",summary:"The franchise’s benchmark for overwhelming strength—an unaffiliated warrior feared whenever he enters a battlefield.",weapon:"Halberd",tags:["Extreme power","Boss"],games:["dw3","dw8","dw9"],style:"other",sourceStatus:"reviewed",revision:"2026-08-13"},
  {id:"diaochan",name:"Diaochan",mark:"蟬",faction:"OTHER",title:"The Resolute Beauty",alias:"Diaochan",summary:"A graceful fighter placed at the center of the plot that fractures the alliance between Dong Zhuo and Lu Bu.",weapon:"Chain Whip",tags:["Mobile","Technical"],games:["dw3","dw8","dw9"],style:"other",sourceStatus:"draft",revision:"2026-08-13"},
];

const dw8xlRoster: Record<Faction,string[]> = {
  WEI:["Cai Wenji","Cao Cao","Cao Pi","Cao Ren","Dian Wei","Guo Jia","Jia Xu","Li Dian","Pang De","Wang Yi","Xiahou Dun","Xiahou Yuan","Xu Huang","Xu Zhu","Yu Jin","Yue Jin","Zhang He","Zhang Liao","Zhenji"],
  WU:["Daqiao","Ding Feng","Gan Ning","Han Dang","Huang Gai","Lianshi","Ling Tong","Lu Meng","Lu Su","Lu Xun","Sun Ce","Sun Jian","Sun Quan","Sun Shangxiang","Taishi Ci","Xiaoqiao","Zhou Tai","Zhou Yu","Zhu Ran"],
  SHU:["Bao Sanniang","Fa Zheng","Guan Ping","Guan Suo","Guan Xing","Guan Yinping","Guan Yu","Huang Zhong","Jiang Wei","Liu Bei","Liu Shan","Ma Chao","Ma Dai","Pang Tong","Wei Yan","Xingcai","Xu Shu","Yueying","Zhang Bao","Zhang Fei","Zhao Yun","Zhuge Liang"],
  OTHER:["Chen Gong","Diaochan","Dong Zhuo","Lu Bu","Lu Lingqi","Meng Huo","Yuan Shao","Zhang Jiao","Zhurong","Zuo Ci"],
};
const jinRoster=["Deng Ai","Guo Huai","Jia Chong","Sima Shi","Sima Yi","Sima Zhao","Wang Yuanji","Wen Yang","Xiahou Ba","Zhang Chunhua","Zhong Hui","Zhuge Dan"];
const slug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const existing=new Set(officers.map(o=>o.id));
for(const [faction,names] of Object.entries(dw8xlRoster) as [Faction,string[]][])for(const name of names){const id=slug(name);if(!existing.has(id)){officers.push({id,name,mark:name[0],faction,title:`${faction} officer`,alias:"Archive record",summary:`A playable ${faction.toLowerCase()} officer in Dynasty Warriors 8: Xtreme Legends Complete Edition. This record is open for sourced community expansion.`,weapon:"Unique EX weapon",tags:["Playable","DW8XL roster"],games:["dw8xl"],style:faction.toLowerCase(),sourceStatus:"draft",revision:"2026-08-13"});existing.add(id)}else{const officer=officers.find(o=>o.id===id)!;if(!officer.games.includes("dw8xl"))officer.games.push("dw8xl")}}
for(const name of jinRoster){const id=slug(name);if(!existing.has(id))officers.push({id,name,mark:name[0],faction:"OTHER",title:"Jin officer",alias:"Archive record",summary:"A playable Jin officer in Dynasty Warriors 8: Xtreme Legends Complete Edition. This record is open for sourced community expansion.",weapon:"Unique EX weapon",tags:["Playable","Jin","DW8XL roster"],games:["dw8xl"],style:"jin",sourceStatus:"draft",revision:"2026-08-13"})}
export const dw8xlOfficerIds=[...Object.values(dw8xlRoster).flat(),...jinRoster].map(slug);

export const games: Game[] = [
  {id:"dw3",short:"DW3",title:"Dynasty Warriors 3",year:2001,platforms:["PlayStation 2","Xbox"],era:"The defining foundation",summary:"The entry that crystallized the modern one-versus-thousands formula around character-led Musou campaigns and battlefield objectives.",distinction:"Stage-based Musou Mode",officers:officers.filter(o=>o.games.includes("dw3")).map(o=>o.id),status:"reviewed"},
  {id:"dw8",short:"DW8",title:"Dynasty Warriors 8",year:2013,platforms:["PlayStation 3","Xbox 360"],era:"The branching chronicle",summary:"A content-rich interpretation built around kingdom campaigns, hypothetical routes, and an expansive officer roster.",distinction:"Historical and hypothetical routes",officers:officers.filter(o=>o.games.includes("dw8")).map(o=>o.id),status:"reviewed"},
  {id:"dw9",short:"DW9",title:"Dynasty Warriors 9",year:2018,platforms:["PlayStation 4","Xbox One","PC"],era:"The open-world experiment",summary:"The series reimagined its connected battlefields as one traversable landscape with officer-specific stories.",distinction:"Single open world",officers:officers.filter(o=>o.games.includes("dw9")).map(o=>o.id),status:"reviewed"},
  {id:"dw8xl",short:"DW8XL CE",title:"Dynasty Warriors 8: Xtreme Legends Complete Edition",year:2014,platforms:["PlayStation 4","PlayStation Vita","Windows"],era:"The complete branching chronicle",summary:"The complete edition combines Dynasty Warriors 8 with Xtreme Legends: 82 playable officers, kingdom stories with historical and hypothetical routes, a dedicated Lu Bu campaign, and expanded Ambition Mode.",distinction:"82 unique playable officers and branching kingdom campaigns",officers:dw8xlOfficerIds,status:"reviewed",edition:"Base game + Xtreme Legends",modes:["Story Mode","Free Mode","Ambition Mode","Challenge Mode"],sourceUrl:"https://www.koeitecmoamerica.com/dw8xl/"},
];

export const battles: Battle[] = [
  {id:"yellow-turban-rebellion",name:"Yellow Turban Rebellion",year:"184",factions:["Han coalition","Yellow Turbans"],games:["dw3","dw8","dw9"],summary:"The uprising that opens many campaigns and draws the future rulers of Wei, Wu, and Shu into conflict."},
  {id:"hulao-gate",name:"Battle of Hulao Gate",year:"190",factions:["Coalition","Dong Zhuo"],games:["dw3","dw8","dw9"],summary:"A defining early confrontation, remembered in the games as the moment Lu Bu becomes an overwhelming battlefield threat."},
  {id:"guandu",name:"Battle of Guandu",year:"200",factions:["Cao Cao","Yuan Shao"],games:["dw3","dw8","dw9"],summary:"A decisive contest of supply lines and strategy that establishes Cao Cao’s dominance in the north."},
  {id:"chibi",name:"Battle of Chibi",year:"208",factions:["Cao Cao","Sun–Liu alliance"],games:["dw3","dw8","dw9"],summary:"The iconic naval fire attack that prevents immediate unification and helps define the Three Kingdoms balance."},
  {id:"yiling",name:"Battle of Yiling",year:"222",factions:["Shu","Wu"],games:["dw3","dw8","dw9"],summary:"A campaign of grief, retaliation, and fire that transforms the relationship between Shu and Wu."},
  {id:"wuzhang-plains",name:"Battle of Wuzhang Plains",year:"234",factions:["Shu","Wei"],games:["dw3","dw8","dw9"],summary:"The culminating northern campaign most closely associated with Zhuge Liang and Sima Yi’s long rivalry."},
];

export const weapons: Weapon[] = [
  {id:"feather-fan",name:"Feather Fan",style:"Ranged control",wielders:["zhuge-liang"],games:["dw3","dw8","dw9"]},
  {id:"crescent-blade",name:"Crescent Blade",style:"Wide power arcs",wielders:["guan-yu"],games:["dw3","dw8","dw9"]},
  {id:"dragon-spear",name:"Dragon Spear",style:"Mobile combos",wielders:["zhao-yun"],games:["dw3","dw8","dw9"]},
  {id:"halberd",name:"Halberd",style:"Extreme power",wielders:["lu-bu"],games:["dw3","dw8","dw9"]},
  {id:"chakram",name:"Chakram",style:"Mobile ranged pressure",wielders:["sun-shangxiang"],games:["dw3","dw8","dw9"]},
  {id:"battle-axe",name:"Axe",style:"Signature EX weapon · DW8XL CE",wielders:["dian-wei"],games:["dw3","dw8","dw9"]},
];

export const imageRights = {
  current: "AI-generated original officer portraits and CSS geometric compositions",
  owner: "MusouDB",
  license: "Original project asset",
  officialAssets: "Not yet licensed",
  policy: "No extracted game files, copied wiki art, or unverified fan art",
};

const profile=(id:string,kingdom:string,role:string,moveset:string,unlock:string,relationships:string[],battleIds:string[],biography:string,gameplay:string,spoiler:string):OfficerProfile=>({id,kingdom,role,moveset,unlock,relationships,battles:battleIds,biography,gameplay,spoiler,citations:[],revisions:[{version:2,date:"2026-08-13",summary:"Expanded gameplay, relationships, battle links, and spoiler-separated story notes."},{version:1,date:"2026-08-13",summary:"Created canonical DW8XL officer record."}]});
export const officerProfiles:Record<string,OfficerProfile>={
  "cao-cao":profile("cao-cao","Wei","Ruler and commander","General’s Sword · broad crowd-clearing arcs","Available through Wei’s opening story stages",["Cao Pi · son","Xiahou Dun · cousin and general","Sima Yi · strategist"],["yellow-turban-rebellion","guandu","chibi"],"Cao Cao anchors Wei’s campaign as a commander who treats order as the prerequisite for peace. Musou’s portrayal emphasizes strategic decisiveness, recruitment of talent, and a willingness to accept the moral cost of unification.","A balanced sword user with reliable reach, fast setup, and accessible crowd control. His moveset rewards forward pressure without demanding specialized execution.","Wei’s hypothetical route tests whether Cao Cao’s meritocratic coalition can survive the turning points that historically constrained it."),
  "liu-bei":profile("liu-bei","Shu","Ruler and sworn brother","Twin Swords · fast balanced strings","Available through Shu’s opening story stages",["Guan Yu · sworn brother","Zhang Fei · sworn brother","Sun Shangxiang · spouse"],["yellow-turban-rebellion","chibi","yiling"],"Liu Bei is Shu’s moral center: a wandering leader whose stated commitment to benevolence gradually gathers a kingdom around him. His story is framed through loyalty, loss, and the challenge of preserving principle under pressure.","Twin swords provide quick, readable strings and strong mobility. He is an approachable all-rounder suited to players learning weapon affinity, switching, and battlefield flow.","Shu’s branches ask whether key allies can be saved and whether benevolence can produce a future beyond repeated sacrifice."),
  "sun-quan":profile("sun-quan","Wu","Ruler of Wu","Sword · switch-attack combos","Unlocked as Wu’s succession story advances",["Sun Jian · father","Sun Ce · brother","Sun Shangxiang · sister"],["chibi","yiling"],"Sun Quan inherits the state built by his father and brother, then has to turn their momentum into durable rule. Wu’s campaign presents him as a leader learning to trust the different generations around him.","The Sword is Sun Quan’s EX weapon in DW8XL CE; the Flame Blade is a separate DLC weapon type.","Wu’s hypothetical path focuses on preserving the Sun family and transforming a legacy of succession into shared victory."),
  "sima-yi":profile("sima-yi","Jin","Strategist and Sima patriarch","Horsehair Whip · ranged control","Unlocked during the transition from Wei to Jin",["Sima Shi · son","Sima Zhao · son","Zhuge Liang · strategic rival"],["wuzhang-plains"],"Sima Yi begins as Wei’s brilliant, guarded strategist and becomes the patriarch of Jin’s rise. His long rivalry with Zhuge Liang gives the later chronicle its clearest contest of patience and calculation.","The horsehair whip projects control at mid-range, disrupts groups, and rewards deliberate spacing. It feels more technical than a conventional blade and excels at managing approach lanes.","Jin’s narrative reveals how the Sima family converts service under Wei into a new political order."),
  "lu-bu":profile("lu-bu","Other","Independent warlord","Halberd · extreme power and reach","Central playable lead of the Xtreme Legends Lu Bu story",["Diaochan · close ally","Chen Gong · strategist","Lu Lingqi · daughter"],["hulao-gate"],"Lu Bu is Musou’s benchmark for raw battlefield strength. Xtreme Legends expands him from recurring super-boss into the lead of a dedicated campaign shaped by ambition, betrayal, and the search for worthy opposition.","The halberd dominates space with exceptional power, reach, and officer deletion. Weapon switching and affinity management keep his overwhelming kit from being entirely automatic.","His hypothetical route imagines what happens if strength, loyalty, and Chen Gong’s strategy remain aligned long enough to challenge every major power."),
  "zhao-yun":profile("zhao-yun","Shu","Vanguard and protector","Dragon Spear · mobile aerial combos","Unlocked early in Shu’s story",["Liu Bei · lord","Liu Shan · protected heir","Guan Yu · fellow general"],["yellow-turban-rebellion","chibi"],"Zhao Yun is one of the series’ defining heroes: calm under pressure, steadfast in service to Shu, and repeatedly placed at the center of rescue and breakthrough scenarios.","The Dragon Spear is fluid, mobile, and combo-oriented. Launchers and aerial extensions let skilled players cross crowds quickly while maintaining pressure on officers.","Hypothetical objectives often turn his famous rescues into hinge points capable of preserving Shu’s future."),
  "sun-shangxiang":profile("sun-shangxiang","Wu","Warrior princess","Chakrams · mobile ranged pressure","Available in Wu’s early campaign",["Sun Jian · father","Sun Quan · brother","Liu Bei · spouse"],["chibi","yiling"],"Sun Shangxiang embodies Wu’s energetic martial identity while carrying a personal connection to Shu through Liu Bei. Her record sits at the intersection of family loyalty and inter-kingdom diplomacy.","Chakrams combine movement with broad circular coverage. She can pressure crowds while repositioning and is especially comfortable for players who prefer speed over planted power.","Her later story material places loyalty to the Sun family beside her bond with Liu Bei as Wu and Shu move toward conflict."),
  "wang-yuanji":profile("wang-yuanji","Jin","Jin officer and political observer","Throwing Knives · rapid ranged strings","Unlocked through Jin’s story progression",["Sima Zhao · partner","Sima Yi · Sima patriarch","Zhong Hui · political rival"],["wuzhang-plains"],"Wang Yuanji is portrayed as perceptive and composed, often recognizing both Sima Zhao’s hidden ability and the dangers surrounding Jin’s ascent before others do.","Throwing knives deliver extremely fast ranged hits and build momentum quickly. Individual strikes are light, so positioning, sustained strings, and Musou generation matter more than single-hit force.","Her story tracks the political risks around Sima Zhao’s rise and the rebellions that test Jin’s emerging order."),
  "lu-lingqi":profile("lu-lingqi","Other","Daughter of Lu Bu","Crossed Pike · sweeping mobile offense","Playable through Xtreme Legends’ Lu Bu campaign",["Lu Bu · father","Chen Gong · allied strategist","Diaochan · ally"],["hulao-gate"],"Lu Lingqi joins the roster in Xtreme Legends as Lu Bu’s daughter, carrying his intimidating battlefield presence into a faster and more guarded character arc.","The crossed pike produces wide rotating attacks, strong movement, and excellent crowd coverage. She feels aggressive without simply duplicating the halberd’s slower overwhelming weight.","The Lu Bu campaign places her loyalty inside a story where alliances repeatedly fracture and survival depends on whom the family can trust."),
  "zhuge-liang":profile("zhuge-liang","Shu","Chief strategist","Feather Fan · ranged elemental control","Unlocked as Shu recruits its strategist",["Liu Bei · lord","Jiang Wei · successor","Sima Yi · strategic rival"],["chibi","wuzhang-plains"],"Zhuge Liang is Shu’s architect and Musou’s emblem of foresight. His plans shape the alliance at Chibi, the founding of Shu, and the northern campaigns that define the kingdom’s later years.","The feather fan controls space with ranged and elemental attacks. Its deliberate tempo rewards prediction, positioning, and efficient crowd setup rather than continuous close-range pressure.","His final campaigns and hypothetical outcomes center on succession, endurance, and whether Shu’s strategy can outlive its strategist."),
};
// Edition-scoped dossiers replace generic gameplay and unverified unlock copy.
for(const [id,dossier] of Object.entries(dossiers)){
  const o=officers.find(x=>x.id===id)!;
  const w=weaponGuides.find(x=>x.officerId===id);
  const weapon=w??dossier.weapon;
  if(!o||!weapon)throw new Error(`Incomplete dossier association: ${id}`);
  const researchDate=dossier.checked??checked;
  if(!officerProfiles[id]&&dossier.profile){
    const detail=dossier.profile;
    officerProfiles[id]={id,kingdom:detail.kingdom,role:detail.role,moveset:"",unlock:"",relationships:detail.relationships,battles:[],biography:detail.biography,gameplay:"",spoiler:detail.spoiler,citations:[],revisions:[]};
    o.alias=detail.alias;
  }
  const p=officerProfiles[id];
  if(!p)throw new Error(`Missing officer profile: ${id}`);
  p.gameplay=dossier.gameplay;p.battles=dossier.battles;
  p.unlock="Story Mode assigns officers by scenario. Free Mode uses unlocked stages; Ambition Mode has separate recruitment. See the game page for mode rules. "+(w?"The weapon page lists a separate rare-item objective.":"Exact character availability and rare-item objectives remain open for this record.");
  p.moveset=`${weapon.name} · ${weapon.style}`;p.kingdom=p.kingdom.toUpperCase();
  p.citations=[dossier.historySource,manual,exSource,...(dossier.gameplay?[combatSource]:[]),...(w?[w.rare.source]:[]),...(dossier.sources??[])];
  if(id==="lu-lingqi")p.citations.push({label:"KOEI TECMO · Lu Lingqi portrayal and weapon",url:"https://www.koeitecmoamerica.com/dw8xl/window/ryoreiki.html",kind:"Official publisher"});
  p.revisions.unshift({version:p.revisions.length?3:1,date:researchDate,summary:w?"Added edition-specific research, historical context and a linked rare weapon guide. Exact full movesets remain open for verification.":dossier.gameplay?"Added historical context, editorial portrayal, relationships and sourced weapon/playstyle notes. Rare weapon conditions and full movesets remain open.":"Added historical or literary background, editorial portrayal, relationships and a sourced EX weapon association. Combat notes, exact unlocks and rare objectives remain open."});
  o.summary=dossier.summary;o.revision=researchDate;
  if(id==="sun-quan"){o.alias="Zhongmou";o.mark="權"}
  if(id==="wang-yuanji"){o.alias="Wang Yuanji";o.mark="姬"}
  if(id==="lu-lingqi"){o.alias="Lu Bu’s daughter";o.mark="綺"}
}
for(const [id,dossier] of Object.entries(dossiers))if(dossier.weapon){
  const existing=weapons.find(w=>w.id===dossier.weaponId);
  if(existing){
    if(!existing.games.includes("dw8xl"))existing.games.push("dw8xl");
    if(!existing.wielders.includes(id))existing.wielders.push(id);
  }else weapons.push({id:dossier.weaponId,name:dossier.weapon.name,style:dossier.weapon.style,wielders:[id],games:["dw8xl"]});
}
for(const w of weaponGuides){
  const existing=weapons.find(x=>x.id===w.id);
  if(existing){existing.name=w.name;existing.style=w.style;if(!existing.games.includes("dw8xl"))existing.games.push("dw8xl")}
  else weapons.push({id:w.id,name:w.name,style:w.style,wielders:[w.officerId],games:["dw8xl"]});
}
for(const stage of [...stageGuides,...routeStages])if(!battles.some(b=>b.id===stage.id))battles.push({id:stage.id,name:stage.name,year:stage.year,factions:[stage.side],games:["dw8xl"],summary:stage.context});
for(const b of battles)if(["yellow-turban-rebellion","hulao-gate","guandu","chibi","yiling","wuzhang-plains"].includes(b.id)&&!b.games.includes("dw8xl"))b.games.push("dw8xl");
export const flagshipOfficerIds=Object.keys(officerProfiles);
for(const id of flagshipOfficerIds){const o=officers.find(item=>item.id===id);const p=officerProfiles[id];if(o){o.sourceStatus="reviewed";o.revision=dossiers[id]?.checked??checked;o.title=p.role;o.weapon=p.moveset.split(" · ")[0];o.tags=[...new Set([...o.tags,p.kingdom,"Flagship profile"])]}}

export const gameById = (id:string) => games.find(game=>game.id===id);
export const officerById = (id:string) => officers.find(officer=>officer.id===id);
