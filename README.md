# Rirakkussu Japan — Website

A responsive marketing website built from the Figma design. Plain HTML, CSS,
and JavaScript — **no build step, no dependencies**. It runs anywhere.

## Files
| File | Purpose |
|------|---------|
| `index.html` | All page content and structure |
| `styles.css` | All styling, layout, and responsive rules |
| `main.js` | Menu, scroll effects, gallery slider, form handling |

## Run it locally
Just open `index.html` in a browser. For best results (so images lazy-load
correctly) serve it from a tiny local server:

```bash
# Option A — Python (built into Windows after install)
python -m http.server 8000

# Option B — Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy it (free options)
Drag the whole folder onto any of these:
- **Netlify** — netlify.com/drop
- **Vercel** — vercel.com
- **GitHub Pages** — push the folder to a repo, enable Pages
- Or upload the three files to any web host's `public_html`.

## Things to customize (easy)
1. **Photos** — The images currently load from Unsplash as tasteful
   placeholders. Replace each `data-img="..."` URL in `index.html` with your
   client's real photos (or local files like `data-img="images/picnic.jpg"`).
   The hero image is the `data-img` on `.hero-bg`.
2. **Text & copy** — All wording lives in `index.html`. Headings visible in the
   Figma are kept verbatim; supporting paragraphs are written to match the
   brand and can be edited freely.
3. **Brand details** — Email (`info@rirakkusujapan.com`), Instagram
   (`@relaxjapan_tokyo`), LINE ID (`RJT`), hours, and locations live in the
   Contact and Footer sections.
4. **Colors / fonts** — Change the variables at the top of `styles.css`
   (`:root { --gold, --cream, --dark ... }`).
5. **Contact form** — `main.js` currently simulates a successful send. To make
   it actually deliver messages, point the form at a provider such as
   [Formspree](https://formspree.io) or [Netlify Forms], or your own endpoint.
   See the comment in the `contactForm` handler.

## Notes for the client
A few items in the design need real content before launch — flagged so you can
ask: final team member names/bios, real photography, confirmed contact email &
hours, and where the contact form should deliver. Everything else is live.
