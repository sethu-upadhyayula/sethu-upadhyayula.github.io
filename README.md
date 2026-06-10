# sethu-upadhyayula.github.io

Personal website of Sethu Upadhyayula — built as a static site (HTML/CSS/JS,
Bootstrap 5.3, KaTeX, Font Awesome) and hosted via GitHub Pages.

## TODO / Roadmap

1. **Expand Quant and Chess into chapter-level pages**, mirroring the Math
   section's structure (subject → chapter → subsection, with a collapsible
   sidebar TOC). Quant subjects already follow this structure; the
   remaining work is on Chess, where each section (Regular/Variants/
   Compositions) is currently a single flat page per topic and could be
   broken out into chapters/subsections with deeper content.
2. **Expand the Math section** with more worked proofs, exercises (with
   solutions), and additional examples per subsection.
3. **Add a site-wide search bar** (likely a static client-side index, e.g.
   Pagefind/Lunr/Fuse.js) so users can search across Math, Quant, and Chess
   content by topic/title rather than only browsing via the sidebar TOC.
4. Other ideas under consideration:
   - Add a "recently updated" / changelog section so returning visitors can
     see what's new.
   - Cross-link related topics across sections (e.g. Black-Scholes in
     Math/SDE ↔ Quant/Equities, convexity in Math ↔ Quant/Rates).
   - Add small interactive widgets (e.g. an embeddable chess board for
     openings/endgame/composition pages).
   - Light visual polish on the About Me page (e.g. background elements).
   - Add more annotated games to Chess → Master Games.

## Features

- **Responsive Bootstrap 5.3 layout** with a light/dark theme toggle
  (persisted via the theme switch in the navbar and a floating mobile
  toggle button).
- **KaTeX-rendered math** throughout the Math and Quant sections, with
  consistent "math-box" callouts for Definitions, Theorems, Propositions,
  Lemmas, Corollaries, Examples, Remarks, and Proofs.
- **Collapsible chapter/subsection sidebar (TOC)** on Math and Quant pages,
  with breadcrumb navigation and prev/next chapter buttons at the bottom of
  each page.
- **Math section**: 25 subjects, each organized into chapters and
  subsections (~25-30 pages per subject), covering pure and applied
  mathematics from foundations (Set Theory, Logic) through advanced topics
  (Measure Theory, Functional Analysis, SDEs, PDEs, Numerical Analysis,
  Financial Mathematics, etc.).
- **Quant section**: 5 subjects (Commodities, Credit, Equities, Foreign
  Exchange, Rates), each fully built out with chapters and subsections
  covering market structure, pricing models, and derivatives — written in
  the same style/format as the Math section.
- **Chess section**: split into Regular, Variants, and Compositions, with
  dedicated pages per topic (openings, middlegame strategy/tactics, endgame,
  master games, chess variants like Atomic/Crazyhouse/Chess960/etc., and
  composition genres like studies, helpmates, selfmates, twomovers,
  threemovers, moremovers, fairies, retros).
- **About Me** and **Contact** pages with social links (email, LinkedIn,
  GitHub).

## Site Navigation

```
/                       Home
/about/                 About Me
/contact/               Contact

/math/                  Math (25 subjects)
  /math/<subject>/                       Subject overview
  /math/<subject>/<chapter>/             Chapter index
  /math/<subject>/<chapter>/<section>/   Subsection content

  Subjects: abstract-algebra, algorithm-design, calculus, combinatorics,
  complex-analysis, financial-mathematics, finite-element-methods,
  functional-analysis, geometry, graph-theory, linear-algebra,
  mathematical-logic, measure-theory, number-theory, numerical-analysis,
  optimization-methods, ordinary-differential-equations,
  partial-differential-equations, probability-theory, real-analysis,
  set-theory, statistical-methods, stochastic-differential-equations,
  stochastic-processes, topology

/quant/                 Quant (5 subjects)
  /quant/<subject>/                       Subject overview
  /quant/<subject>/<chapter>/             Chapter index
  /quant/<subject>/<chapter>/<section>/   Subsection content

  Subjects: commodities, credit, equities, foreign-exchange, rates

/chess/                 Chess
  /chess/regular/                Regular Chess
    basics/, openings/, middlegame-strategy/, middlegame-tactics/,
    endgame/, master-games/
  /chess/variants/               Chess Variants
    antichess/, atomic/, chess960/, crazyhouse/, horde/,
    king-of-the-hill/, racing-kings/, three-check/
  /chess/compositions/           Chess Compositions
    endgame-studies/, fairies/, helpmates/, moremovers/, retros/,
    selfmates/, threemovers/, twomovers/
```

## Tech Stack

- HTML5 + Bootstrap 5.3
- KaTeX 0.16.9 for math rendering
- Font Awesome 6.4 for icons
- Plain CSS (`css/styles.css`) and JS (`js/script.js`) for theming and
  interactivity (theme toggle, collapsible TOC, etc.)
