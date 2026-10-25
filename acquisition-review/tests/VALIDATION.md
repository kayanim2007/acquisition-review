# Validation record

Version 1.0 • October 25, 2026

## Automated engine tests

Run `npm test`. The 15 checks cover:

1. Harbor historical earnings, seller claims, buyer adjustments, replacement costs, cash and downside figures.
2. Keystone capital-intensive example and cash coverage.
3. Incomplete-data gating.
4. Explicit zero versus unknown tax.
5. Required owner replacement-cost input.
6. Negative, unresolved, rejected, and partially selected adjustment behavior.
7. Pro forma separation from historical normalized earnings.
8. Period mismatch and short-period rejection.
9. EV confirmation and nonpositive earnings denominators.
10. Working-capital release and invalid negative capex.
11. Zero annual financing service.
12. Invalid sensitivity driver bounds.
13. Duplicate IDs and potential overlap warnings.
14. Version 1 JSON round trip and malformed input rejection.
15. CSV formula-like text neutralization and quoting.

The reference values are shown as independent arithmetic in `examples/CASE_STUDIES.md`. These checks verify implementation behavior, not the accuracy of a real target's financial statements or the merit of a proposed adjustment.

## Workbook checks

The workbook was recalculated in the authoring engine. Harbor results reconcile to the JavaScript model: historical EBITDA 700,000; seller presentation 1,050,000; normalized earnings 775,000; operating case 745,000; cash before financing 525,000; scenario cash 305,000.

Input-change checks confirmed that blank cash taxes suppress cash output, explicit zero cash taxes produce 625,000, and a missing required owner replacement cost suppresses normalized earnings. The original example inputs were restored before export. A formula-error scan returned no matches. All five worksheet views were rendered and visually reviewed.

Native desktop Excel, Google Sheets, and Numbers recalculation have not been independently tested. Users should verify compatibility in their chosen application before relying on outputs. The browser supports more adjustment rows and input diagnostics than the Excel companion; see methodology.

## Browser checks

In Chromium, the default dashboard displayed the expected Harbor figures. Changing the legal adjustment to assumed at 80,000 updated normalized earnings to 855,000 and cash before financing to 605,000. Clearing cash taxes suppressed cash and coverage. The scenario view displayed expected base and downside figures. The project JSON download completed successfully. Memo and adjustment CSV downloads were also exercised.

The application is styled for narrow screens, but a dedicated mobile-device test was not performed. Print/PDF behavior depends on the browser's print engine and is not a generated, pre-verified PDF deliverable.

## What remains unvalidated

- Practitioner suitability, financial-definition review, and live-deal workflow performance.
- Measured time savings, repeat adoption, and investment outcomes.
- Completeness of user-entered adjustments and cash requirements.
- Browser and workbook equivalence for every possible input combination.

These limits should remain visible when describing the project publicly.
