import type {Dossier, Source} from "./dw8xl";

// Original core dossiers. Weapon associations are edition-scoped facts; these
// records do not claim that individual combos or rare objectives were verified.
type Entry={
  name:string;role:string;alias:string;page:string;history:string;portrayal:string;
  weapon:string;weaponId?:string;relationships:string[];story:string;
  source?:Source;literary?:boolean;
};
const baseWeapons:Source={label:"wowitsyugi · returning DW8 EX weapon associations",url:"https://gamefaqs.gamespot.com/ps3/688499-dynasty-warriors-8/faqs/67510",kind:"Community guide · weapon association"};
const archiveWeapons:Source={label:"Koei Tecmo Wiki · DW8 and XL weapon associations",url:"https://koeitecmo.wiki/wiki/Dynasty_Warriors_8/Weapons",kind:"Community reference · weapon association"};
const official=(name:string,page:string):Source=>({label:`KOEI TECMO · ${name} portrayal and weapon`,url:`https://www.koeitecmoamerica.com/dw8xl/window/${page}.html`,kind:"Official publisher"});
const slug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function faction(kingdom:string,entries:Entry[]):Record<string,Dossier>{
  return Object.fromEntries(entries.map(e=>[slug(e.name),{
    checked:"2026-09-23",history:e.history,
    historySource:{label:`${e.name} · ${e.literary?"literary background":"historical background"} and references`,url:`https://en.wikipedia.org/wiki/${e.page}`,kind:e.literary?"Literary overview · secondary source":"Historical overview · secondary source"},
    summary:e.portrayal,gameplay:"",exNote:"The two officer-specific EX inputs and their effects still need verification.",
    weaponId:e.weaponId??slug(e.weapon),weapon:{name:e.weapon,style:"Signature EX weapon · DW8XL CE"},
    sources:[e.source??(["WEI","WU"].includes(kingdom)?baseWeapons:archiveWeapons)],battles:[],
    profile:{kingdom,role:e.role,alias:e.alias,biography:e.portrayal,relationships:e.relationships,spoiler:e.story},
  } satisfies Dossier]));
}

