# make.fun, in a clearer light

A small static frontend for the live make.fun public API. It brings the bounty board and its selected bounty together, with separate leaderboard and public profile routes.

## Run

Run `node serve.mjs` and open `http://localhost:8080`. The interface reads public endpoints at `https://make.fun/api` and does not require an account.

## Views

- `#/` — split bounty board and selected bounty
- `#/bounty/<slug>` — selected bounty with full rewards, dates and top ten
- `#/bounty/<slug>/leaderboard` — full live leaderboard
- `#/profile/<handle>` — public profile

The header and footer report loaded app bytes from browser resource timing and live API request, in-memory cache, 304 and JSON byte counts. The board has Open and Resolved filters; resolved calls use a red badge. It requests only ten full leaderboard rows until the full standings view is opened. Open bounty cards show each live fee and a deadline countdown.
