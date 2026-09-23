# DW8XL CE research notes

Scope: Dynasty Warriors 8: Xtreme Legends Complete Edition (2014; Windows, PlayStation 4, PlayStation Vita). The linked manual is the PC manual. These notes do not apply to Empires, Dynasty Warriors 9, or the later Definitive Edition’s DLC bundle.

The original ten dossiers are Cao Cao, Liu Bei, Sun Quan, Sima Yi, Lu Bu, Zhao Yun, Sun Shangxiang, Wang Yuanji, Lu Lingqi and Zhuge Liang. The September 23 expansion adds Guan Yu, Zhang Fei, Xiahou Dun, Zhang Liao, Zhou Yu, Lu Xun, Sima Shi, Sima Zhao, Chen Gong and Fa Zheng, for twenty total. History summaries and gameplay commentary are original prose. No publisher images, game files, guide tables or third-party biographies are reproduced.

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

The runtime catalog remains separate from data/ JSON samples. New content lives in app/archive/dw8xl.ts and is integrated by app/data.ts; no backfill or production D1 writes are required.

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
