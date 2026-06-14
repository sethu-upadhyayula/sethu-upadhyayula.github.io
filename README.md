# sethu-upadhyayula.github.io

Personal website of Sethu Upadhyayula — built as a static site (HTML/CSS/JS,
Bootstrap 5.3, KaTeX, Font Awesome) and hosted via GitHub Pages.

## TODO / Roadmap

1. **Expand the Math section** with more worked proofs, exercises (with
   solutions), and additional examples per subsection.
2. **Add a site-wide search bar** (likely a static client-side index, e.g.
   Pagefind/Lunr/Fuse.js) so users can search across Math, Quant, and Chess
   content by topic/title rather than only browsing via the sidebar TOC.
3. Other ideas under consideration:
   - Add a "recently updated" / changelog section so returning visitors can
     see what's new.
   - Cross-link related topics across sections (e.g. Black-Scholes in
     Math/SDE ↔ Quant/Equities, convexity in Math ↔ Quant/Rates).
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
- **Quant section**: 25 subjects across Rates, Credit, Equities,
  Currencies, and Commodities, covering market structure, pricing models,
  and derivatives — written in the same style/format as the Math section.
  Every subject is built out to 4 chapters / ~13-14 pages.
- **Chess section**: split into Regular Chess, Variants, and Compositions,
  all organized into chapter-level pages (topic → chapter, with a
  collapsible sidebar TOC) using interactive boards rendered via a
  lichess-style board renderer. Regular Chess covers 8 topics (Basics,
  Opening Theory, Tactical Play, Strategic Play, Endgame Theory, Endgame
  Strategy, Master Games, Chess History); Variants covers Antichess, Atomic,
  Chess 960, Crazyhouse, Horde, King of the Hill, Racing Kings, and Three
  Check (4 chapters each); Compositions covers Endgame Studies, Twomovers,
  Threemovers, Moremovers, Helpmates, Selfmates, Retro Problems, and Fairy
  Chess (6-7 chapters each).
- **About Me** and **Contact** pages with social links (email, LinkedIn,
  GitHub).

## Site Navigation

```
/                       Home
/about/                 About Me
/contact/               Contact

/math/                  Math (5 groups, 25 subjects)
  /math/<group>/                         Group landing page
  /math/<subject>/                       Subject overview
  /math/<subject>/<chapter>/             Chapter index
  /math/<subject>/<chapter>/<section>/   Subsection content

  Foundations (foundations/): mathematical-logic, set-theory, calculus,
    linear-algebra, geometry
  Discrete Math (discrete-math/): abstract-algebra, number-theory,
    combinatorics, graph-theory, algorithm-design
  Analysis (analysis/): real-analysis, complex-analysis, topology,
    measure-theory, functional-analysis
  Math Modelling (mathematical-modelling/): optimization-methods,
    ordinary-differential-equations, partial-differential-equations,
    finite-element-methods, numerical-analysis
  Stochastics (stochastics/): probability-theory, statistical-methods,
    stochastic-processes, stochastic-differential-equations,
    financial-mathematics

/quant/                 Quant (5 groups, 25 subjects)
  /quant/<group>/                         Group landing page
  /quant/<subject>/                       Subject overview
  /quant/<subject>/<chapter>/             Chapter index
  /quant/<subject>/<chapter>/<section>/   Subsection content

  Rates (rates/): rates-fundamentals, interest-rate-swaps,
    interest-rate-options, term-structure-models, inflation-linked-products
  Credit (credit/): bonds-and-fixed-income, credit-derivatives,
    structured-credit, loans-and-lending, xva-and-counterparty-risk
  Equities (equities/): equity-markets, equity-derivatives,
    volatility-trading, exotic-equity-products, convertibles-and-equity-linked
  Currencies (currencies/): fx-markets, fx-forwards-and-swaps,
    fx-options-and-volatility, exotic-fx-products, emerging-markets-fx
  Commodities (commodities/): commodity-derivatives, energy-markets,
    power-and-emissions, metals-and-mining, agriculture

/chess/                 Chess
  /chess/regular/                Regular Chess (8 topics, 8 chapters each)
    basics/, opening-theory/, tactical-play/, strategic-play/,
    endgame-theory/, endgame-strategy/, master-games/, chess-history/
  /chess/variants/               Chess Variants (8 topics, 4 chapters each)
    antichess/, atomic/, chess960/, crazyhouse/, horde/,
    king-of-the-hill/, racing-kings/, three-check/
    /chess/variants/<topic>/                Topic overview
    /chess/variants/<topic>/<chapter>/      Chapter content
  /chess/compositions/           Chess Compositions (8 topics, 6-7 chapters each)
    endgame-studies/, twomovers/, threemovers/, moremovers/, helpmates/,
    selfmates/, retros/, fairies/
    /chess/compositions/<topic>/            Topic overview
    /chess/compositions/<topic>/<chapter>/  Chapter content
```

## Tech Stack

- HTML5 + Bootstrap 5.3
- KaTeX 0.16.9 for math rendering
- Font Awesome 6.4 for icons
- Plain CSS (`css/styles.css`) and JS (`js/script.js`) for theming and
  interactivity (theme toggle, collapsible TOC, etc.)
