# Brooke's World

My personal site — part portfolio, part bookshelf, part night sky.
Live at **https://abrichards10.github.io/brookes-world**.

Built with Create React App (React 18), React Router, Framer Motion, and
react-simple-maps. It has a light "day" and dark "night" theme, with a
directional View-Transition toggle.

## Develop

```bash
npm install
npm start      # dev server → http://localhost:3000/brookes-world
npm run build  # production build into build/
```

## Editing content

Most of the site is data-driven — update the array at the top of each file:

- **Bookshelf** — `src/components/Bookshelf.js` (`books`)
- **Where I've Been (map)** — `src/components/WhereIveBeen.js` (`PLACES`; drop
  real photos into each place's `photos`)
- **Side Projects** — `src/components/Gallery.js` (`projects`)
- **Selected Work** — `src/components/SelectedWork.js` (`areas`)
- **Colors / theme** — `src/styles/colors.css` (every color lives here)

The feedback form uses EmailJS; its keys live in `.env` (`REACT_APP_EMAILJS_*`).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app
and publishes `build/` to GitHub Pages.
