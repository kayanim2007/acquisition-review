# Financial methodology

## Scope and sequence

This version supports one complete 12-month period in one selected currency. Currency selection changes labels and formatting, not exchange rates. It targets a straightforward service-business acquisition review. It does not normalize financial statements automatically.

1. **Historical EBITDA = net income + interest expense + income tax expense + D&A.** Use signed amounts already recognized in the selected period. This is not automatically audited, GAAP-compliant, or normalized because the input is called net income.
2. **Seller presentation = historical EBITDA + all seller-origin signed claims.** This reproduces the supplied claims, including rejected, unresolved, and pro forma items, so it may differ from a conventional EBITDA definition.
3. **Buyer-assumed normalized earnings = historical EBITDA + assumed historical adjustments − linked owner replacement costs.** Historical adjustments include normalization and owner categories; only assumed rows flow into the buyer base case.
4. **Buyer operating case = buyer normalized earnings + assumed pro forma changes − additional recurring operating costs.** This is a forward-looking annual run-rate assumption, not historical EBITDA.
5. **Cash before financing = operating case − maintenance capex − growth capex − incremental operating working capital − cash taxes − other cash requirements.** This simplified cash budget excludes financing service. It is not actual CFO or a complete reconciliation for noncash accounting items.
6. **Illustrative coverage = cash before financing / annual principal and interest.** Cash taxes must match the modeled ownership and financing assumptions. Lender DSCR and fixed-charge definitions vary; the output is not a covenant measure.
7. **Cash after financing = cash before financing − annual principal and interest.** Fees, closing cash needs, dividends, and investments must be included in other cash requirements if relevant to the annual scenario, or analyzed separately.

## Adjustment judgment

Use `assumed`, `rejected`, or `unresolved`. Assumed means the analyst selected the amount, not that evidence was verified. An unresolved row is excluded from the base case even when a buyer amount is entered. Rejected claims remain visible in the seller presentation. Partial acceptance uses a buyer amount different from the seller claim.

Amounts are signed. A one-time revenue adjustment should remove the earnings contribution, not indiscriminately subtract gross revenue while leaving associated costs. Include buyer-originated negative adjustments for omitted recurring expenses or excess historical income.

A positive assumed owner adjustment requires an explicit annual replacement-cost value. Zero is allowed only as a documented assumption. Replacement costs should include relevant salary, benefits, employer taxes, and other necessary responsibilities. Do not enter the same cost in additional opex as well.

Pro forma savings and costs are separated from normalized historical earnings. Implementation timing and execution costs are not automatically modeled. The analyst must consider whether an adjustment is actually recurring, whether periods align, and whether entries overlap. Matching overlap-group labels in the browser warn about possible duplication; the tool cannot discover semantic double counting.

SDE is not accepted as a relabeled EBITDA input. Reconcile owner compensation and other adjustments to the required starting basis first. Owner distributions are not P&L expenses. For pass-through entities, owner taxes are distinct from company income-tax expense. Record an explicit zero only where appropriate.

## Enterprise value

The user enters an EV assumption and confirms its basis. Multiples remain unavailable without confirmation and positive EV. Seller note and earnout fields disclose components already included in that assumption; they are not added automatically. A note's payment timing is financing; earnout valuation requires a separately selected, explained value.

Document cash-free/debt-free terms, normal working-capital delivery, excluded or assumed liabilities, consideration components, fees, and asset/stock structure where relevant. The tool does not calculate an EV-to-equity bridge or working-capital true-up. These omissions limit use with complex transaction structures.

Only strictly positive earnings receive a multiple. Small positive denominators are not capped. The browser flags normalized margins below 2% as a sensitivity warning; that threshold is an explicit software heuristic, not an investment standard. All ratios use unrounded underlying values.

## Cash assumptions

Maintenance capex preserves existing operating capacity. Growth capex is additional investment and is deducted separately. Avoid confusing either with depreciation expense. All cash outflows are nonnegative except working-capital change, which may be negative for a release of cash.

The working-capital input represents annual incremental operating cash use, not the closing balance or negotiated peg. It excludes cash and financing debt. Opening liquidity, seasonality, large customer payment swings, deferred maintenance, and unusual noncash charges need additional review.

Cash taxes are entered directly and are not inferred from P&L tax expense or a default tax rate. Additional recurring operating expenses must be incremental to the earnings bridge. Any remaining noncash or timing adjustments needed for the specific business must be analyzed explicitly; the simplified bridge may be unsuitable if they are material.

## Sensitivity

**Earnings change = base revenue × selected revenue change × contribution margin − additional scenario costs.**

Contribution margin represents incremental revenue after variable costs. Revenue change is constrained to −100% through +100%; contribution margin to 0–100%; extra costs must be nonnegative. These are software bounds, not predictions. Taxes, capital expenditure, working capital, and debt service are held constant, so the result is a sensitivity rather than a fully integrated forecast. The fixed revenue grid uses −20%, −10%, 0%, and +10% with the same chosen extra cost.

## Missing-data and validation policy

Unknown numeric inputs use `null` in JSON and blanks in Excel. Zero remains a valid known amount. Missing reconstruction inputs suppress historical EBITDA. Invalid adjustment rows suppress adjusted results. Missing cash inputs suppress cash estimates. Missing or zero debt service produces no coverage ratio, while explicit zero permits cash after financing to equal cash before financing.

Financial period labels must match adjustment periods exactly. Short periods are not annualized. IDs must be unique. The browser JSON importer validates the version, field types, categories and limits. The browser supports up to 200 adjustments. Excel reserves 30 rows; expansion requires extending all associated formulas and validation ranges.

Passing modeled checks is not evidence that all risks have been assessed. Customer concentration, legal exposure, revenue recognition, licensing, owner dependency, competitive position and hidden liabilities are outside the model's automated coverage.

## Evidence and status

All included companies, financial figures and source notes are synthetic. Automated tests validate implementation behavior on defined cases. They do not validate adjustment judgments, market relevance, financial-statement accuracy, or suitability for a particular transaction. No practitioner review or live-deal adoption has yet been established.

Conceptual references are linked in the README. SEC public-company guidance informs careful measure labeling and reconciliation; it does not certify this private-business template.
