# Explain the project in an interview

## A short explanation

I built an acquisition earnings and cash-flow review tool to explore how a small-business deal's apparent economics change under different assumptions. It reconciles seller adjustments with buyer assumptions, includes replacement costs and negative adjustments, and shows cash requirements beyond EBITDA. I implemented the analysis in JavaScript and an editable Excel workbook, documented three synthetic cases, and tested the calculations and missing-data behavior. Practitioner feedback is the next validation step.

## Five concepts to be ready to explain

**Why can the seller and buyer earnings figures differ?** The seller may claim one-time expenses or owner compensation as add-backs. The buyer may reject those claims, accept only part, include a replacement manager, or identify omitted recurring costs. In Harbor, seller earnings of 1.05 million become buyer normalized earnings of 775,000 under the selected assumptions.

**Why isn't EBITDA cash flow?** It excludes financing costs, taxes and D&A, but maintaining equipment still uses cash. Growing receivables or inventory can absorb cash too. The tool explicitly deducts annual capex, working-capital changes and cash taxes. It remains a simplified scenario estimate, not a cash-flow-statement reconciliation.

**Why link owner replacement cost?** Adding back a departing owner's compensation can overstate sustainable earnings if someone must perform the same job. Harbor adds back 220,000 but deducts 120,000 of replacement compensation. Those two assumptions should be reviewed together.

**What does downside sensitivity assume?** Harbor loses 500,000 of revenue at a 40% contribution margin, reducing earnings 200,000. Extra operating costs of 20,000 produce a total 220,000 decline. Other cash requirements stay fixed, so it is a sensitivity and not a full forecast.

**How useful is it in practice?** The current evidence establishes functioning calculations and documented examples. Real-world usefulness is still a hypothesis. I would test input burden, review quality and independent reuse against a searcher's existing spreadsheet before claiming time savings or adoption.

Be explicit about development assistance if asked. Describe what you understand, reviewed and changed; avoid claiming sole unaided coding or professional diligence experience.
