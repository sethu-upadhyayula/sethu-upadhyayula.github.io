# sethu-upadhyayula.github.io

Personal website of Sethu Upadhyayula — built as a static site (HTML/CSS/JS,
Bootstrap 5.3, KaTeX, Font Awesome) and hosted via GitHub Pages.

## TODO / Roadmap

1. **Finish expanding the remaining Quant subjects** to the 4-chapter /
   ~13-page depth used by `rates-fundamentals`: bonds-and-fixed-income,
   interest-rate-swaps, interest-rate-options, fx-forwards-and-swaps,
   fx-options-and-volatility, exotic-equity-products, exotic-fx-products,
   loans-and-lending, structured-credit, term-structure-models,
   volatility-trading, xva-and-counterparty-risk.
2. **Expand Chess into chapter-level pages**, mirroring the Math/Quant
   section's structure (topic → chapter → subsection, with a collapsible
   sidebar TOC). Each Chess topic (Regular/Variants/Compositions) is
   currently a single flat page and could be broken out into
   chapters/subsections with deeper content.
3. **Expand the Math section** with more worked proofs, exercises (with
   solutions), and additional examples per subsection.
4. **Add a site-wide search bar** (likely a static client-side index, e.g.
   Pagefind/Lunr/Fuse.js) so users can search across Math, Quant, and Chess
   content by topic/title rather than only browsing via the sidebar TOC.
5. Other ideas under consideration:
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
  Most subjects are fully built out to 4 chapters / ~13 pages each; the
  remaining subjects are being expanded to the same depth (see Roadmap).
- **Chess section**: split into Regular Chess, Variants, and Compositions.
  Regular Chess covers 8 topics (Basics, Opening Theory, Tactical Play,
  Strategic Play, Endgame Theory, Endgame Strategy, Master Games,
  Chess History) with interactive boards rendered via a lichess-style
  board renderer; Variants covers Antichess, Atomic, Chess 960, Crazyhouse,
  Horde, King of the Hill, Racing Kings, and Three Check; Compositions
  covers Endgame Studies, Twomovers, Threemovers, Moremovers, Helpmates,
  Selfmates, Retro Problems, and Fairy Chess.
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
  /chess/regular/                Regular Chess (8 topics)
    basics/, opening-theory/, tactical-play/, strategic-play/,
    endgame-theory/, endgame-strategy/, master-games/, chess-history/
  /chess/variants/               Chess Variants (alphabetical)
    antichess/, atomic/, chess960/, crazyhouse/, horde/,
    king-of-the-hill/, racing-kings/, three-check/
  /chess/compositions/           Chess Compositions
    endgame-studies/, twomovers/, threemovers/, moremovers/, helpmates/,
    selfmates/, retros/, fairies/
```

## Tech Stack

- HTML5 + Bootstrap 5.3
- KaTeX 0.16.9 for math rendering
- Font Awesome 6.4 for icons
- Plain CSS (`css/styles.css`) and JS (`js/script.js`) for theming and
  interactivity (theme toggle, collapsible TOC, etc.)
