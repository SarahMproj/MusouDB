import {shuRoute, routeSource} from "./dw8xl";
import type {Source, StageGuide} from "./dw8xl";

const optional: Source = {label:"Ayase Eli · Optional Mission Guide",url:"https://steamcommunity.com/sharedfiles/filedetails/?id=259991536",kind:"Community guide · Wei and Lu Bu"};
const stars: Source = {label:"chromsumia77 · Star Objectives Guide",url:"https://steamcommunity.com/sharedfiles/filedetails/?id=2839327860",kind:"Community guide · Wu"};
const rebellion: Source = {label:"Community discussion · Jin branch troubleshooting",url:"https://steamcommunity.com/app/278080/discussions/0/540742396943067213/",kind:"Community observations"};
export type RouteStep = {battleId:string;title:string;goal:string;reward:string;kind:"prerequisite"|"side-stage"|"branch"};
export type CampaignRoute = {id:string;name:string;scope:string;checked:string;steps:RouteStep[];sources:Source[];note?:string};
const step=(battleId:string,title:string,goal:string,reward:string,kind:RouteStep["kind"]="prerequisite"):RouteStep=>({battleId,title,goal,reward,kind});
export const campaignRoutes:CampaignRoute[]=[
 {id:"shu",name:"Shu",scope:"DW8 base campaign",checked:"2026-09-09",sources:[routeSource],steps:shuRoute.map((s,i)=>({...s,title:["Yellow Turban Rebellion","Defense of Xu Province","Battle of Chibi","Battle of Chengdu","Battle of Mt. Dingjun","Battle of Fan Castle"][i],kind:i===5?"branch":"prerequisite"}))},
 {id:"wei",name:"Wei",scope:"DW8 base campaign",checked:"2026-09-13",sources:[optional],note:"Luoyang’s Lu Bu star and Xu Province’s Puyang unlock are optional extras for this branch. Wan Castle’s Xiapi unlock requires a different outcome.",steps:[
  step("wei-wan-castle","Battle of Wan Castle","Save Cao Ang and Cao Anmin; keep Dian Wei alive.","Secure the rescue outcome."),
  step("wei-mt-bailang","Battle of Mt. Bailang","Protect Guo Jia’s withdrawal.","Keep Guo Jia available."),
  step("wei-xinye","Battle of Xinye","Beat Xu Shu before reaching Cao Ren.","Secure the Xinye star."),
  step("wei-chibi","Battle of Chibi","After the prerequisite stars, choose Guo Jia in camp and win.","Continue the hypothetical campaign.","branch"),
 ]},
 {id:"wu",name:"Wu",scope:"DW8 base campaign",checked:"2026-09-13",sources:[stars],steps:[
  step("xiangyang","Battle of Xiangyang","Catch and defeat Lu Gong before his retreat succeeds.","Earn the early branch star."),
  step("wu-little-conqueror","The Little Conqueror in Peril","Defeat Xiahou Dun and Gan Ji before escaping.","Open Defeat Gan Ji.","side-stage"),
  step("wu-defeat-gan-ji","Defeat Gan Ji","Destroy the sorcery-generating structure, then finish the mission.","Complete the side-stage prerequisite."),
  step("wu-nanjun","Battle of Nanjun","Make both parts of the decoy strategy succeed.","Preserve Zhou Yu’s later role."),
  step("wu-jing-province","Battle of Jing Province","Follow Lu Su’s strategy and bring him to Jing Province Castle.","Secure Lu Su’s branch condition."),
  step("wu-hefei","Battle of Hefei","With the earlier prerequisites complete, select Zhou Yu’s conversation and win.","Continue the hypothetical campaign.","branch"),
 ]},
 {id:"jin",name:"Jin",scope:"DW8 base campaign",checked:"2026-09-13",sources:[routeSource,rebellion],steps:[
  step("jin-coup","Coup d’état","Defeat Cao Xun, Cao Yi and He Yan before Cao Shuang.","Open Xiahou Ba’s Journey.","side-stage"),
  step("jin-xiahou-ba","Xiahou Ba’s Journey","Quickly defeat Jiang Wei.","Secure Xiahou Ba’s prerequisite."),
  step("jin-east-gates","East Gates Battle","Bring every ally out alive.","Open Battle of New Hefei Castle.","side-stage"),
  step("jin-new-hefei","Battle of New Hefei Castle","Keep every castle gate defended.","Secure Zhuge Dan’s prerequisite."),
  step("jin-mt-tielong","Battle of Mt. Tielong","Rescue Guo Huai.","Secure the Tielong prerequisite."),
  step("jin-rebellion","Guanqiu Jian and Wen Qin’s Rebellion","Clear the other officers first; leave Wen Qin and Wen Yang until last, defeating the father before the son.","Earn the rebellion star."),
  step("jin-xuchang","Battle of Xuchang","After completing the earlier stars, speak to Wen Yang and win.","Continue the hypothetical campaign.","branch"),
 ],note:"For the rebellion, use the western approach and stop the three Wu ambushes before the final confrontation; the pincer approach can miss the star."},
 {id:"lu-bu",name:"Lu Bu",scope:"Xtreme Legends campaign",checked:"2026-09-13",sources:[optional],steps:[
  step("lu-bu-getaway","Getaway from Hulao Gate","Reach Hua Xiong and rescue him.","Earn the opening prerequisite."),
  step("lu-bu-changan","Uprising at Chang’an","Tame all three tigers and protect Wang Yun.","Open Changshan and secure Wang Yun’s condition.","side-stage"),
  step("lu-bu-changshan","Battle of Changshan","Rescue Yuan Shao’s forces on all three occasions.","Earn the side-stage star."),
  step("lu-bu-dingtao","Battle of Dingtao","With the prerequisites complete, choose Hua Xiong’s camp conversation and win.","Continue the hypothetical campaign.","branch"),
 ]},
];
// Dedicated scenario IDs prevent Wei Chibi from inheriting Shu's altar or Xu Shu objectives.
export const routeStages:StageGuide[]=campaignRoutes.flatMap(route=>route.steps.filter(s=>s.battleId.startsWith(`${route.id}-`)).map(s=>({id:s.battleId,name:s.title,side:route.name,year:route.scope,context:`${s.title} in the ${route.name} campaign. Open the route requirement below for its place in the branching story.`,officerIds:[]})));
export const routeRequirements=(battleId:string)=>campaignRoutes.flatMap(route=>route.steps.filter(s=>s.battleId===battleId).map(step=>({route,step})));
