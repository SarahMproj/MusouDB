# Officer artwork

MusouDB's 82 DW8XL CE officer portraits are original AI-generated interpretations created with OpenAI image generation on September 23, 2026. The user approved the Sun Shangxiang style test before requesting the remaining roster.

The direction combines painted realism, visible oil/gouache brushwork, parchment and ink-wash backgrounds, and faction colors: Wei indigo, Wu vermilion, Shu emerald, Jin teal, and individual colors for Other. Officer identities, adult ages, clothing, expressions and signature weapon props were individually briefed. These paintings are neither official game artwork nor evidence of historical appearance.

`OFFICER_ARTWORK.json` records every officer ID, generation prompt, edition weapon association and original PNG SHA-256. Sun Shangxiang is the shared style reference. No extracted models, copied wiki artwork or official promotional assets were used as image inputs.

`app/artwork/officers.json` maps stable officer IDs to their image URLs and dimensions. The page component uses an eager 960-pixel portrait and lazy 480-pixel archive images with responsive source selection. Files live in `public/artwork/officers/`; card and full-size encodings preserve the entire original painting. The source PNGs remain separate from the application bundle.

To prepare assets from generation manifests containing `id`, `name`, `kingdom`, `weapon`, `prompt`, `path` and successful `status`, run:

```sh
node scripts/prepare-officer-artwork.mjs /absolute/path/to/approved-results.json /absolute/path/to/faction-results.json
```

Supply all generation manifests together; the script writes the complete map and provenance ledger. `tests/archive-content.test.mjs` checks every profile's image association, all 164 built image files, unique source hashes, descriptions, image dimensions, transfer limits, eager hero loading and lazy archive loading.

No new artwork license grant is implied. The existing project asset policy and rights-holder review process still apply.
