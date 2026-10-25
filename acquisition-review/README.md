# Acquisition Earnings & Cash-Flow Review

**An independent financial analysis project by Hashir Kayani, Rutgers University.**

A browser-based acquisition review workspace and an editable Excel companion for reconciling seller earnings claims, buyer assumptions, annual cash requirements, and downside sensitivities.

**Status:** functioning v1.0 prototype with synthetic examples and automated calculation tests. Practitioner review, live-deal testing, and time-saving claims have not been established.

## What question does it answer?

> How much of the seller's advertised earnings remains under the buyer's assumptions, what cash requirements could reduce it, and what information still needs review?

The intended use is a preliminary review after financial information becomes available. The user supplies the accounting figures and judgment about adjustments. The application makes the resulting economics explicit and records unresolved items.

## Explore the project

- **[Open the interactive workspace](index.html)** — after GitHub Pages is enabled, use the Pages URL as the public presentation link.
- **[Download the Excel model](model/acquisition-review.xlsx)** — five formula-driven worksheets, preloaded with the Harbor example.
- **[Read the methodology](methodology/METHODOLOGY.md)** — definitions, assumptions, and interpretation limits.
- **[Read the worked cases](examples/CASE_STUDIES.md)** — independently reconciled example figures.
- **[Review validation](tests/VALIDATION.md)** — test coverage, browser checks, and verification limits.
- **[Publish on GitHub](PUBLISHING.md)** — upload and Pages instructions.

## Core features

| Feature | Analytical purpose |
| --- | --- |
| Net-income-to-EBITDA reconstruction | Preserve an explicit starting earnings basis |
| Seller and buyer adjustment log | Include signed positive and negative adjustments |
| Normalization / owner / pro forma categories | Separate historical assumptions from future changes |
| Linked owner replacement costs | Show the expense required to replace departing responsibilities |
| EV / earnings comparisons | Reveal the effect of earnings assumptions on headline multiples |
| Annual cash bridge | Include maintenance and growth capex, working capital, taxes, and other cash demands |
| Contribution-margin sensitivity | Explore the operating impact of changed revenue and additional costs |
| Input checks and follow-up questions | Keep unresolved judgments and missing information visible |
| JSON, CSV, memo and print exports | Retain inputs and carry the analysis into another workflow |

There is no proprietary deal score or automatic acquisition recommendation.

## Quick start

1. Open the hosted page and inspect Harbor, Keystone, and the incomplete-data example.
2. Use **Deal & financials** to enter one complete annual or LTM period and define the EV basis.
3. Review the adjustment log. Select buyer-assumed amounts and explicitly enter replacement costs for positive owner adjustments.
4. Enter annual cash requirements. Use zero only when the amount is known to be zero.
5. Explore the downside sensitivity and write your assessment in the memo.
6. Download project JSON to retain work. Reloading clears unsaved changes.

To run locally, serve this folder with any static HTTP server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. ES modules require HTTP; double-clicking `index.html` may not work. No package installation or build step is needed.

## Worked result: Harbor Commercial Services

All figures below are fictional USD amounts.

| Measure | Result |
| --- | ---: |
| Reconstructed historical EBITDA | $700,000 |
| Seller earnings presentation | $1,050,000 |
| Buyer-assumed normalized earnings | $775,000 |
| Buyer operating case | $745,000 |
| Enterprise-value assumption | $5,000,000 |
| EV / buyer normalized earnings | 6.45× |
| Cash before financing | $525,000 |
| Illustrative cash / annual debt service | 1.46× |
| Cash after financing | $165,000 |
| Scenario cash before financing | $305,000 |

The seller presentation includes owner compensation, disputed legal fees, and proposed supplier savings. The buyer base case includes replacement management, a negative earnings adjustment, and additional operating costs. The difference is explained line by line rather than converted into an acquisition score.

## Architecture

```text
index.html                  Accessible application shell
assets/app.js               Forms, reports, local file import/export
assets/engine.js            Pure financial calculations and validation
assets/examples.js          Three synthetic examples
assets/style.css            Responsive presentation and print layout
examples/                   Importable JSON and case walkthroughs
model/acquisition-review.xlsx  Formula-driven Excel companion
methodology/                Definitions, data contract, limitations
tests/                      Automated checks and validation record
```

The calculation engine has no browser or third-party dependencies. Run the automated suite with Node.js 20+:

```bash
npm test
```

## Privacy

The application uses local browser calculations, no external libraries, no analytics, no API calls, and no automatic browser storage. Project files are read only when the user selects them. Exports are initiated by the user. Hosting providers still receive ordinary page requests; external reference links navigate to their respective websites when clicked.

Never commit private target financials, exported project files, or confidential memos to a public repository. All provided examples are synthetic. Browser and Excel inputs are independent; Excel import and automatic synchronization are not implemented.

## Limitations and next steps

This is a documented independent prototype, not a quality-of-earnings report, valuation opinion, or lender underwriting model. Accounting basis, adjustment legitimacy, transaction structure, tax assumptions, seasonality, and cash timing require human review. It does not assess all acquisition risks.

Next validation work: observe practitioner workflows, review financial definitions with a qualified practitioner, compare total workflow effort with existing spreadsheets, and test independent repeat use. No adoption or investment-outcome claims are made.

## Conceptual references

- [SEC: Non-GAAP Financial Measures, including Questions 103.01–103.02](https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures). Supports the distinction and reconciliation between net income and EBITDA. This project does not claim SEC compliance or endorsement.
- [BDC: How to finance a business acquisition](https://www.bdc.ca/en/articles-tools/money-finance/get-financing/business-acquisitions-types-financing). Background on acquisition financing and normalized earnings. Canadian financing context; not used as a US lending rule.

## License

MIT. See [LICENSE](LICENSE). Example data are fictional. No institutional affiliations or endorsements beyond the author's stated university are implied.