const wei=faction("WEI",[
  {
    name:"Cai Wenji",role:"Poet and musician",alias:"Wenji · Cai Yan",page:"Cai_Yan",weapon:"Harp",
    history:"Cai Yan, known by the courtesy name Wenji, was the daughter of the scholar Cai Yong. Her life was disrupted by captivity during the late Han wars; Cao Cao helped arrange her return. She is remembered for poetry and learning, not a documented career as a battlefield commander.",
    portrayal:"Cai Wenji brings the civilian cost of war into Wei’s roster. Her restrained manner and musical identity give the faction a voice concerned with what peace might restore, alongside its military ambitions.",
    relationships:["Cao Cao · patron associated with her return"],story:"Her playable battles are a fictional expansion of a literary and scholarly life. They should not be treated as historical military appointments.",
  },
  {
    name:"Cao Pi",role:"Heir and ruler of Wei",alias:"Zihuan",page:"Cao_Pi",weapon:"Dual Blade",
    history:"Cao Pi succeeded his father Cao Cao and became the first emperor of Cao Wei in 220 after the Han emperor’s abdication. He was also a writer. The founding of imperial Wei belongs to his reign, although Cao Cao had built much of its territorial and political foundation.",
    portrayal:"Cao Pi presents succession as a test of authority. His cool confidence and demanding standards give Wei’s next generation a different tone from Cao Cao’s expansive ambition, with Zhenji beside him.",
    relationships:["Cao Cao · father","Zhenji · spouse"],story:"His accession marks the move from Cao Cao’s Han-era power to an imperial Wei state. Hypothetical campaigns can rearrange that chronology.",
  },
  {
    name:"Cao Ren",role:"Defensive commander",alias:"Zixiao",page:"Cao_Ren",weapon:"Spiked Shield",
    history:"Cao Ren was a relative and long-serving commander of Cao Cao. His career included difficult defensive commands at Jiangling and Fancheng, followed by service under Cao Pi. His reputation as a defender reflects particular campaigns, rather than a claim that every position he held was invulnerable.",
    portrayal:"Cao Ren embodies the duty to hold a position while others pursue victory. His imposing armor and protective bearing turn Wei’s military discipline into a character centered on endurance and responsibility.",
    relationships:["Cao Cao · kinsman and lord","Cao Pi · later ruler","Guan Yu · opponent at Fan Castle"],story:"Fan Castle places his defense opposite Guan Yu’s advance. The Wei and Shu versions of the conflict have different objectives.",
  },
  {
    name:"Dian Wei",role:"Cao Cao’s bodyguard",alias:"Dian Wei",page:"Dian_Wei",weapon:"Axe",weaponId:"battle-axe",
    history:"Dian Wei served Cao Cao as a bodyguard and was renowned for strength. He died defending Cao Cao during Zhang Xiu’s attack at Wancheng in 197. The record of that last stand underlies his later reputation for personal loyalty; game survival branches imagine a different outcome.",
    portrayal:"Dian Wei’s priorities are direct: keep Cao Cao safe and stand between his lord and danger. His physical power serves a protective role, making the bond between the two more important than rank or political calculation.",
    relationships:["Cao Cao · protected lord","Xu Zhu · fellow bodyguard"],story:"Wancheng is the defining crisis of his story. His survival in a hypothetical branch is a game outcome, separate from his historical death.",
  },
  {
    name:"Guo Jia",role:"Strategic adviser",alias:"Fengxiao",page:"Guo_Jia",weapon:"Orb & Scepter",
    history:"Guo Jia advised Cao Cao during the campaigns that consolidated his northern position. He died in 207, before the Battle of Red Cliffs. Later claims about how events might have changed had he lived are counterfactual judgments, not evidence that he participated in those later campaigns.",
    portrayal:"Guo Jia’s relaxed confidence makes foresight seem almost effortless. His rapport with Cao Cao gives Wei a strategist whose pleasure in possibilities contrasts with the severity of its more formal officers.",
    relationships:["Cao Cao · lord and strategic partner"],story:"His absence matters to Wei’s historical course. Any later participation in a hypothetical route should be read within that branch.",
  },
  {
    name:"Jia Xu",role:"Pragmatic strategist",alias:"Wenhe",page:"Jia_Xu",weapon:"Chain & Sickle",
    history:"Jia Xu served several leaders, including Li Jue and Zhang Xiu, before joining Cao Cao. He later held high office under Cao Pi. His changing service and cautious political conduct made survival a recurring theme in assessments of his career, though individual anecdotes require their own source scrutiny.",
    portrayal:"Jia Xu treats danger as something to understand before entering it. His dry pragmatism adds a survival-minded perspective to Wei, where successful plans need not come from public declarations of loyalty or heroism.",
    relationships:["Cao Cao · later lord","Cao Pi · ruler served after Cao Cao"],story:"His association with Cao Cao follows service to earlier opponents. Roster membership does not mean lifelong allegiance to one faction.",
  },
  {
    name:"Li Dian",role:"General of Wei",alias:"Mancheng",page:"Li_Dian",weapon:"Wheeled Halberd",
    history:"Li Dian served Cao Cao and fought alongside Zhang Liao and Yue Jin at Hefei. Historical accounts emphasize his willingness to put the shared defense above personal disagreements. His career also included logistical and administrative responsibilities, extending beyond the individual duels foregrounded by action games.",
    portrayal:"Li Dian’s intuition and conversational manner set him apart from Wei’s sterner commanders. His place alongside Zhang Liao and Yue Jin lets the story explore cooperation between officers with different temperaments.",
    relationships:["Cao Cao · lord","Zhang Liao · fellow Hefei defender","Yue Jin · fellow Hefei defender"],story:"The Hefei partnership is central to his record. Personal friction should not be mistaken for a different faction assignment.",
  },
  {
    name:"Pang De",role:"General serving Cao Cao",alias:"Lingming",page:"Pang_De",weapon:"Mace",
    history:"Pang De served the Ma family before entering Cao Cao’s service. During the Fancheng campaign he was captured by Guan Yu’s forces and killed after refusing to surrender. His final allegiance differs from Ma Chao’s, so their earlier association should not make him a Shu officer here.",
    portrayal:"Pang De is defined by commitment once he has chosen whom to serve. His quiet resolve gives Wei another model of loyalty, shaped by a past that connects him to Ma Chao and the northwest.",
    relationships:["Ma Chao · former commander","Cao Cao · later lord","Guan Yu · opponent at Fan Castle"],story:"His Fan Castle story contrasts his refusal to yield with the collapse of Wei’s flooded reinforcements.",
  },
  {
    name:"Wang Yi",role:"Warrior opposing Ma Chao",alias:"Lady Wang",page:"Wang_Yi_(wife_of_Zhao_Ang)",weapon:"Trishula",
    history:"Wang Yi was the wife of Zhao Ang. Accounts credit her with helping defend their positions against Ma Chao and advising resistance during the fighting in Liang Province. She has a historical basis; the game’s concentrated revenge narrative is a dramatization of that much more specific conflict.",
    portrayal:"Wang Yi directs her grief and determination toward Ma Chao. Her single-minded pursuit gives Wei’s campaigns a personal feud that can sit uneasily beside the broader interests of the faction she supports.",
    relationships:["Ma Chao · principal adversary"],story:"Her conflict with Ma Chao has its own perspective. His heroic presentation in Shu does not erase the losses driving her story.",
  },
  {
    name:"Xiahou Yuan",role:"Western campaign commander",alias:"Miaocai",page:"Xiahou_Yuan",weapon:"Bow & Rod",
    history:"Xiahou Yuan commanded for Cao Cao, particularly in the northwest and Hanzhong. He was killed in the fighting at Mount Dingjun in 219. Xiahou Ba was his son. His death and Ba’s later defection belong to different stages of the conflict and should not be collapsed into one event.",
    portrayal:"Xiahou Yuan combines a veteran’s reliability with an approachable, occasionally self-deprecating manner. That warmth distinguishes him from Xiahou Dun while preserving the sense of longstanding service around Cao Cao.",
    relationships:["Cao Cao · lord","Xiahou Dun · fellow Xiahou commander","Xiahou Ba · son","Huang Zhong · opponent at Dingjun"],story:"Mount Dingjun is the historical turning point in his career. Survival branches change the campaign’s possibilities from there.",
  },
  {
    name:"Xu Huang",role:"General of Wei",alias:"Gongming",page:"Xu_Huang",weapon:"Great Axe",
    history:"Xu Huang became one of Cao Cao’s prominent commanders and continued serving the Wei state under Cao Pi and Cao Rui. His relief of Fancheng helped reverse Guan Yu’s offensive. Later accounts group him among Wei’s leading generals, but that grouping is not a separate in-game faction.",
    portrayal:"Xu Huang approaches warfare as a discipline to master. His respect for accomplished opponents makes martial excellence a shared language even when political loyalties place those opponents on the other side.",
    relationships:["Cao Cao · lord","Guan Yu · respected opponent","Cao Ren · commander relieved at Fan Castle"],story:"At Fan Castle, respect for Guan Yu does not prevent him from carrying out Wei’s relief operation.",
  },
  {
    name:"Xu Zhu",role:"Cao Cao’s bodyguard",alias:"Zhongkang · Xu Chu",page:"Xu_Chu",weapon:"Club",
    history:"The officer called Xu Zhu in this game is usually rendered Xu Chu in historical English references. He protected Cao Cao and was remembered for strength and close personal service. The two romanizations refer to the same figure, not two separate members of Wei’s roster.",
    portrayal:"Xu Zhu pairs enormous strength with an uncomplicated, gentle manner. His loyalty to Cao Cao and concern for ordinary comforts make him a warm presence among Wei’s ambitious rulers and calculating advisers.",
    relationships:["Cao Cao · protected lord","Dian Wei · fellow bodyguard"],story:"His simple outward manner is characterization, not evidence of a lack of military responsibility in the historical record.",
  },
  {
    name:"Yu Jin",role:"Disciplinary commander",alias:"Wenze",page:"Yu_Jin",weapon:"War Trident",source:official("Yu Jin","ukin"),
    history:"Yu Jin entered Cao Cao’s service in 192 and became a senior general. He surrendered to Guan Yu after flooding overwhelmed his army during the Fancheng campaign. He later returned from captivity and died in 221. He is a different officer from Yue Jin, despite their similar English names.",
    portrayal:"Yu Jin enforces military discipline with little room for excuses. Xtreme Legends gives Wei a commander whose authority can unsettle allies as well as enemies, making obedience a visible part of faction life.",
    relationships:["Cao Cao · lord","Guan Yu · opponent at Fan Castle","Pang De · fellow commander in the Fancheng campaign"],story:"His historical surrender complicates the game’s severe public image. The campaign’s treatment should be distinguished from later moral judgments about it.",
  },
  {
    name:"Yue Jin",role:"Vanguard general",alias:"Wenqian",page:"Yue_Jin",weapon:"Dual Hookblades",
    history:"Yue Jin was an early follower of Cao Cao and earned a reputation through frontline service in numerous campaigns. He helped defend Hefei with Zhang Liao and Li Dian. He should not be confused with Yu Jin, another Cao Cao general with a separate career and family.",
    portrayal:"Yue Jin’s modest manner contrasts with his willingness to enter the thick of a fight. He supplies Wei with an earnest frontline presence whose accomplishments are larger than his own claims about them.",
    relationships:["Cao Cao · lord","Zhang Liao · fellow Hefei defender","Li Dian · fellow Hefei defender"],story:"His partnership at Hefei belongs to Wei’s defense against Sun Quan. It is unrelated to Yu Jin’s surrender at Fancheng.",
  },
  {
    name:"Zhang He",role:"General of Wei",alias:"Junyi",page:"Zhang_He",weapon:"Claws",
    history:"Zhang He served Yuan Shao before joining Cao Cao and became an important Wei commander. His later career included campaigns against Shu. The game’s elaborate aesthetic philosophy is a creative characterization; it should not replace the historical record of an experienced and adaptable military leader.",
    portrayal:"Zhang He sees grace and beauty in battlefield movement. His theatrical confidence makes him immediately distinct within Wei, while his respect for accomplished warriors gives that performance a serious martial foundation.",
    relationships:["Yuan Shao · former lord","Cao Cao · later lord","Xiahou Yuan · fellow Hanzhong commander"],story:"His move from Yuan Shao’s forces to Cao Cao’s explains appearances on different sides of the early chronicle.",
  },
  {
    name:"Zhenji",role:"Cao Pi’s consort",alias:"Lady Zhen",page:"Lady_Zhen",weapon:"Flute",
    history:"Lady Zhen’s personal name is not securely recorded. She was married to Yuan Xi before becoming Cao Pi’s wife and was the mother of Cao Rui. Her imperial honor was posthumous. The playable name Zhenji and her battlefield role should not be treated as a complete historical identity.",
    portrayal:"Zhenji projects refinement and assurance beside Cao Pi. Her musical weapon and aristocratic bearing make their partnership a statement of Wei’s imperial self-image as well as a personal relationship.",
    relationships:["Cao Pi · spouse"],story:"Her earlier connection to the Yuan family precedes her place beside Cao Pi. The game condenses a difficult historical succession into its own dramatic presentation.",
  },
]);

