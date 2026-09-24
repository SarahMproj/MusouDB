# DW8XL CE research notes

Scope: Dynasty Warriors 8: Xtreme Legends Complete Edition (2014; Windows, PlayStation 4, PlayStation Vita). The linked manual is the PC manual. These notes do not apply to Empires, Dynasty Warriors 9, or the later Definitive Edition’s DLC bundle.

The original ten dossiers are Cao Cao, Liu Bei, Sun Quan, Sima Yi, Lu Bu, Zhao Yun, Sun Shangxiang, Wang Yuanji, Lu Lingqi and Zhuge Liang. The September 23 expansion adds Guan Yu, Zhang Fei, Xiahou Dun, Zhang Liao, Zhou Yu, Lu Xun, Sima Shi, Sima Zhao, Chen Gong and Fa Zheng, bringing the first expansion to twenty. The roster-completion pass adds the remaining 62, for all 82 playable officers. History summaries and gameplay commentary are original prose. No publisher images, game files, guide tables or third-party biographies are reproduced.

## Source boundaries

- Publisher: [manual](https://store.steampowered.com/manual/278080), [EX attacks](https://www.koeitecmoamerica.com/dw8xl/system-action.html), [rare weapons and fusion](https://www.koeitecmoamerica.com/dw8xl/system-yarikomi.html), [Lu Lingqi](https://www.koeitecmoamerica.com/dw8xl/window/ryoreiki.html).
- Community observations: [Aranea and collaborators](https://steamcommunity.com/sharedfiles/filedetails/?id=319075861) support the short playstyle notes; these are not universal tier rankings.
- Rare conditions: [Seff](https://steamcommunity.com/sharedfiles/filedetails/?id=596231364), [Jimbo Gaming](https://steamcommunity.com/sharedfiles/filedetails/?id=795361641), [Biosim](https://steamcommunity.com/sharedfiles/filedetails/?id=268837364). Each weapon record names its supporting guide.
- Shu route: [Wynter and contributors](https://www.tapatalk.com/groups/koeiwarriors/dynasty-warriors-8-hypothetical-guide-t18440.html), covering the base campaign included in Complete Edition.
- Historical background: individual linked Wikipedia articles and their references, labeled secondary overviews. Game biographies are separately labeled editorial interpretation. Lady Sun’s historical personal name and the name of Lü Bu’s daughter are not established by these historical records.

Sources checked 2026-09-09. Community guides are not publisher confirmation. Conditions have not been replayed in a fresh save. Prefer direct in-game verification before expanding an uncertain field.

## Checks and known disagreements

Battle titles can vary in English-language guides: Assault on Xiapi is distinct from Xiapi Defensive Battle, and Pursuit at Wuzhang Plains is distinct from Battle of Wuzhang Plains. Keep separate IDs. Jin’s hypothetical Battle of Jianye is distinct from other Jianye scenarios.

Sima Yi’s fifth-weapon guides disagree on a target’s localized name (Zhang Ni / Zhang Yi). This collection instead supplies his sixth-weapon objective at Unrest at Luoyang, explicitly Free Mode only. Zhao Yun’s linked reward is his sixth weapon at Escape from Jiangdong; do not use the base-game Yiling condition for that reward.

Keep exact event-based timers: Sun Shangxiang’s two-minute window begins with Sun Jian’s order; Wang Yuanji’s begins with Jianye’s gate opening. Lu Lingqi’s requirement is an ordering constraint, not a time limit. Conditions for acquiring a rare weapon are not character unlock requirements.

## Editorial projection

Approved biography is explicitly spoiler-safe in the contribution form and may be summarized on cards. Approved gameplay supports search, approved weapon drives filter options, and published field counts stay distinct from whole-record review status. The same field precedence and legacy-copy guard apply to detail and browsing. Unlock and route text remain outside the browsing payload.

The runtime catalog remains separate from data/ JSON samples. New content lives in app/archive/dw8xl.ts and its officer modules and is integrated by app/data.ts; no backfill or production D1 writes are required.

## Officer expansion — 2026-09-23

The additional dossiers live in `app/archive/dw8xl-officers.ts`. Each has its own research date; existing records retain their September 9 date. This is a curated expansion of ten records, not an imported third-party dataset.

| Officer | DW8XL CE signature weapon | Sources beyond the shared manual and combat analysis |
| --- | --- | --- |
| Guan Yu | Crescent Blade | [Historical overview](https://en.wikipedia.org/wiki/Guan_Yu), returning-weapon association below |
| Zhang Fei | Double Pike | [Historical overview](https://en.wikipedia.org/wiki/Zhang_Fei), returning-weapon association below |
| Xiahou Dun | Podao | [Historical overview](https://en.wikipedia.org/wiki/Xiahou_Dun), returning-weapon association below |
| Zhang Liao | Twin Axes | [Historical overview](https://en.wikipedia.org/wiki/Zhang_Liao), returning-weapon association below |
| Zhou Yu | Staff | [Historical overview](https://en.wikipedia.org/wiki/Zhou_Yu), returning-weapon association below |
| Lu Xun | Swallow Swords | [Historical overview](https://en.wikipedia.org/wiki/Lu_Xun_(Eastern_Wu)), returning-weapon association below |
| Sima Shi | Lightning Sword | [Historical overview](https://en.wikipedia.org/wiki/Sima_Shi), returning-weapon association below |
| Sima Zhao | Striking Sword | [Historical overview](https://en.wikipedia.org/wiki/Sima_Zhao), returning-weapon association below |
| Chen Gong | Art of War Scroll | [Historical overview](https://en.wikipedia.org/wiki/Chen_Gong), [publisher character page](https://www.koeitecmoamerica.com/dw8xl/window/chinkyu.html) |
| Fa Zheng | Woven Cloth | [Historical overview](https://en.wikipedia.org/wiki/Fa_Zheng), [publisher character page](https://www.koeitecmoamerica.com/dw8xl/window/housei.html) |

[wowitsyugi's base DW8 weapon FAQ](https://gamefaqs.gamespot.com/ps3/688499-dynasty-warriors-8/faqs/67510) supports only the eight returning officers' weapon associations here. Its base-game affinity, upgrade, roster and unlock rules are not transferred into Complete Edition. The publisher character pages support the two XL newcomers' weapons and characterization. Zhang Fei's earlier Double Voulge seed is corrected to Double Pike; Double Voulge belongs to Wei Yan in the cited roster.

Short combat notes use the existing Aranea community analysis, whose setup assumes developed characters on Ultimate difficulty. They do not promise damage thresholds or universal rankings. Only explicitly supported EX strings are named; a complete input table still needs verification. Game-portrayal paragraphs are labeled editorial readings. Historical overviews and their references support historical relationships; sworn brotherhood and Xingcai's game identity are labeled as adaptation.

The ten added profiles link to weapon research pages without implying that rare acquisition requirements are complete. Their rare guides remain unfilled, so the coverage count stays at ten. Scenario links are included only where the existing archive provides the corresponding supported context; missing stage coverage is not filled by matching a place name across factions. PR #7's campaign expansion remains separate.


## Full roster core profiles — 2026-09-23

`app/archive/dw8xl-roster.ts` contains 62 individually authored core dossiers. Each has a historical or literary overview, a separately labeled editorial portrayal, named relationships, a signature weapon, a source link and a story note. These are original summaries, not a database import or copied biographies. The shared constructor supplies formatting and explicit research gaps; it does not generate historical claims or combat advice.

| Roster group | Core profiles | Newly added |
| --- | ---: | ---: |
| Wei | 19/19 | 16 |
| Wu | 19/19 | 15 |
| Shu | 22/22 | 16 |
| Jin | 12/12 | 8 |
| Other | 10/10 | 7 |
| Total | 82/82 | 62 |

The new profiles deliberately leave individual attack strings, playstyle guidance, exact unlocks, rare acquisition objectives and unverified stage links open. Twenty earlier profiles retain short combat notes, and the rare-guide count remains ten. An empty gameplay field is rendered as an explicit research gap and is not assigned the shared Aranea citation. All 82 signature associations lead to reciprocal weapon pages; basic associations are not full moveset guides.

Returning Wei and Wu weapon associations use [wowitsyugi's DW8 EX list](https://gamefaqs.gamespot.com/ps3/688499-dynasty-warriors-8/faqs/67510). Returning Shu, Jin and Other associations use the [DW8/XL weapon reference](https://koeitecmo.wiki/wiki/Dynasty_Warriors_8/Weapons). Only the narrow weapon associations are used, not guide prose, stats tables or acquisition instructions. [Yu Jin](https://www.koeitecmoamerica.com/dw8xl/window/ukin.html) and [Zhu Ran](https://www.koeitecmoamerica.com/dw8xl/window/syuzen.html) use their official XL pages, which identify War Trident and Flame Bow respectively. Every historical overview links its own secondary reference; the underlying primary references remain available there for further research.

Special identity boundaries are recorded explicitly: Bao Sanniang, Guan Suo and Zhurong are fictional; Diaochan's named story is literary; Zuo Ci's supernatural episodes are legendary; Meng Huo's historicity is disputed. Guan Yinping and Xingcai do not acquire historical names or military careers simply because relatives appear in historical accounts. The two Qiao sisters' names are not securely recorded. Xu Zhu/Xu Chu and Zhang Jiao/Zhang Jue are spelling or reading variants, whereas Yu Jin/Yue Jin and the two Zhang Bao identities must stay separate. Jin is an edition roster group that includes Wei officers and opponents of the Sima family, including Xiahou Ba and Zhuge Dan.

Sun Quan's earlier Flame Blade assignment was an edition error. His DW8XL CE EX association and existing Emperor's Might guide now use **Sword**; Flame Blade is a separate DLC type in DW8/XL and becomes his EX association in Empires. The old `/weapons/flame-blade` record URL permanently redirects to `/weapons/sword` so existing archive links reach the corrected record. His review date advances to September 23. Dian Wei's existing `/weapons/battle-axe` ID is retained, with the edition name **Axe**.

Validation checks all 82 rendered officer profiles and reciprocal weapon links, 82 weapon pages, kingdom totals, explicit combat gaps, fictional-source labels, the corrected Sword redirect, closed spoiler controls and the existing ten rare guides. Editorial publication tests continue to check that approved fields override core content and that withdrawal removes those overrides.

## Campaign expansion · 2026-09-13

Wei, Wu, Jin and Lu Bu now join Shu in a shared, spoiler-collapsed campaign index. Each step has a scenario ID, campaign scope and prerequisite/side-stage/branch role. Wei's Chibi is separate from the existing Shu-associated Chibi record; Lu Bu's Getaway is separate from Hulao Gate. No stage names or objectives imply historical events.

New source checks: [Ayase Eli](https://steamcommunity.com/sharedfiles/filedetails/?id=259991536) for Wei/Lu Bu; [chromsumia77](https://steamcommunity.com/sharedfiles/filedetails/?id=2839327860) for Wu; Wynter's guide above for Jin, with [rebellion troubleshooting](https://steamcommunity.com/app/278080/discussions/0/540742396943067213/). Both Steam guides are incomplete overall; only their populated campaign sections are used. Short objectives are paraphrased, without copied maps, route tables or walkthrough prose. No fresh-save replay was performed; uncertain exact timers and character-specific walkthroughs remain out of scope.

All five branch checklists are covered, but this is not a catalog of every optional star, post-branch stage or XL side story. Wei's Dian Wei survival is retained as conservative rescue advice; sources differ on whether it independently gates the branch. Jin sources differ on Cao Yi/Cao Xi spelling; the checklist follows Wynter's localized name.

