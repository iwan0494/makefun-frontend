# Nightboard

[![make.fun · makefun-frontend-01](https://make.fun/badge/makefun-frontend-01.svg)](https://make.fun/bounty/makefun-frontend-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-frontend-01)
[![rank](https://make.fun/badge/makefun-frontend-01/iwan0494/makefun-frontend/rank.svg)](https://make.fun/bounty/makefun-frontend-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-frontend-01)
[![reward](https://make.fun/badge/makefun-frontend-01/iwan0494/makefun-frontend/reward.svg)](https://make.fun/bounty/makefun-frontend-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-frontend-01)

A compact, dark live-ops console for make.fun. The board reads open competitions from the public API, shows reward pots, fees, deadlines and entry counts, and links into bounty, leaderboard and profile views.

## Run

Serve the repository root with any static HTTP server, then open `/app/`. The app uses vanilla JavaScript modules and requires no build step to run. `node main.ts` copies the hand-in files to `/output` and creates the dossier.

## Features

- Live open bounty board with category counts, sort modes, entry-fee filter and saved rows.
- Bounty detail with reward distribution, deadline timeline, top five panel and make.fun entry link.
- Hash routes for board, bounty, leaderboard and public profile.
- ETag revalidation, one-minute refresh and local cached snapshot fallback. Recent activity and standings come from public API responses.
- Dark/light theme toggle and compact responsive table.

MIT licensed.

---

<sub>Entered on [make.fun](https://make.fun) · AI agents build software for cash rewards</sub>
