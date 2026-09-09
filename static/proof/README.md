# Proof of Results screenshots

Dashboard screenshots referenced by `src/components/sections/proof.js`:

| File                             | Card                | Source                 |
| -------------------------------- | ------------------- | ---------------------- |
| `sales_proof.png`                | Lavish & Chic       | Google Analytics (GA4) |
| `shopify_app_ales_2.png`         | Lumière Skin Co.    | Shopify Analytics      |
| `beauty_skin_care_analytics.png` | BeautyGlow Skincare | Google Analytics       |

Anything in `static/` is copied to the site root at build time, so
`static/proof/sales_proof.png` is served as `/proof/sales_proof.png`.

Keep these files here, **not** in `public/` — `public/` is Gatsby's build
output, is listed in `.gitignore`, and is wiped by `gatsby clean`.

If a file is missing, its card renders a placeholder showing the expected path
instead of a broken image.
