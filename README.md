# sethu-upadhyayula.github.io

Personal website of Sethu Upadhyayula - built as a static site (HTML/CSS/JS,
Bootstrap 5.3, KaTeX, Font Awesome) and hosted via GitHub Pages.

## TODO / Roadmap

1. **Expand the Math section** with more worked proofs, exercises (with
   solutions), and additional examples per subsection.
2. **Add a site-wide search bar** (likely a static client-side index, e.g.
   Pagefind/Lunr/Fuse.js) so users can search across all sections' content
   by topic/title rather than only browsing via the sidebar TOC.
3. **Break chapters into numbered sub-lessons** across Biology, Music, and
   Dev, matching the Math/Quant subsection depth, once breadth across all
   three sections is further along.
4. Other ideas under consideration:
   - Add a "recently updated" / changelog section so returning visitors can
     see what's new.
   - Cross-link related topics across sections (e.g. Black-Scholes in
     Math/SDE ↔ Quant/Equities, convexity in Math ↔ Quant/Rates).
   - Light visual polish on the About Me page (e.g. background elements).
   - Add more annotated games to Chess → Master Games.

## Features-
-
- **Homepage pie**: a full-bleed, equal-visual-area six-sector layout
  (computed numerically in `js/home-pie.js` via `conic-gradient` +-
  per-sector `clip-path` polygons) covering Math, Quant, Chess, Biology,
  Dev, and Music, each with its own background image and an opaque
  text-label pill linking into the section; a center hub (site favicon)
  links to About.
- **Floating nav dock / social dock**: no traditional header/foot-r bars —
  a persistent Home icon, cross-section navigation, and social links (now
  just LinkedIn) live in small floating widgets (alongside the light/dark
  theme toggle FAB) present on every page.
- **Per-section theming**: each of Math/Quant/Chess/Biology/Dev/Music has
  its own accent color and a subtle themed doodle background, driven by a
  `data-section` attribute on `<html>` and CSS custom properties — see
  `css/styles.css`.
- **Responsive Bootstrap 5.3 layout** with a light/dark theme toggle
  (persisted via a floating toggle button, present at every breakpoint).
- **KaTeX-rendered math** throughout the Math and Quant sections (and
  available on all subject/chapter pages generally), with consistent
  "math-box" callouts for Definitions, Theorems, Propositions, Lemmas,
  Corollaries, Examples, Remarks, and Proofs.
- **Collapsible chapter/subsection sidebar (TOC)** on subject/chapter
  pages across all curriculum sections, with breadcrumb navigation and
  prev/next chapter buttons at the bottom of each page.
- **Math section**- 25 subjects, each organized into chapters and
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
- **Biology section**: 25 subjects across 5 groups (Molecular & Cell
  Biology, Genetics & Evolution, Organismal Biology, Ecology & Behaviour,
  Biotechnology & Applications), each with a subject overview and 6-10
  chapters, based on GATE/CSIR-NET syllabi.
- **Music section**: 8 subjects covering Carnatic music (Fundamentals, The
  Rāga System, The Tāla System, Musical Forms & Compositions, Improvisation
  & Ornamentation, History & Composers, Instruments, Concert Practice),
  each with a subject overview and chapters.
- **Dev section**: 8 subjects covering the systems/applied side of computer
  science (Operating Systems, Computer Networks, Database Systems, Computer
  Architecture, Software Engineering & Systems Design, Distributed Systems,
  Compilers, and a survey-level AI/ML), each with a subject overview and
  chapters.
- **About Me** page (reached via the favicon mark) with contact details
  folded in (email, LinkedIn, GitHub).

## Site Navigation

```
/                       Home (pie)
/about/                 About Me (incl. contact info)

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

/biology/               Biology (5 groups, 25 subjects)
  /biology/<subject>/                       Subject overview
  /biology/<subject>/<chapter>/             Chapter content

  Molecular & Cell Biology (molecular-cell-biology/): biomolecules-biochemistry,
    cell-biology, molecular-biology, cell-signaling, structural-biology
  Genetics & Evolution (genetics-evolution/): genetics, population-genetics,
    evolution, taxonomy, genomics
  Organismal Biology (organismal-biology/): development, plant-biology,
    animal-physiology, immunology, microbiology
  Ecology & Behaviour (ecology-behaviour/): population-ecology,
    ecosystem-ecology, behavioural-ecology, conservation-biology, epidemiology
  Biotechnology & Applications (biotechnology-applications/): recombinant-dna,
    bioprocess-engineering, plant-biotechnology, medical-biotechnology,
    environmental-biotechnology

/music/                 Music (8 subjects)
  /music/<subject>/                         Subject overview
  /music/<subject>/<chapter>/               Chapter content

  Fundamentals, The Rāga System, The Tāla System, Musical Forms &
    Compositions, Improvisation & Ornamentation, History & Composers,
    Instruments, Concert Practice

/dev/                   Dev (8 subjects)
  /dev/<subject>/                           Subject overview
  /dev/<subject>/<chapter>/                 Chapter content

  operating-systems/, computer-networks/, database-systems/,
    computer-architecture/, software-engineering/, distributed-systems/,
    compilers/, ai-ml/
```

## Tech Stack

- HTML5 + Bootstrap 5.3
- KaTeX 0.16.9 for math rendering
- Font Awesome 6.4 for icons
- Plain CSS (`css/styles.css`) and JS (`js/script.js`) for theming and
  interactivity (theme toggle, collapsible TOC, etc.)
