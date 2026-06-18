# Floral Charm 🌸

A flower shop e-commerce site built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Includes a working cart system and an AI shopping assistant, Flora, powered by the Claude API.

**Live demo:** _add your GitHub Pages / hosting link here_

---

## Features

- **Product catalog** — 8 flower types with add-to-cart functionality
- **Cart drawer** — slide-in panel showing items and running total
- **Flora AI assistant** — chat-based gift finder and card message writer, with quick-reply buttons for common requests
- **Contact form** — front-end validated enquiry form
- **Fully responsive** — adapts down to mobile breakpoints

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox, no framework)
- Vanilla JavaScript (no jQuery, no React)
- Anthropic Claude API (for the Flora chat assistant)

## Project Structure

```
floral-charm/
├── index.html        # Markup for all sections
├── style.css          # All styling, including responsive breakpoints
├── script.js           # Cart logic, product rendering, Flora chat logic
└── *.jpg                # Product and background images (must stay in root)
```

## Running Locally

1. Clone or download this repository.
2. Keep all image files in the same folder as `index.html` — the code references them by filename, not by path.
3. Open `index.html` directly in a browser.

No build step, no dependencies to install.

## Known Limitation

The Flora AI chat currently calls the Anthropic API directly from the browser. This works in environments where the request is proxied with a key, but it will not work as a standalone deployed site — browsers block direct cross-origin calls like this, and no API key ships with the front-end (intentionally, since it should never be exposed client-side).

**To make Flora functional in production:** add a small backend (Node/Express, a Cloudflare Worker, or similar) that holds the API key server-side and relays requests from the front-end.

## Future Improvements

- Backend proxy for the Flora AI assistant (see above)
- Persist cart state across page reloads
- Checkout flow with real payment integration
- Filter/sort options on the product grid

## Author

**Vaishnavi**
GitHub: [vaishnavi6204-stack](https://github.com/vaishnavi6204-stack)
Email: vaishnavi6204@gmail.com