const wu=faction("WU",[
  {
    name:"Daqiao",role:"Sun Ce’s companion",alias:"Elder Qiao sister",page:"Two_Qiaos",weapon:"Pugil Stick",
    history:"The elder Qiao sister became Sun Ce’s wife; the younger married Zhou Yu. Their personal names are not recorded, and Daqiao means the elder Qiao. Surviving information about her life is brief. Her participation in battles comes from fictional portrayal rather than a documented command.",
    portrayal:"Daqiao’s reserve gives Sun Ce’s exuberance a quieter counterpart. She fights from attachment to the people close to her, bringing family concerns into Wu’s story of conquest and succession.",
    relationships:["Sun Ce · spouse","Xiaoqiao · younger sister"],story:"Scenes that preserve her life with Sun Ce beyond his historical death belong to the game’s alternative possibilities.",
  },
  {
    name:"Ding Feng",role:"Veteran general of Wu",alias:"Chengyuan",page:"Ding_Feng_(Chengyuan)",weapon:"Circle Blade",
    history:"Ding Feng served Eastern Wu across a long military career and died in 271. He rose through service under senior commanders and became a leading general himself, notably at Dongxing in 252. His longevity connects several generations of Wu’s leadership.",
    portrayal:"Ding Feng’s imposing appearance conceals a reflective temperament. His poetic observations give Wu a veteran who notices beauty in the landscape even as his work requires him to fight through it.",
    relationships:["Sun Quan · lord","Gan Ning · earlier commander","Lu Xun · earlier commander"],story:"His later battles extend beyond the careers of Wu’s founding generation. A shared roster does not imply that everyone served together throughout.",
  },
  {
    name:"Gan Ning",role:"Raider turned Wu general",alias:"Xingba",page:"Gan_Ning",weapon:"Flail",
    history:"Gan Ning led raiders before military service under Huang Zu and, later, Sun Quan. He became known for daring attacks in Wu’s service. His earlier killing of Ling Tong’s father, Ling Cao, complicated their relationship after they entered the same army.",
    portrayal:"Gan Ning brings swagger, impatience, and a taste for dangerous assignments to Wu. His confidence can inspire comrades or provoke them, particularly Ling Tong, whose family history makes their friction personal.",
    relationships:["Sun Quan · lord","Ling Tong · fellow officer with a personal grievance"],story:"His cooperation with Ling Tong develops against the memory of Ling Cao’s death; comradeship does not erase that background.",
  },
  {
    name:"Han Dang",role:"Sun family veteran",alias:"Yigong",page:"Han_Dang",weapon:"Short Pike",
    history:"Han Dang served Sun Jian, Sun Ce, and Sun Quan. His military career crossed the Sun family’s early campaigns and the later wars against its rivals, including the Yiling campaign. That continuity makes him part of Wu’s institutional history as well as its battlefield roster.",
    portrayal:"Han Dang worries about being overlooked despite years of dependable service. The contrast between his experience and his desire for recognition gives Wu’s veteran generation a sympathetic, humorous voice.",
    relationships:["Sun Jian · first Sun family lord","Sun Ce · later lord","Sun Quan · later lord","Huang Gai · fellow veteran"],story:"His service spans three Sun leaders. Changes in the ruler of Wu do not represent a new identity or a separate officer record.",
  },
  {
    name:"Huang Gai",role:"Veteran commander",alias:"Gongfu",page:"Huang_Gai",weapon:"Arm Blade",
    history:"Huang Gai served successive Sun family leaders and is associated with the fire attack at Red Cliffs. The historical account of his attack should be distinguished from the novel’s expanded deception, including the famous punishment scene. His service began before the imperial state of Wu was founded.",
    portrayal:"Huang Gai represents experience that remains physically formidable. His readiness to accept dangerous work links the Sun family’s early struggles to Wu’s later victories, with practical loyalty taking precedence over ceremony.",
    relationships:["Sun Jian · earlier lord","Sun Quan · later lord","Zhou Yu · commander at Chibi","Han Dang · fellow veteran"],story:"Chibi gives his fire-attack role special prominence. Historical accounts, the novel’s ruse, and the game’s objectives are separate layers.",
  },
  {
    name:"Lianshi",role:"Sun family protector",alias:"Lady Bu",page:"Bu_Lianshi",weapon:"Crossbow",
    history:"Lady Bu was a favored consort of Sun Quan and the mother of Sun Luban and Sun Luyu. She was honored as empress after her death. The name Lianshi appears in a later historical compilation; her principal biography does not record it. Her warrior-bodyguard role is a game invention.",
    portrayal:"Lianshi’s composure gives Wu’s energetic family a steady protective presence. Her concern for Sun Shangxiang and attachment to Sun Quan tie personal care to the faction’s larger struggle to preserve itself.",
    relationships:["Sun Quan · consort","Sun Shangxiang · protected companion in the game"],story:"Her crossbow belongs to DW8XL CE. Weapon assignments in Empires should not replace this edition’s association.",
  },
  {
    name:"Ling Tong",role:"General of Wu",alias:"Gongji",page:"Ling_Tong",weapon:"Three Sectional Staff",
    history:"Ling Tong served Sun Quan after the death of his father, Ling Cao. He distinguished himself in military service and helped protect Sun Quan during the retreat from Hefei. His hostility toward Gan Ning arose from Gan Ning’s role in Ling Cao’s death, but his career was broader than that feud.",
    portrayal:"Ling Tong’s dry wit and casual bearing conceal a strong sense of duty. His exchanges with Gan Ning make their difficult partnership one of Wu’s clearest examples of personal resentment meeting military necessity.",
    relationships:["Sun Quan · lord","Gan Ning · comrade and personal rival"],story:"The retreat from Hefei emphasizes his protection of Sun Quan. His family grievance remains a separate thread from the battle’s strategic outcome.",
  },
  {
    name:"Lu Meng",role:"Commander and strategist",alias:"Ziming",page:"L%C3%BC_Meng",weapon:"Pike",
    history:"Lü Meng served Sun Ce and Sun Quan, developed his education while in service, and succeeded Lu Su in command. He directed the seizure of southern Jing Province in 219. His scholarly development is historically discussed; the game turns it into a particularly visible model of self-improvement.",
    portrayal:"Lu Meng combines the practicality of a soldier with a hard-earned interest in strategy. His guidance of younger officers, especially Lu Xun, makes learning a continuing responsibility within Wu’s command.",
    relationships:["Sun Quan · lord","Lu Su · predecessor in command","Lu Xun · younger colleague","Guan Yu · opponent in Jing Province"],story:"The seizure of Jing Province changes the Sun–Liu relationship. Wu’s strategic success becomes a source of catastrophe in Shu’s perspective.",
  },
  {
    name:"Lu Su",role:"Diplomat and commander",alias:"Zijing",page:"Lu_Su",weapon:"Rake",
    history:"Lu Su advised Sun Quan on long-term strategy and promoted cooperation with Liu Bei against Cao Cao. He succeeded Zhou Yu in command and negotiated over Jing Province. His policy combined alliance-building with Wu’s own territorial interests; it was not simply unconditional support for Shu.",
    portrayal:"Lu Su’s broad outlook gives Wu a strategist concerned with what comes after an immediate victory. His confidence in cooperation connects the faction’s independent ambitions to the possibility of a durable alliance.",
    relationships:["Sun Quan · lord","Zhou Yu · predecessor and colleague","Lu Meng · successor in command","Liu Bei · alliance partner"],story:"Alliance does not settle the Jing Province dispute. His diplomatic role should be read alongside Wu’s claim to its own future.",
  },
  {
    name:"Sun Ce",role:"Conqueror of Jiangdong",alias:"Bofu",page:"Sun_Ce",weapon:"Tonfa",
    history:"Sun Ce, Sun Jian’s eldest son, established the Sun family’s territorial position in Jiangdong through rapid conquests. After his death in 200, leadership passed to Sun Quan. He died before Eastern Wu became an imperial state, although later recognition connected him to that dynasty’s founding legacy.",
    portrayal:"Sun Ce leads through enthusiasm and personal courage. His friendship with Zhou Yu and confidence in his family give Wu’s early expansion a feeling of shared possibility, making succession a deeply personal event.",
    relationships:["Sun Jian · father","Sun Quan · younger brother","Daqiao · spouse","Zhou Yu · close friend"],story:"His early death leaves Sun Quan to sustain the position he built. Wu’s hypothetical story explores a different family future.",
  },
  {
    name:"Sun Jian",role:"Sun family patriarch",alias:"Wentai",page:"Sun_Jian",weapon:"Nine Rings Blade",
    history:"Sun Jian was a late Han commander who fought in the coalition against Dong Zhuo. He was killed during a campaign against Liu Biao. His sons Sun Ce and Sun Quan carried the family’s position forward; he did not rule the later imperial state of Eastern Wu during his lifetime.",
    portrayal:"Sun Jian gives Wu its founding image of audacity and family solidarity. His leadership is both military and paternal, so the kingdom’s later ambitions continually return to the example he leaves behind.",
    relationships:["Sun Ce · son","Sun Quan · son","Sun Shangxiang · daughter","Huang Gai · veteran follower"],story:"The historical campaign removes him before his sons’ major achievements. Continued leadership belongs to the game’s hypothetical possibilities.",
  },
  {
    name:"Taishi Ci",role:"Warrior of Wu",alias:"Ziyi",page:"Taishi_Ci",weapon:"Twin Rods",
    history:"Taishi Ci served Liu Yao before joining Sun Ce and later Sun Quan. Accounts remember his rescue mission for Kong Rong and his martial skill. His earlier opposition to Sun Ce and later service under him form successive parts of one career, rather than conflicting identities.",
    portrayal:"Taishi Ci approaches both allies and opponents with a warrior’s seriousness. His bond with Sun Ce grows out of mutual respect, giving Wu a recruitment story grounded in the recognition of an opponent’s worth.",
    relationships:["Sun Ce · former opponent and later lord","Sun Quan · later lord"],story:"His duel and eventual cooperation with Sun Ce belong to the establishment of the Sun family’s Jiangdong power.",
  },
  {
    name:"Xiaoqiao",role:"Zhou Yu’s companion",alias:"Younger Qiao sister",page:"Two_Qiaos",weapon:"Iron Fan",
    history:"The younger Qiao sister married Zhou Yu, while her elder sister married Sun Ce. Xiaoqiao is a designation meaning the younger Qiao, not a securely recorded personal name. The surviving historical references do not establish the youthful battlefield adventures depicted in the games.",
    portrayal:"Xiaoqiao meets the battlefield with curiosity and exuberance. Her attachment to Zhou Yu and contrast with Daqiao bring a playful family perspective into campaigns otherwise directed by generals and strategists.",
    relationships:["Zhou Yu · spouse","Daqiao · elder sister"],story:"Her youthful appearance is stylization. It should not supply a historical age or timeline for either Qiao sister.",
  },
  {
    name:"Zhou Tai",role:"Sun Quan’s protector",alias:"Youping",page:"Zhou_Tai",weapon:"Curved Sword",
    history:"Zhou Tai served Sun Ce and then Sun Quan. He became known for protecting Sun Quan at personal risk, with accounts using his wounds as evidence of that service. He is distinct from the Cao Wei general whose name is also rendered Zhou Tai in English.",
    portrayal:"Zhou Tai lets action carry the meaning of his loyalty. His sparse speech and scarred appearance make protection of Sun Quan feel like a commitment repeatedly demonstrated rather than something requiring explanation.",
    relationships:["Sun Ce · earlier lord","Sun Quan · protected lord"],story:"Rescue scenes express his place beside Sun Quan. They should not be merged with the career of the similarly named Wei officer.",
  },
  {
    name:"Zhu Ran",role:"General of Wu",alias:"Yifeng",page:"Zhu_Ran",weapon:"Flame Bow",source:official("Zhu Ran","syuzen"),
    history:"Zhu Ran, originally named Shi Ran, was a childhood acquaintance of Sun Quan and an adopted son of Zhu Zhi. He served in the Jing Province campaign and defended Jiangling against Wei after the Yiling campaign. His later military career is more extensive than his role in any single fire attack.",
    portrayal:"Zhu Ran enters Xtreme Legends as a confident officer carrying Wu’s expectations for its future. His connection to Sun Quan places him within the kingdom’s long personal relationships as well as its rising command.",
    relationships:["Sun Quan · childhood acquaintance and lord","Lu Meng · senior campaign commander"],story:"His later defense of Jiangling follows the campaign against Shu. Similar locations across scenarios still require separate objective checks.",
  },
]);

