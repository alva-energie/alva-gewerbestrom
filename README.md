# alva-gewerbestrom

Static landing page for ALVA Energie's commercial electricity product (Gewerbestrom). Self-contained HTML — no build step, no dependencies except Google Fonts and Fontshare via CDN.

## Local Preview

```bash
python3 -m http.server 8080
# → open http://localhost:8080
```

Or with Node: `npx serve .`

## Deploy Workflow

Push to `main` → Cloudflare Pages auto-deploys within ~30 seconds.

**Cloudflare Pages settings:**
- Framework preset: None
- Build command: *(empty)*
- Build output directory: `/`
- Production branch: `main`

## Editing Content

All content lives in `index.html`. Key sections:

| Section | HTML anchor / id |
|---|---|
| Topbar announcement | `.topbar` (line ~215) |
| Hero headline & subtext | `section.hero` → `.hero-inner` |
| Explainer (how it works) | `section.explainer` / `#mieterstrom` |
| Vorteile cards | `section.vorteile` / `#vorteile` |
| Customer logos | `section.trust` / `#kunden` |
| Testimonials | `section.testimonials` |
| Process steps | `section.prozess` / `#prozess` |
| Contact form | `section.kontakt` / `#kontakt` |
| Footer links | `footer` |

## TODO

- [ ] **Zoho CRM integration** — wire form `submit` handler to Zoho lead API
- [ ] **Slack webhook** — post new lead notification to `#leads` on form submit
- [ ] **EmailJS auto-reply** — send confirmation email to prospect on submit
- [ ] **Real trust logos** — replace text fallbacks in `.trust-logo-cell` with actual SVGs
- [ ] **EN translation** — Phase 1.1: duplicate page as `index.en.html`, wire lang switcher

## Custom Domain (later)

To mount under `gewerbestrom.alva-energie.de`:
1. In Cloudflare Pages → project settings → Custom Domains → add `gewerbestrom.alva-energie.de`
2. Cloudflare will prompt to add a CNAME: `gewerbestrom` → `alva-gewerbestrom.pages.dev`
3. If the domain is managed outside Cloudflare: give Mareike the CNAME target and ask her to add it in the DNS provider.

## Maintainer

Anthony Genillard — anthony.genillard@alva-energie.de
