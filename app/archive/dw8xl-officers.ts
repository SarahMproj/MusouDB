import type {Dossier, Source} from "./dw8xl";

// Original, edition-scoped research. History is a secondary-source overview;
// portrayal is editorial interpretation, and combat notes are community observations.
const history=(name:string,page:string):Source=>({label:`${name} · historical background and references`,url:`https://en.wikipedia.org/wiki/${page}`,kind:"Historical overview · secondary source"});
const weaponSource:Source={label:"wowitsyugi · base DW8 weapon associations (unchanged returning weapons only)",url:"https://gamefaqs.gamespot.com/ps3/688499-dynasty-warriors-8/faqs/67510",kind:"Community guide · weapon association"};
const official=(name:string,page:string):Source=>({label:`KOEI TECMO · ${name} portrayal and weapon`,url:`https://www.koeitecmoamerica.com/dw8xl/window/${page}.html`,kind:"Official publisher"});
const checked="2026-09-23";
const gameplayContext="These community notes concern developed characters on Ultimate difficulty; they are starting points, not guaranteed damage results or universal rankings.";

export const additionalDossiers:Record<string,Dossier>={
  "guan-yu":{
    checked,gameplayContext,
    history:"Guan Yu served Liu Bei during the late Han and briefly served Cao Cao before rejoining Liu Bei. His command in Jing Province made him central to the rivalry with Sun Quan. Later worship and Romance of the Three Kingdoms enlarged his reputation for loyalty; the Peach Garden ceremony belongs to the novel, not a documented historical event.",
    historySource:history("Guan Yu","Guan_Yu"),
    summary:"Liu Bei’s steadfast general. His DW8XL CE Crescent Blade combines long reach with EX-enhanced offense.",
    gameplay:"Build around his C1-EX buff, then follow with C6-EX.",exNote:"C1-EX and C6-EX.",
    weaponId:"crescent-blade",weapon:{name:"Crescent Blade",style:"Buffs and sweeping strikes"},sources:[weaponSource],
    battles:["fan-castle"],
    profile:{kingdom:"SHU",role:"General of Shu",alias:"Yunchang",biography:"Guan Yu gives Shu’s ideal of loyalty a formidable battlefield presence. His bond with Liu Bei and Zhang Fei makes military duty feel personal, while his children connect that legacy to the next generation.",relationships:["Liu Bei · sworn brother in the game’s literary tradition","Zhang Fei · sworn brother in the game’s literary tradition","Guan Ping · son","Guan Xing · son"],spoiler:"Fan Castle is the hinge between Shu’s historical and hypothetical branches. Use the campaign checklist for prerequisites; a rare-weapon objective is a separate task."},
  },
  "zhang-fei":{
    checked,gameplayContext,
    history:"Zhang Fei was a long-serving general under Liu Bei. Historical accounts describe his rearguard action at Changban and his later victory over Zhang He at Baxi. His service included independent command, not only physical bravery. The novel’s sworn-brother ceremony and embellished bridge scene should be distinguished from those accounts.",
    historySource:history("Zhang Fei","Zhang_Fei"),
    summary:"Shu’s fierce frontline protector, wielding the Double Pike in DW8XL CE. His loyalty connects him to Liu Bei’s earliest followers.",
    gameplay:"Use his C1-EX buff before committing to C6’s grab.",exNote:"C1-EX supplies a buff.",
    weaponId:"double-pike",weapon:{name:"Double Pike",style:"Buffs and grabs"},sources:[weaponSource],battles:["changban"],
    profile:{kingdom:"SHU",role:"Frontline general",alias:"Yide",biography:"Zhang Fei is the forceful counterpart to Guan Yu’s composure. The game builds his identity around fierce loyalty, a volatile temper, and the determination to protect Liu Bei’s people when a retreat turns desperate.",relationships:["Liu Bei · sworn brother in the game’s literary tradition","Guan Yu · sworn brother in the game’s literary tradition","Zhang Bao · son","Xingcai · daughter in the game"],spoiler:"Changban puts civilian protection alongside combat objectives. Survival requirements for individual rewards need to be checked separately from simply winning the stage."},
  },
  "xiahou-dun":{
    checked,gameplayContext,
    history:"Xiahou Dun served Cao Cao as a commander and administrator. He lost an eye in fighting during the conflict with Lü Bu, but the famous episode in which he consumes it is a literary embellishment. His historical career also involved agriculture and public works, a broader remit than the game’s frontline image suggests.",
    historySource:history("Xiahou Dun","Xiahou_Dun"),
    summary:"Cao Cao’s resolute general, using the Podao in DW8XL CE. His direct fighting style complements his uncompromising characterization.",
    gameplay:"C2-EX feeds gauges; Shadow Sprint helps continue pressure.",exNote:"C2-EX and C3-EX.",
    weaponId:"podao",weapon:{name:"Podao",style:"Advancing sword attacks"},sources:[weaponSource],battles:[],
    profile:{kingdom:"WEI",role:"General and trusted commander",alias:"Yuanrang",biography:"Xiahou Dun expresses Wei’s ambitions through personal loyalty to Cao Cao. His blunt manner and readiness to take the front line make him a useful contrast to the faction’s more calculating advisers.",relationships:["Cao Cao · lord and trusted ally","Xiahou Yuan · fellow Xiahou commander"],spoiler:"His Wei scenarios share locations with other kingdoms’ stories. Check the side and scenario name before following a battlefield or weapon objective."},
  },
  "zhang-liao":{
    checked,gameplayContext,
    history:"Zhang Liao served Lü Bu before joining Cao Cao after the fall of Xiapi. He became an important commander in Cao Cao’s forces and later Cao Wei. His defense of Hefei against Sun Quan made him especially famous. His change of allegiance is part of his historical career, not evidence of a separate person with the same name.",
    historySource:history("Zhang Liao","Zhang_Liao"),
    summary:"A disciplined warrior whose career crosses Lu Bu’s and Wei’s stories. His DW8XL CE signature weapon is the Twin Axes.",
    gameplay:"C4-EX strengthens offense; switching removes that buff, so plan transitions.",exNote:"C1-EX and C4-EX.",
    weaponId:"twin-axes",weapon:{name:"Twin Axes",style:"Buff-driven pressure"},sources:[weaponSource],battles:[],
    profile:{kingdom:"WEI",role:"General of Wei",alias:"Wenyuan",biography:"Zhang Liao is written around martial discipline and respect for worthy opponents. His place in both Lu Bu’s orbit and Wei’s service lets the archive follow one character through changing allegiances without splitting his identity.",relationships:["Lu Bu · former lord","Cao Cao · later lord","Li Dian · fellow Hefei defender","Yue Jin · fellow Hefei defender"],spoiler:"His allegiance changes across the chronicle. The Wei roster classification describes this edition’s archive grouping, not every period of his story."},
  },
  "zhou-yu":{
    checked,gameplayContext,
    history:"Zhou Yu (175–210) served Sun Ce and then Sun Quan. He was a leading commander in the defeat of Cao Cao at Red Cliffs and the subsequent fighting around Jiangling. His close friendship with Sun Ce is historically recorded. The jealous rivalry with Zhuge Liang familiar from the novel is a later dramatization.",
    historySource:history("Zhou Yu","Zhou_Yu"),
    summary:"Wu’s poised commander and Sun Ce’s close companion. DW8XL CE pairs him with the Staff and mobile aerial offense.",
    gameplay:"EX follow-ups build gauges; aerial strings provide another approach.",exNote:"C2-EX and C5-EX.",
    weaponId:"staff",weapon:{name:"Staff",style:"Mobile staff strings"},sources:[weaponSource],battles:["chibi"],
    profile:{kingdom:"WU",role:"Commander and strategist",alias:"Gongjin",biography:"Zhou Yu carries Wu’s confidence in its own future. His friendship with Sun Ce and command beside Sun Quan connect the kingdom’s early expansion to the strategic contest at Chibi.",relationships:["Sun Ce · close friend","Sun Quan · lord","Xiaoqiao · spouse","Lu Su · fellow adviser"],spoiler:"His continued presence in Wu’s hypothetical story differs from the historical sequence. Branch outcomes belong with campaign notes, rather than the historical biography."},
  },
  "lu-xun":{
    checked,gameplayContext,
    history:"Lu Xun (183–245), courtesy name Boyan, served Sun Quan and later became Wu’s chancellor. He helped Lü Meng take Jing Province and commanded Wu’s victory against Liu Bei at Xiaoting, commonly associated with Yiling. His career extended into civil administration and court politics; the game’s youthful appearance should not be used to infer his age at every battle.",
    historySource:history("Lu Xun","Lu_Xun_(Eastern_Wu)"),
    summary:"A commander of Wu’s later campaigns. His DW8XL CE Swallow Swords support close positioning and aerial follow-ups.",
    gameplay:"Aim C3 carefully; C5-EX offers gauge building and follow-ups.",exNote:"C5-EX supports gauge building.",
    weaponId:"swallow-swords",weapon:{name:"Swallow Swords",style:"Mobile paired blades"},sources:[weaponSource],battles:["yiling"],
    profile:{kingdom:"WU",role:"Commander and strategist",alias:"Boyan",biography:"Lu Xun represents Wu’s ability to renew its leadership. The game contrasts his youthful presentation with the responsibility of directing veteran officers and making decisions on which the kingdom’s survival depends.",relationships:["Sun Quan · lord","Lu Meng · senior commander","Liu Bei · opponent at Yiling"],spoiler:"Yiling pits him against Liu Bei. The Wu scenario’s reward conditions should not be applied to the Shu version merely because the battlefield name matches."},
  },
  "sima-shi":{
    checked,gameplayContext,
    history:"Sima Shi (208–255) was Sima Yi’s elder son and Sima Zhao’s elder brother. He controlled Cao Wei’s government after his father’s death and deposed the emperor Cao Fang. He died before the Jin dynasty was founded. The game’s Jin label therefore groups the Sima family’s rise rather than naming the state he served throughout his life.",
    historySource:history("Sima Shi","Sima_Shi"),
    summary:"The stern elder Sima brother, grouped with Jin in DW8XL CE. His signature weapon is the Lightning Sword.",
    gameplay:"C3 emphasizes grabs; C4 offers an option against groups.",exNote:"C4-EX and C6-EX.",
    weaponId:"lightning-sword",weapon:{name:"Lightning Sword",style:"Grabs and area strikes"},sources:[weaponSource],battles:[],
    profile:{kingdom:"JIN",role:"Sima family commander",alias:"Ziyuan",biography:"Sima Shi gives the Jin story a severe standard of competence. As the elder brother, he contrasts with Sima Zhao’s relaxed manner while sharing the family’s belief that capability should determine who leads.",relationships:["Sima Yi · father","Zhang Chunhua · mother","Sima Zhao · younger brother"],spoiler:"His command forms an earlier phase of the Jin campaign than Sima Zhao’s. Exact scenario assignments and branch prerequisites remain separate research tasks."},
  },
  "sima-zhao":{
    checked,gameplayContext,
    history:"Sima Zhao (211–265) succeeded Sima Shi as Cao Wei’s regent. The conquest of Shu took place during his control of Wei, and he received the title King of Jin. His son Sima Yan established the Jin dynasty after his death. Sima Zhao was not a reigning Jin emperor during the events summarized here.",
    historySource:history("Sima Zhao","Sima_Zhao"),
    summary:"The younger Sima brother and a central figure in the Jin campaign. DW8XL CE gives him the Striking Sword.",
    gameplay:"Hold C6’s charge input to make use of its ranged offense.",exNote:"Full EX inputs remain open.",
    weaponId:"striking-sword",weapon:{name:"Striking Sword",style:"Charged sword offense"},sources:[weaponSource],battles:[],
    profile:{kingdom:"JIN",role:"Sima family successor",alias:"Zishang",biography:"Sima Zhao’s relaxed outward manner sits beside increasing responsibility. The game uses that tension to follow his development as a leader, with Wang Yuanji often challenging the gap between what he can do and what he admits he wants.",relationships:["Sima Yi · father","Sima Shi · elder brother","Wang Yuanji · spouse","Jia Chong · close adviser"],spoiler:"His later campaign concerns the defeat of Shu and the Sima family’s ascendancy. Hypothetical outcomes must be read as game branches, not historical events."},
  },
  "chen-gong":{
    checked,gameplayContext,
    history:"Chen Gong was an adviser who supported Lü Bu after an earlier association with Cao Cao. He was captured and executed following the fall of Xiapi in 199. Romance of the Three Kingdoms greatly expands his break with Cao Cao; its fugitive-escape and murder episodes should not be presented as an uncontested historical biography.",
    historySource:history("Chen Gong","Chen_Gong"),
    summary:"Lu Bu’s ambitious strategist and an Xtreme Legends newcomer. His Art of War Scroll brings a commander’s theatrical presence into combat.",
    gameplay:"C1-EX builds gauges; C3 can set up a Ground Musou.",exNote:"C1-EX supports gauge building.",
    weaponId:"art-of-war-scroll",weapon:{name:"Art of War Scroll",style:"Command-themed attacks"},sources:[official("Chen Gong","chinkyu")],battles:["assault-xiapi","xiapi-defense"],
    profile:{kingdom:"OTHER",role:"Strategist serving Lu Bu",alias:"Gongtai",biography:"Chen Gong sees Lu Bu’s strength as the means to realize his own ambitions. His restless confidence makes strategy a source of both promise and friction within the expanded Lu Bu campaign.",relationships:["Lu Bu · lord","Lu Lingqi · allied officer","Cao Cao · former associate and rival"],spoiler:"Lu Bu’s hypothetical campaign explores a different outcome for this alliance. Assault on Xiapi and Xiapi Defensive Battle are distinct scenarios, with different objectives."},
  },
  "fa-zheng":{
    checked,gameplayContext,
    history:"Fa Zheng (176–220) first served Liu Zhang before advising Liu Bei. He helped Liu Bei secure Yi Province and contributed to the Hanzhong campaign. Historical accounts describe both his strategic influence and his readiness to repay favors and grievances. His work preceded Liu Bei’s proclamation as emperor of Shu Han.",
    historySource:history("Fa Zheng","Fa_Zheng"),
    summary:"A calculating adviser introduced as playable in Xtreme Legends. Fa Zheng uses Woven Cloth in DW8XL CE.",
    gameplay:"Place the cloth to control space before following with C5-EX.",exNote:"C5-EX interacts with cloth setups.",
    weaponId:"woven-cloth",weapon:{name:"Woven Cloth",style:"Placed cloth setups"},sources:[official("Fa Zheng","housei")],battles:[],
    profile:{kingdom:"SHU",role:"Strategic adviser",alias:"Xiaozhi",biography:"Fa Zheng introduces a sharper edge to Shu’s benevolent self-image. His attention to debts, opportunities, and calculated retaliation gives Liu Bei an adviser whose methods are less idealistic than the cause he supports.",relationships:["Liu Bei · lord","Zhuge Liang · fellow adviser","Huang Zhong · fellow Hanzhong campaign figure"],spoiler:"His XL scenarios should not inherit unlock conditions from the base Shu campaign. Defense of Mt. Dingjun and Battle of Mt. Dingjun require separate records and verification."},
  },
};
