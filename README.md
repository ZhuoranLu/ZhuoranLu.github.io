# Zhuoran Lu's personal website

An academic homepage built with React, TypeScript, Vite, and Tailwind CSS.

[中文维护说明](docs/README-zh.md)

## Local development

Use npm with Node.js 22.12+ (22.x), 24.x, or 26+. CI uses Node.js 22.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To inspect a production build:

```sh
npm run check
npm run preview
```

`npm test` runs behavior and content-integrity checks. `npm run check` runs those checks, TypeScript checking, and the production build. Generated output lives in `dist/` and is not committed.

## Updating content

`src/data/` is the sole source of website content. Edit these files directly:

| Content | Location |
| --- | --- |
| Profile, biography, research interests, CV link | `src/data/profile.ts` |
| Papers, authors, awards, thumbnails, display order | `src/data/publications.ts` |
| Venue groups and badge colors | `src/data/venues.ts` |
| Filter labels | `src/data/filters.ts` |
| News | `src/data/news.ts` |
| Experience and service | `src/data/experiences.ts`, `src/data/service.ts` |
| Navigation | `src/data/nav.ts` |

Publication order follows the array; it is not automatically sorted. Give each paper a unique ID, choose a venue from the venue configuration, and use arrays for `focus` and `goal`, even for a single tag. Omit `url` when no public link is available; the title is the link when one is provided. Authors support `**bold**`, contribution markers, and the small inline-markup subset in `src/lib/inline.tsx`.

Place public files in `public/`. For example, `public/images/papers/example.svg` is served at `/images/papers/example.svg`. To update the CV, add the PDF and change `profile.cvUrl`. Keep existing public filenames available so previously shared links continue to work. Historic PDFs and images outside `public/` are retained as source assets; Vite does not publish them automatically.

## Structure and deployment

`src/pages/` composes the homepage from `src/components/`. Publication filtering lives in `src/lib/`; content and behavior checks are colocated with the relevant code. Styles and theme tokens live in `src/index.css` and `tailwind.config.ts`.

GitHub Actions checks pull requests. Pushes to `master`, or manual runs of the deployment workflow, check and build the site and deploy `dist/` to GitHub Pages. Development branches are not automatically deployed. The site is served at the domain root, with hash routing retained.

The previous Jekyll implementation is available in Git history. It is no longer a content source or a supported build path; Ruby and the old Scholar crawler are not required.

## Acknowledgments

This site originated from [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io), influenced by [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) and [Academic Pages](https://github.com/academicpages/academicpages.github.io). The original MIT license and attribution are preserved in `LICENSE`.