const shu=faction("SHU",[
  {
    name:"Bao Sanniang",role:"Warrior from the Guan Suo tradition",alias:"Bao Sanniang",page:"Bao_Sanniang",weapon:"Spinner",literary:true,
    history:"Bao Sanniang is a fictional warrior associated with stories of Guan Suo. Her place in that narrative tradition is different from the documented careers of Shu’s historical generals. The game adapts her as a playable companion of Guan Suo; no historical military service is asserted here.",
    portrayal:"Bao Sanniang brings independence, confidence, and open affection for Guan Suo to Shu. Her presence widens the roster beyond the court and command staff into the popular stories surrounding the Guan family.",
    relationships:["Guan Suo · romantic attachment in the game"],story:"Her connection to Guan Suo belongs to fiction and folklore. It should not establish a historical marriage or military appointment.",
  },
  {
    name:"Guan Ping",role:"Guan Yu’s son and follower",alias:"Guan Ping",page:"Guan_Ping",weapon:"Great Sword",
    history:"Guan Ping was Guan Yu’s eldest son and served in Liu Bei’s forces. Little is recorded beyond his capture and execution alongside his father after the loss of Jing Province. The familiar adopted-son account belongs to the novel’s treatment, rather than the historical description of their relationship.",
    portrayal:"Guan Ping carries the burden of living up to Guan Yu’s example. His earnest devotion makes the family’s celebrated loyalty something learned through service, while his own battlefield presence distinguishes him from a mere attendant.",
    relationships:["Guan Yu · father; adopted-son framing in the literary tradition","Guan Xing · brother","Xingcai · fellow officer of Shu’s younger generation"],story:"His fate is closely linked to Guan Yu’s fall. Hypothetical outcomes should not be used to extend his historical career.",
  },
  {
    name:"Guan Suo",role:"Guan family warrior",alias:"Guan Suo",page:"Guan_Suo",weapon:"Nunchaku",literary:true,
    history:"Guan Suo is a fictional son of Guan Yu who appears in popular tales and Romance of the Three Kingdoms. He is absent from the historical accounts of Guan Yu’s children. His adventures and relationships belong to the literary tradition that the game draws on alongside recorded history.",
    portrayal:"Guan Suo adds a gentle and personable member to Shu’s younger generation. His family loyalty and connection with Bao Sanniang make him a bridge between the Guan household’s martial legacy and its surrounding folklore.",
    relationships:["Guan Yu · father in fiction","Guan Yinping · sister in the game","Bao Sanniang · romantic companion"],story:"The game’s Guan siblings combine historical and fictional identities. Their shared family presentation does not make every sibling historically attested.",
  },
  {
    name:"Guan Xing",role:"Heir to Guan Yu’s legacy",alias:"Anguo",page:"Guan_Xing",weapon:"Wingblades",
    history:"Guan Xing was a son of Guan Yu and an official of Shu Han who inherited his father’s title. His recorded career is brief. The extensive fighting partnership with Zhang Bao familiar from the novel is a literary expansion, not a fully documented sequence of historical campaigns.",
    portrayal:"Guan Xing’s composure gives Shu’s new generation a quieter kind of confidence. His partnership with Zhang Bao renews the connection between their fathers while leaving room for different personalities and competing expectations.",
    relationships:["Guan Yu · father","Guan Ping · elder brother","Zhang Bao · close counterpart in the game"],story:"His alliance with Zhang Bao echoes the previous generation. The game’s expanded battlefield role should remain separate from his sparse historical biography.",
  },
  {
    name:"Guan Yinping",role:"Daughter of Guan Yu",alias:"Guan Yinping",page:"Guan_Yu",weapon:"Dual-headed Mace",
    history:"Historical sources mention an unnamed daughter of Guan Yu in connection with a marriage proposal from Sun Quan’s family. They do not record the name Guan Yinping or a military career for her. The named warrior draws on later tradition and the game’s characterization.",
    portrayal:"Guan Yinping combines extraordinary strength with an unassuming manner. Her place among the Guan siblings lets Shu’s younger generation inherit its family’s reputation while finding a warmer, less imposing expression of it.",
    relationships:["Guan Yu · father","Guan Xing · brother in the game","Guan Suo · brother in the game"],story:"Her strength and battlefield exploits are fictional characterization. The historical marriage proposal is not evidence for those abilities or adventures.",
  },
  {
    name:"Huang Zhong",role:"Veteran general of Shu",alias:"Hansheng",page:"Huang_Zhong",weapon:"Bow",
    history:"Huang Zhong served Liu Bei and played a decisive role in the defeat of Xiahou Yuan at Mount Dingjun in 219. He died in 220. The familiar elderly archer is strongly shaped by the novel; a precise age should not be inferred from the game’s appearance.",
    portrayal:"Huang Zhong refuses to let younger warriors define the limits of age. His pride in experience and archery gives Shu a veteran whose competitive spirit remains as lively as that of its new recruits.",
    relationships:["Liu Bei · lord","Wei Yan · fellow Shu general","Xiahou Yuan · opponent at Dingjun"],story:"His historical death precedes the Yiling campaign. Later battlefield appearances reflect dramatization or hypothetical chronology.",
  },
  {
    name:"Jiang Wei",role:"Commander of Shu’s later campaigns",alias:"Boyue",page:"Jiang_Wei",weapon:"Double-edge Trident",
    history:"Jiang Wei began in Wei’s service before joining Shu during Zhuge Liang’s first northern expedition in 228. He later led repeated campaigns against Wei. His commitment to continuing the war, its costs, and the circumstances of Shu’s collapse have produced sharply different historical assessments.",
    portrayal:"Jiang Wei treats Zhuge Liang’s ambition as an obligation to continue. His intensity gives Shu’s later story its drive, while the persistence of that dream can create tension with those who judge the future differently.",
    relationships:["Zhuge Liang · mentor","Liu Shan · ruler","Xiahou Ba · fellow Shu commander","Deng Ai · rival commander"],story:"His final efforts continue beyond Shu’s surrender and intersect with Zhong Hui’s rebellion. Those events belong behind the story spoiler boundary.",
  },
  {
    name:"Liu Shan",role:"Second ruler of Shu",alias:"Gongsi · Adou",page:"Liu_Shan",weapon:"Rapier",
    history:"Liu Shan succeeded his father Liu Bei as emperor of Shu Han in 223 and surrendered to Wei in 263. Evaluations of his ability and choices vary, especially over the end of Shu. The game’s interpretation of his intentions should not be presented as a settled historical verdict.",
    portrayal:"Liu Shan’s mild manner makes his priorities easy for others to underestimate. His position between inherited ambition, advisers’ expectations, and the welfare of his people gives Shu’s later campaign a different view of responsibility.",
    relationships:["Liu Bei · father","Zhuge Liang · chief adviser","Jiang Wei · leading commander","Xingcai · protector in the game"],story:"His decision to surrender contrasts with Jiang Wei’s determination to continue. The game gives that contrast its own interpretation.",
  },
  {
    name:"Ma Chao",role:"Northwestern warrior serving Shu",alias:"Mengqi",page:"Ma_Chao",weapon:"Spear",
    history:"Ma Chao, son of Ma Teng, led forces against Cao Cao in the northwest before eventually joining Liu Bei. His rebellion preceded the execution of the relatives held in Cao Cao’s territory. The novel’s revenge framing changes that sequence, so the two chronologies should not be treated as identical.",
    portrayal:"Ma Chao announces justice with force and conviction. His heroic self-image helps define his Shu identity, while Wang Yi’s opposing perspective exposes how differently the same conflicts are remembered by other characters.",
    relationships:["Ma Dai · cousin","Pang De · former subordinate","Liu Bei · later lord","Wang Yi · adversary"],story:"His move into Liu Bei’s service follows the collapse of his northwestern position. Shu affiliation does not describe his entire career.",
  },
  {
    name:"Ma Dai",role:"General of Shu",alias:"Ma Dai",page:"Ma_Dai",weapon:"Brush",
    history:"Ma Dai was Ma Chao’s younger cousin and followed him into Liu Bei’s service. The surviving historical record is limited. It includes his role in killing Wei Yan after Zhuge Liang’s death, an episode whose political context should not be replaced by the novel’s simpler dramatic explanation.",
    portrayal:"Ma Dai uses an easy smile and light manner to move through serious situations. His loyalty to Ma Chao and later service to Shu give that outward cheerfulness a background of displacement and difficult duty.",
    relationships:["Ma Chao · cousin","Liu Bei · lord","Wei Yan · officer killed in the succession conflict"],story:"The confrontation with Wei Yan follows Zhuge Liang’s death. Historical accusation and the game’s dramatic resolution should be distinguished.",
  },
  {
    name:"Pang Tong",role:"Strategic adviser",alias:"Shiyuan · Fledgling Phoenix",page:"Pang_Tong",weapon:"Shadow Fan",
    history:"Pang Tong advised Liu Bei during the acquisition of Yi Province and died during the campaign in 214. He was known as the Fledgling Phoenix. The novel expands his relationship with Zhuge Liang and the circumstances of his death; those scenes are not a substitute for the shorter historical account.",
    portrayal:"Pang Tong’s unassuming appearance and dry humor conceal an incisive strategist. His presence gives Shu another intellectual voice beside Zhuge Liang, with a temperament less concerned with projecting perfect dignity.",
    relationships:["Liu Bei · lord","Zhuge Liang · fellow strategist","Xu Shu · scholarly associate"],story:"His survival is one of the possibilities that changes Shu’s imagined future. Later participation must be tied to its branch.",
  },
  {
    name:"Wei Yan",role:"General of Shu",alias:"Wenchang",page:"Wei_Yan",weapon:"Double Voulge",
    history:"Wei Yan served Liu Bei, held command in Hanzhong, and took part in Zhuge Liang’s northern expeditions. After Zhuge Liang’s death, conflict with Yang Yi ended in Wei Yan’s killing by Ma Dai. The accusation of treason and later fictional portrayals should not be treated as an uncomplicated historical judgment.",
    portrayal:"Wei Yan communicates through fierce action and broken, forceful speech. His desire to prove loyalty clashes with the distrust he attracts, making belonging within Shu as important to his story as battlefield strength.",
    relationships:["Liu Bei · lord","Zhuge Liang · commander","Huang Zhong · fellow general","Ma Dai · opponent in the final internal conflict"],story:"His final conflict is an internal Shu crisis. The game’s manner of speech is characterization, not evidence about the historical officer’s intelligence.",
  },
  {
    name:"Xingcai",role:"Protector of Shu’s ruler",alias:"Daughter of Zhang Fei",page:"Empress_Zhang_(Liu_Shan%27s_second_wife)",weapon:"Sword & Shield",
    history:"Zhang Fei had two daughters who successively became empresses of Liu Shan. Their personal names are not preserved in the historical accounts. Xingcai is the game’s named warrior daughter; her combat career and protective role should not be read as a documented biography of either empress.",
    portrayal:"Xingcai answers uncertainty with composure and resolve. Her commitment to protecting Liu Shan connects the martial legacy of Zhang Fei’s family to Shu’s later court, where duty can mean defending choices she did not make.",
    relationships:["Zhang Fei · father in the game","Zhang Bao · brother in the game","Liu Shan · protected ruler","Guan Ping · fellow officer"],story:"Her loyalty continues into Shu’s final crisis. The game’s family framing should not assign invented names or battlefield deeds to the historical empresses.",
  },
  {
    name:"Xu Shu",role:"Scholar and adviser",alias:"Yuanzhi",page:"Xu_Shu",weapon:"Sword & Hook",
    history:"Xu Shu advised Liu Bei and recommended Zhuge Liang before entering Cao Cao’s service after his mother was captured. He later held office in Wei. The novel adds a deception and a vow never to advise Cao Cao; that literary treatment should not erase his documented later service.",
    portrayal:"Xu Shu’s modest, conflicted manner makes divided obligation central to his identity. His bond with Liu Bei and friendship with Zhuge Liang give Shu a strategist whose path can diverge from the cause he admires.",
    relationships:["Liu Bei · former lord","Zhuge Liang · friend and recommended adviser","Cao Cao · later lord"],story:"His departure and possible continued assistance to Shu are important branch distinctions. Exact hypothetical prerequisites remain a separate research task.",
  },
  {
    name:"Yueying",role:"Inventor and strategist’s partner",alias:"Lady Huang",page:"Lady_Huang",weapon:"Dagger-axe",
    history:"Lady Huang was Zhuge Liang’s wife and the daughter of Huang Chengyan. Her personal name is not recorded; Yueying belongs to later tradition. Accounts of her learning and the game’s inventive engineering persona should be distinguished from the very limited historical material about her.",
    portrayal:"Yueying turns intelligence into practical invention. Her partnership with Zhuge Liang adds a hands-on dimension to Shu’s strategic identity, showing that plans also depend on the people who make their tools and machines work.",
    relationships:["Zhuge Liang · spouse"],story:"The engineering feats shown in the game are fictional elaborations. This edition pairs her with the Dagger-axe rather than her later Empires weapon.",
  },
  {
    name:"Zhang Bao",role:"Heir to Zhang Fei’s legacy",alias:"Zhang Bao",page:"Zhang_Bao_(Shu_Han)",weapon:"Flail Sword",
    history:"Zhang Bao was Zhang Fei’s eldest son. The historical record says little beyond his parentage and early death; the novel greatly expands his military role alongside Guan Xing. He is not the Yellow Turban leader Zhang Bao, whose name is written with different Chinese characters.",
    portrayal:"Zhang Bao brings his father’s forcefulness into Shu’s next generation while taking responsibility for younger companions. His rapport with Guan Xing renews an inherited bond without simply reproducing their fathers’ personalities.",
    relationships:["Zhang Fei · father","Xingcai · sister in the game","Guan Xing · close counterpart in the game"],story:"His expanded campaigns belong to the game and its literary background. His identity must remain separate from Zhang Jiao’s brother.",
  },
]);

