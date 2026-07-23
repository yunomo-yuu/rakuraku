# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static site for **you-no-oto.jp**（結／結ゆう）, deployed via GitHub Pages (custom domain set in `CNAME`). There is no build system, package manager, or test suite — every page is a single self-contained `.html` file with inline `<style>` and inline `<script>`. There is no bundler, no framework, no CSS/JS files to compile. Editing a page means editing that one HTML file directly.

## Commands

There is no build/lint/test tooling in this repo. To preview changes, open the HTML file directly in a browser (or serve the directory with any static file server, e.g. `python3 -m http.server`). Deployment is simply committing/pushing to the branch GitHub Pages serves.

## Site structure

The site is organized as two sibling sections reachable from the entry pages `index.html` / `home.html`:

1. **占いの部屋 (fortune-telling room)** — session-booking/info pages and calculator tools: `uranai.html` (index), `shibi.html` (紫微斗数), `horoscope.html`/`meishiki.html`/`tree.html`/`spread.html` (western astrology), `kimon.html` (奇門遁甲), `maya.html` (マヤ暦), `kyusei.html` (九星気学). Several of these (`meishiki.html`, `kimon.html`, `shibi.html`) are large (300–900+ lines) because they embed non-trivial date/astronomical/numerological calculation logic directly in `<script>` tags.
2. **らくらくの部屋 (care-manager tools room)** — free documentation-generator tools forケアマネジャー (care managers), entry page `rakuraku.html`, linking to:
   - `monitoring.html` — モニタリング記録 (monitoring record) generator
   - `houkokusho.html` — 通所・訪問・施設対応の月次報告書 (monthly report) generator, printable A4 layout
   - `keika.html` — 支援経過記録 (support process record) generator

`profile.html` is the operator's bio page. `ogp.jpg` / `favicon*` / `apple-touch-icon.png` are shared site assets referenced with root-relative paths (`/favicon.ico`, etc.) from `<head>`.

## Conventions used across pages

- **Language**: all user-facing text is Japanese (`lang="ja"`).
- **Fonts/theme**: fortune-telling pages use `Shippori Mincho` serif with a navy/gold night-sky palette (CSS vars like `--yozora1/2/3`, `--kin`, `--gofun`); the らくらく tool pages use a sans-serif Hiragino/Yu Gothic UI with an indigo/paper business-form palette (`--indigo`, `--ink`, `--paper`). Match the palette already used by the section/page you're editing rather than introducing a new one.
- **The らくらく tools share one interaction pattern** (see `monitoring.html`, `houkokusho.html`, `keika.html`): a form with required/optional field badges → client-side validation that toggles an `.invalid` class and an `.error-msg` element → a `generate()` function that assembles a plain-text (or printable HTML) document from form state → output shown in a readonly `<textarea>` with a copy-to-clipboard button (`navigator.clipboard`, falling back to `document.execCommand('copy')`). When adding a new tool or field to one of these, follow this same generate/validate/copy structure rather than inventing a new pattern.
- **Privacy is a stated product property**: every らくらく tool explicitly tells the user that input is processed entirely client-side and never transmitted anywhere, and that closing/reloading the page clears it. Do not add any network calls (fetch, analytics beacons, form submissions, external APIs) to these tool pages — that would contradict what the page tells the user. Google Fonts `<link>` tags (already present) are the one existing exception to "no external requests."
- **Navigation**: sub-pages link back to their section index via a small `← 玄関へもどる` / similar anchor near the top of `<body>`, not a shared nav component (there is no shared header/footer include mechanism — every page is fully self-contained, so shared text like the footer credit line is duplicated per file and must be edited in each file individually if changed).

## Working rules for Claude Code

- 回答は日本語。結論を先に、理由は後。
- サイト全体の夜空テーマ（濃紺×星空×金茶、Shippori Mincho）は指示がない限り変更しない。
- 指示されていないファイルは触らない。
- 変更したら、変更ファイルと変更箇所を最後に一覧で報告する。
- らくらくの部屋の3ツール（monitoring.html / houkokusho.html / keika.html）は、入力データを端末内で完結させる設計。外部にデータを送信するコードは絶対に追加しない。
- ケアマネ書類の文面に「安心・安全」という表現を使わない。
- 鍵付きページのパスフレーズ判定ロジックは、明示的に指示されたときだけ触る。
