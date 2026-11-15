<div align="center">

# 🇮🇪 Ireland Threat Desk

**Local information. Practical preparation.**

An independent emergency preparation desk for the **Republic of Ireland**.<br>
Official weather warnings, Irish cyber advisories, local headlines, and a household plan that stays on your device.

### [Open the live desk →](https://mariogusman.github.io/ireland-threat-desk/)

[![Live site](https://img.shields.io/badge/Live-Ireland_Threat_Desk-17624b?style=flat-square)](https://mariogusman.github.io/ireland-threat-desk/)
[![Irish source refresh](https://github.com/mariogusman/ireland-threat-desk/actions/workflows/refresh-feeds.yml/badge.svg)](https://github.com/mariogusman/ireland-threat-desk/actions/workflows/refresh-feeds.yml)
[![Licence: MIT](https://img.shields.io/badge/Licence-MIT-17624b?style=flat-square)](LICENSE)

No account · No adverts · No analytics · Mobile friendly

</div>

---

## A desk built around Ireland

| In the app | What you can do |
| --- | --- |
| **Overview** | Check Met Éireann warnings, choose from all 26 counties, see a local forecast, and open Irish utility maps. |
| **Irish live wire** | Read and search NCSC Ireland advisories and Irish news, with publication dates, source links and retrieval status. |
| **My household plan** | Set 1–20 people and 1–14 days; calculate water and meals; work through an 18-item checklist. |
| **Power cut guide** | Follow first-hour, first-day and extended-outage guidance, start an outage timer and track stored water. |
| **Emergency contacts** | Tap to call Irish emergency services, ESB Networks, Gas Networks Ireland, Uisce Éireann and other support. |
| **Sources & status** | See which feeds worked, when each last succeeded, and which information is stale or unavailable. |

Plans support **printing, JSON backup and restoration, light/dark themes, and offline use** after a successful first visit. Contact details and meeting places are optional and stay in your browser.

## Irish sources

### Automatically retrieved

| Source | Information | Behaviour |
| --- | --- | --- |
| [Met Éireann](https://www.met.ie/warnings-today.html) | Official weather warnings | Expired warnings are removed. Duplicate wind/rain notices are combined. Upcoming warnings remain visible. |
| [NCSC Ireland](https://www.ncsc.gov.ie/news/) | Official Irish cyber advisories | RSS notices link to the original advisory or document. |
| [TheJournal.ie](https://www.thejournal.ie/) | Irish news | Headlines link to the publisher; reporting is not presented as an official alert. |
| [RTÉ News](https://www.rte.ie/news/ireland/) | Irish news, when accessible | RTÉ can reject automated feed requests. The desk shows failures and keeps a direct website link. |
| [Open-Meteo](https://open-meteo.com/) | Four-day local forecast | A representative town in the selected county; separate from official warnings. Forecast data: CC BY 4.0. |

A GitHub Actions job retrieves the shared feeds **approximately every 20 minutes**. GitHub can delay scheduled jobs. While open, the app reloads the latest snapshot every five minutes and also attempts direct Met Éireann access where browser permissions allow it.

Weather is considered fresh for **30 minutes** after a successful retrieval; news for **six hours**. A failed source retains its last-known items and original timestamp, with an unverified label. A failed or stale weather feed **never becomes an all-clear**. Offline information is labelled unverified.

### Official links, checked by you

- [ESB Networks PowerCheck](https://powercheck.esbnetworks.ie/) — local power faults and restoration estimates.
- [Uisce Éireann](https://www.water.ie/help/supply) — water interruptions and public supply notices.
- [OPW FloodInfo.ie](https://www.floodinfo.ie/) — flood maps and preparation information; **not a live flood warning feed**.
- [HSE](https://www2.hse.ie/) — health guidance and care services.
- [An Garda Síochána](https://www.garda.ie/) — official notices and local stations.
- [TII traffic](https://traffic.tii.ie/) — national road conditions.

Utility outages, Garda notices and flood maps are direct links, not automatic status feeds. The app does not invent a national threat score or claim to monitor these services.

## Get started

**Use it:** [open the live desk](https://mariogusman.github.io/ireland-threat-desk/), select your county, then open **My household plan**. Bookmark the site or add it to your home screen where your browser supports that. Open it successfully online before relying on offline access.

**Keep a copy:** use **Print plan** and **Export backup**. Browser storage can be cleared by your device, and private browsing may not retain it. Exported backups contain any contact details or meeting place you entered; keep them secure.

**Run locally:** the website is plain HTML, CSS and JavaScript, with no production dependencies or build step. Serve it over HTTP rather than opening `index.html` as a local file:

```sh
git clone https://github.com/mariogusman/ireland-threat-desk.git
cd ireland-threat-desk
python3 -m http.server 8000
```

Open `http://localhost:8000`. Offline caching is enabled on HTTPS hosting.

### Development and feed refresh

Use **Node.js 24 or newer**. Dependencies are needed only for the automated DOM tests.

```sh
npm ci
npm run check    # JavaScript syntax checks and automated tests
npm run refresh  # Retrieve Irish sources into data/status.json
```

The refresh uses the inherited environment proxy when configured. No API keys or private credentials are required. The job can also be run from **Actions → Refresh Irish sources → Run workflow**.

GitHub may disable scheduled workflows in a public repository after 60 days without repository activity. Check the Actions page if retrieval times stop advancing and re-enable the workflow if needed.

## Publishing

GitHub Pages serves the repository's `main` branch at `/ (root)`. Code pushes publish the app. The browser reads current source snapshots from this repository’s public raw data URL, so scheduled data updates do not depend on an additional Pages build.

The service worker caches the application files for offline use. Fresh network responses update its cache; source freshness is always based on retrieval timestamps, not cache age.

## Project structure

```text
index.html                 Accessible app shell and navigation
styles.css                 Responsive layout, themes and print styles
app.js                     Screens, controls, local storage and source retrieval
core.js                    Household calculations, county logic and Irish services
sw.js                      Offline application cache
scripts/feeds.mjs          Source definitions, parsing and failure handling
scripts/refresh-feeds.mjs  Shared snapshot refresh
data/status.json           Latest retrieved source snapshot
tests/                     Core and DOM integration tests
.github/workflows/         Scheduled Irish source refresh
upstream/                  Unmodified original UK edition, for provenance
```

## Privacy

There is no account system, advertising or analytics. Your household checklist, contact plan and timer are stored in your browser; the app does not upload them. Feed data and the local forecast may be cached on your device.

The app requests public information from GitHub, Met Éireann and Open-Meteo. These providers receive normal connection information. Open-Meteo receives the coordinates of a representative town in your selected county, not your device’s precise location. The app does not request geolocation permission. Linked websites have their own privacy policies.

## Use during an emergency

**In immediate danger, call 112 or 999.** Follow instructions from Irish emergency services and your local authority. This independent preparation tool is not an official alerting service. Verify important reports at the linked source.

The water allowance is **4 litres per person per day for drinking and food preparation**. Allow extra for hygiene, pets and medical needs. Food quantities count person-meals; they are not personalised nutritional advice. Adapt the plan to your household and follow [Government of Ireland preparation guidance](https://www.gov.ie/en/department-of-defence/publications/being-prepared/).

Irish electricity, gas and water emergency numbers were checked against provider websites on **15 November 2026**.

## Credits & licence

Adapted from [Global Threat Desk](https://github.com/AtomSmasher-design/global-threat-desk) by **AtomSmasher-design**. The original Git history, MIT licence notice and an unmodified UK-edition file are retained. This edition replaces the main experience with Irish sources, contacts and household tools; the archived UK edition is not the Irish product.

[MIT licence](LICENSE) — free to use, copy, adapt and share, with the original licence notice retained.