const jin=faction("JIN",[
  {
    name:"Deng Ai",role:"Commander in the conquest of Shu",alias:"Shizai",page:"Deng_Ai",weapon:"Lance",
    history:"Deng Ai served Cao Wei and played a decisive part in the conquest of Shu in 263. His advance brought him to Chengdu and Liu Shan’s surrender, but political conflict soon led to his arrest and death. His Jin roster placement describes the game’s later-era grouping, not a lifetime of Jin service.",
    portrayal:"Deng Ai approaches a campaign as a problem of terrain, preparation, and determination. His practical bearing contrasts with Zhong Hui’s desire for recognition, giving the conquest of Shu competing models of command.",
    relationships:["Sima Zhao · superior","Zhong Hui · rival commander","Jiang Wei · military opponent","Liu Shan · surrendering ruler"],story:"Victory over Shu does not secure his own position. The aftermath of the conquest becomes an internal political crisis.",
  },
  {
    name:"Guo Huai",role:"Wei’s western frontier commander",alias:"Boji",page:"Guo_Huai",weapon:"Arm Cannon",
    history:"Guo Huai served Cao Cao and successive Wei emperors, defending the western provinces over many years. He worked under Xiahou Yuan and Zhang He early in his career. He died before the foundation of Jin; the game groups him with its Jin-era story rather than changing the state he served.",
    portrayal:"Guo Huai’s frail appearance and persistent illness contrast with his refusal to abandon duty. His exaggerated Arm Cannon reinforces that contrast, giving the later campaign a veteran whose endurance is personal as well as military.",
    relationships:["Xiahou Yuan · earlier commander","Zhang He · earlier commander","Sima Yi · senior Wei commander"],story:"His game health characterization is not a timetable for historical events. His long Wei service precedes the Jin dynasty.",
  },
  {
    name:"Jia Chong",role:"Sima family adviser",alias:"Gonglü",page:"Jia_Chong",weapon:"Throwing Axes",
    history:"Jia Chong advised Sima Shi and Sima Zhao in Cao Wei and later held office under Sima Yan’s Jin dynasty. His political career was closely tied to the Sima family’s ascendancy. Unlike several characters grouped with Jin, he lived to serve the dynasty after its establishment.",
    portrayal:"Jia Chong accepts the harsh measures that Sima Zhao may hesitate to embrace. His calculating loyalty makes him both an effective adviser and a reminder that the new order’s success carries moral costs.",
    relationships:["Sima Shi · earlier superior","Sima Zhao · principal political ally","Zhuge Dan · political opponent"],story:"His support for the Sima family links Wei’s internal power struggles to the later establishment of Jin.",
  },
  {
    name:"Wen Yang",role:"Warrior of the later era",alias:"Ciqian · Wen Chu",page:"Wen_Yang_(Three_Kingdoms)",weapon:"Javelin",
    history:"Wen Yang, also known as Wen Chu, was Wen Qin’s son. He took part in rebellion against Wei, spent time in Wu’s service, and later returned to Wei before serving Jin. These changes of allegiance make a single faction label insufficient to describe his historical career.",
    portrayal:"Wen Yang brings a young warrior’s ideal of courage into the politically tangled Jin campaign. His straightforward heroism stands out among advisers and commanders whose decisions are shaped by suspicion and family power.",
    relationships:["Zhuge Dan · former ally in rebellion","Sima Zhao · later superior"],story:"His father’s death during Zhuge Dan’s rebellion changes his allegiance. The Jin roster label should not conceal that earlier opposition.",
  },
  {
    name:"Xiahou Ba",role:"Wei officer who joined Shu",alias:"Zhongquan",page:"Xiahou_Ba",weapon:"Siege Spear",
    history:"Xiahou Ba was a son of Xiahou Yuan and a general of Cao Wei. After Sima Yi seized power in 249, he defected to Shu, where he served in its later campaigns. His placement in the game’s Jin roster organizes the later narrative; it does not make him a loyal Jin officer historically.",
    portrayal:"Xiahou Ba’s heavy armor sits around an anxious, approachable personality. His difficult change of allegiance gives the later story a view from someone whose family ties no longer guarantee a secure place in Wei.",
    relationships:["Xiahou Yuan · father","Liu Shan · later ruler","Jiang Wei · fellow Shu commander","Sima Yi · leader whose coup preceded his defection"],story:"His move to Shu is a central identity change. Preserve it when reading battles through the game’s Jin grouping.",
  },
  {
    name:"Zhang Chunhua",role:"Sima family matriarch",alias:"Zhang Chunhua",page:"Zhang_Chunhua",weapon:"Wired Gloves",
    history:"Zhang Chunhua was Sima Yi’s wife and the mother of Sima Shi and Sima Zhao. She died in 247, before the Jin dynasty’s founding, and received imperial honors posthumously. The game’s combat role and domestic comedy are creative additions to accounts of the Sima household.",
    portrayal:"Zhang Chunhua’s calm authority can unsettle even Sima Yi. Her influence over the family brings its private relationships into the Jin campaign, balancing formidable political ambition with a household that has its own hierarchy.",
    relationships:["Sima Yi · spouse","Sima Shi · son","Sima Zhao · son"],story:"Her historical life ends before the Sima family takes the imperial throne. A Jin faction badge describes the game’s family grouping.",
  },
  {
    name:"Zhong Hui",role:"Ambitious Wei commander",alias:"Shiji",page:"Zhong_Hui",weapon:"Flying Swords",
    history:"Zhong Hui was a son of Zhong Yao and a prominent Wei official and commander. He helped conquer Shu, then rebelled against Sima Zhao in 264 with Jiang Wei’s involvement. The revolt failed and both men were killed. His cultural accomplishments and political ambition formed parts of the same career.",
    portrayal:"Zhong Hui expects his talent to be recognized and rewarded. His rivalry with Deng Ai makes the pursuit of distinction a source of friction even within a successful army, while his ambition reaches beyond the task assigned to him.",
    relationships:["Sima Zhao · superior","Deng Ai · rival commander","Jiang Wei · collaborator in rebellion","Wang Yuanji · wary observer in the game"],story:"The conquest of Shu leads into his rebellion rather than ending his story. Shared Jin grouping does not imply continued loyalty to the Sima family.",
  },
  {
    name:"Zhuge Dan",role:"Wei commander opposing Sima rule",alias:"Gongxiu",page:"Zhuge_Dan",weapon:"Short Rods",
    history:"Zhuge Dan served Cao Wei and rose to high command. He rebelled against Sima Zhao at Shouchun in 257, sought support from Wu, and was defeated the following year. His membership in the game’s Jin roster reflects the era of that conflict, including resistance to the Sima family.",
    portrayal:"Zhuge Dan places great weight on duty and his own standards of competence. His unease with the Sima family makes the Jin story a contest over legitimate authority, rather than a unified march by willing supporters.",
    relationships:["Sima Zhao · political adversary","Jia Chong · Sima family representative","Wen Yang · temporary ally in rebellion"],story:"Shouchun turns his opposition into open rebellion. The faction filter must not be read as a claim that he supported Jin’s eventual foundation.",
  },
]);

