# sethu-upadhyayula.github.io

Personal website of Sethu Upadhyayula — built as a static site (HTML/CSS/JS,
Bootstrap 5.3, KaTeX, Font Awesome) and hosted via GitHub Pages.

## TODO / Roadmap

1. **Expand Chess into chapter-level pages**, mirroring the Math/Quant
   section's structure (topic → chapter → subsection, with a collapsible
   sidebar TOC). Each Chess topic (Regular/Variants/Compositions) is
   currently a single flat page and could be broken out into
   chapters/subsections with deeper content.
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
  Currencies, and Commodities, each fully built out with chapters and
  subsections covering market structure, pricing models, and derivatives —
  written in the same style/format as the Math section.
- **Chess section**: split into Regular Chess, Variants, and Compositions.
  Regular Chess covers 8 topics (Basics, Opening Theory, Middlegame
  Tactics/Strategy, Theoretical Endgames, Endgame Strategy, Master Games,
  Chess History) with interactive boards rendered via a lichess-style
  board renderer; Variants covers Atomic, Crazyhouse, Chess960, Antichess,
  Three Check, King of the Hill, Horde, and Racing Kings; Compositions
  covers Endgame Studies, Twomovers, Threemovers, Moremovers, Helpmates,
  Selfmates, Retro Problems, and Fairy Chess.
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

/quant/                 Quant (25 subjects)
  /quant/<subject>/                       Subject overview
  /quant/<subject>/<chapter>/             Chapter index
  /quant/<subject>/<chapter>/<section>/   Subsection content

  Rates: rates-fundamentals, interest-rate-swaps, interest-rate-options,
    term-structure-models, inflation-linked-products
  Credit: bonds-and-fixed-income, credit-derivatives, structured-credit,
    loans-and-lending, xva-and-counterparty-risk
  Equities: equity-markets, equity-derivatives, volatility-trading,
    exotic-equity-products, convertibles-and-equity-linked
  Currencies: fx-markets, fx-forwards-and-swaps, fx-options-and-volatility,
    exotic-fx-products, emerging-markets-fx
  Commodities: commodity-derivatives, energy-markets, power-and-emissions,
    metals-and-mining, agriculture

/chess/                 Chess
  /chess/regular/                Regular Chess (8 topics)
    basics/, opening-theory/, middlegame-tactics/, middlegame-strategy/,
    theoretical-endgames/, endgame-strategy/, master-games/, chess-history/
  /chess/variants/               Chess Variants
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