const other=faction("OTHER",[
  {
    name:"Diaochan",role:"Figure in the plot against Dong Zhuo",alias:"Diaochan",page:"Diaochan",weapon:"Chain Whip",literary:true,
    history:"Diaochan is chiefly a literary figure, central to the plot involving Wang Yun, Dong Zhuo, and Lü Bu in Romance of the Three Kingdoms. A historical account mentions Lü Bu’s affair with an unnamed maid of Dong Zhuo, but it does not establish the novel’s named heroine and complete intrigue.",
    portrayal:"Diaochan’s gentleness masks a willingness to act within a dangerous political situation. Her bond with Lu Bu gives his campaign an emotional attachment that raw strength cannot protect from every consequence.",
    relationships:["Lu Bu · close companion","Dong Zhuo · target of the literary plot"],story:"Her role in breaking the bond between Dong Zhuo and Lu Bu adapts a literary conspiracy. Later loyalties follow the game’s own portrayal.",
  },
  {
    name:"Dong Zhuo",role:"Warlord controlling the Han court",alias:"Zhongying",page:"Dong_Zhuo",weapon:"Bomb",
    history:"Dong Zhuo seized control of the Han court, replaced the emperor, and faced a coalition of regional powers. He moved the court from Luoyang to Chang’an and was assassinated in 192 by Lü Bu in a plot involving Wang Yun. His domination preceded the three rival imperial states.",
    portrayal:"Dong Zhuo presents power as permission to indulge himself. His coercive control of the court supplies early campaigns with a shared enemy, while his reliance on Lu Bu makes personal loyalty a weakness in his rule.",
    relationships:["Lu Bu · subordinate and eventual assassin","Diaochan · figure in the game’s conspiracy","Yuan Shao · coalition opponent"],story:"His alliance with Lu Bu ends in betrayal. The detailed seduction scheme belongs to literary and game dramatization.",
  },
  {
    name:"Meng Huo",role:"Leader of Nanzhong",alias:"Meng Huo",page:"Meng_Huo",weapon:"Gloves",
    history:"Meng Huo appears in later accounts of Zhuge Liang’s southern campaign, although his historical status and details of the story are debated. Romance of the Three Kingdoms expands him into a major southern leader. The repeated captures and releases should be understood within that layered tradition.",
    portrayal:"Meng Huo leads through pride in his people and determination to protect their home. His exuberant confidence and partnership with Zhurong give the southern campaigns a viewpoint beyond the ambitions of the three kingdoms.",
    relationships:["Zhurong · spouse in fiction and the game","Zhuge Liang · campaign opponent"],story:"His eventual cooperation with Shu follows repeated confrontations in the story. The portrayal is not a reliable ethnographic description of Nanzhong’s peoples.",
  },
  {
    name:"Yuan Shao",role:"Northern warlord",alias:"Benchu",page:"Yuan_Shao",weapon:"Extension Blade",
    history:"Yuan Shao came from a prominent family, led the coalition against Dong Zhuo, and controlled extensive northern territories. Cao Cao defeated him at Guandu in 200; he died in 202. His later loss should not obscure the scale of his earlier political and military power.",
    portrayal:"Yuan Shao treats noble ancestry as proof of his right to lead. His ceremonial confidence gives the early chronicle a rival vision of authority to Cao Cao’s emphasis on ability and results.",
    relationships:["Cao Cao · former associate and rival","Zhang He · former subordinate","Dong Zhuo · coalition target"],story:"Guandu breaks his challenge to Cao Cao, but the struggle over the Yuan family’s territories continues beyond his lifetime.",
  },
  {
    name:"Zhang Jiao",role:"Yellow Turban religious leader",alias:"Zhang Jue",page:"Zhang_Jue",weapon:"Shaman Rod",
    history:"Zhang Jue, rendered Zhang Jiao in the game, led the Yellow Turban movement and its rebellion in 184. His religious teaching drew followers amid hardship and distrust of the Han government. Accounts of miraculous powers and the game’s battlefield spells should not be treated as demonstrated historical abilities.",
    portrayal:"Zhang Jiao speaks as the herald of a new age. His fervor makes the Yellow Turbans more than an opening enemy army: they represent an alternative claim to authority as the Han order begins to fracture.",
    relationships:["Liu Bei · opponent in the game’s early conflict","Cao Cao · opponent in the game’s early conflict","Sun Jian · opponent in the game’s early conflict"],story:"His brother Zhang Bao is not the playable Shu officer of the same English name. The uprising precedes the founding of Wei, Wu, and Shu.",
  },
  {
    name:"Zhurong",role:"Warrior of Nanzhong",alias:"Lady Zhurong",page:"Lady_Zhurong",weapon:"Boomerang",literary:true,
    history:"Lady Zhurong is a fictional character in Romance of the Three Kingdoms, portrayed as Meng Huo’s wife. She claims descent from the fire deity whose name she bears. This is a literary identity, not a documented historical commander or a verified divine ancestry.",
    portrayal:"Zhurong meets danger with confidence and often supplies the practical resolve beside Meng Huo’s exuberance. Their partnership makes the defense of Nanzhong a family commitment as well as a struggle over territory.",
    relationships:["Meng Huo · spouse in fiction and the game","Zhuge Liang · campaign opponent"],story:"Her battles against Shu adapt the novel’s southern campaign. They should not be inserted into a historical biography as recorded events.",
  },
  {
    name:"Zuo Ci",role:"Wandering Daoist mystic",alias:"Yuanfang",page:"Zuo_Ci",weapon:"Talisman Cards",
    history:"Zuo Ci is a figure of Daoist legend associated with the late Han. Tales credit him with transformations, longevity, and encounters with Cao Cao. Those supernatural episodes come from religious and literary traditions; they are not independently established battlefield events or a secure chronology of his life.",
    portrayal:"Zuo Ci stands outside ordinary faction ambitions and judges rulers by a wider moral horizon. His magical presence lets the game question whether victory and political control are sufficient answers to the suffering caused by war.",
    relationships:["Cao Cao · ruler confronted in legend and the game","Liu Bei · favored figure in the game’s moral framing"],story:"His interventions cross the boundary between the chronicle and the supernatural. They should remain identified as fictional or legendary scenes.",
  },
]);

export const rosterDossiers:Record<string,Dossier>={...wei,...wu,...shu,...jin,...other};
