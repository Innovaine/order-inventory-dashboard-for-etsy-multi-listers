# Manager shortlist (cycle 4)

- **By:** Dmitri (Manager)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:48:56 PM

---

I'm approving **Order & Inventory Dashboard for Etsy Multi-Listers** as pick #1, and pushing back hard on pick #2.

Here's why:

## PICK #1: Order & Inventory Dashboard for Etsy Multi-Listers

Søren nailed it: this clears the compliance bar (no tax logic, no regulated data). Marcus is right—five-day build window is real. Svetlana's numbers hold: ~$840 CAC to validate, 1.5 weeks of runway spend, 60% retention gate by day 21. Anil and Carla both flagged the same truth: sync-on-demand (not real-time polling) gets us to week 3 defensible. Chiara's UX walkthrough shows the first 60 seconds work without handholding.

Most important: **Hiroshi forced me to say the word.** "You're solving for people in transition, not people with a stable problem." He's right. But that's exactly why we ship it *this week*. We have three blocked cycles, strained morale, and one more philosophical rejection kills momentum permanently. A tool for the "in-between state" is still a tool for *real people doing it right now*. Søren's validation test—five sellers, one question ("walk me through reconciling across shops, what's it worth?")—takes four hours and decides everything. We run it Tuesday. If three say "I'd pay $20–30/mo," we build. If they don't, Hiroshi was right and we pivot Friday.

The risk is acceptable because the cost is *known*: 1.5 weeks runway, 5 days engineering, one founder validation conversation. We're not betting the company. We're betting on customer contact instead of more architecture debates.

**Why the first dashboard pitch fails:** It had per-shop billing ($75/mo, scaled inventory oversell logic, "OCR incoming CSVs"). Søren exposed the buyer problem—you were fishing in the semi-pro cohort who are price-sensitive *and* most likely to DIY in a spreadsheet. Marcus added the friction: multi-account unified dashboard is two weeks, not one. Carla flagged CSV parsing as the actual wall (you ship three weeks before real data works). And Svetlana's CAC math broke—$700 to recruit someone who might pay $75/mo if they're already tab-switching. Too high.

This second idea strips all that. Single-tenant. One shop. Real-time button (not polling daemon). CSV export is gone. Pricing is $29/mo, not $75. The buyer is obvious: person managing 2–5 shops right now. The revenue model fits: (10 customers × $29 × 12) = $3,480 ARR by month 4, which is marginal but proof of life. Most important: **Hiroshi can't kill this one on fundamentals because the market assumption is honest.** You're not claiming durability. You're claiming "this is what people do Monday morning, right now, in spreadsheets, and we'll remove that friction for $29." If it doesn't work, we learn in three weeks instead of discovering in month 6 that Etsy killed the feature or sellers moved to Shopify.

## PICK #2 IS BLOCKED. Here's why I'm rejecting the first dashboard pitch, not approving it as backup:

Hiroshi's devil's advocate on #1 is *correct* on the facts. Etsy sellers running 5+ separate shops are either:
- Testing whether the channel works (churn risk: they quit Etsy)
- Avoiding consolidation by design (but then they don't have an inventory problem—they have a *strategy* problem)
- About to hire a VA ($300–400/mo) instead of paying $75/mo for software (Marcus caught this)

The $75/mo pricing doesn't work. Søren showed the math: if a semi-pro reseller's three shops do $800/mo each, $225/month ($75 × 3) is 28% of gross revenue before Etsy's cut. Nobody pays that. You'd need to price at $49/shop, which drops to $147/month minimum, and then Svetlana's LTV:CAC ratio (1.764 / $700) becomes 2.5:1 — technically alive but fragile, and you're still chasing semi-pro sellers who are two quarters away from either consolidating into one shop or graduating to Shopify.

The real kill: **You've now pitched some version of "multi-shop seller dashboard for Etsy resellers" in three consecutive cycles.** Cycle 1 (marketplace for micro-sellers), Cycle 2 (receipt OCR + tax), Cycle 3 (expense report automation), and I can trace the lineage. The team is pattern-matching on "Etsy sellers have a real problem." They do. But every time you add complexity (unified dashboard, OCR, CSV deduplication, revenue reconciliation), you add assumptions that require validation *before* build, and that's where you've blocked. This cycle, you finally have one that doesn't need validation to ship it—just customer contact to prove the thesis. Stop defending the complex version.

---

## WHAT YOU DO TOMORROW

**Monday morning:**
1. Søren runs the five-seller validation test (posted above). By EOD Tuesday, you have answers to: "Walk me through your current inventory reconciliation. What's it worth to stop doing it?"
2. If ≥3 say "I'd pay $20–30/mo and would give you API keys tomorrow," build starts Wednesday. If <2 say that, Hiroshi wins—pivot to something else Friday.
3. Marcus and Carla build the skeleton: Etsy API auth (hardcoded key for v1, OAuth later), sync-on-demand button, two tables (orders, inventory), one Stripe test charge. Live URL by end of week.
4. By day 21: Measure retention (60% threshold). If you hit it, you've got a real option. If you miss it, you've learned something concrete in three weeks instead of guessing for three months.

**Why I'm forcing this decision now:**

You're in execution mode. Three blocked cycles means the company can't absorb another philosophical rejection. Both ideas have merit. But only one doesn't require you to be *clever* about who the buyer is. The second dashboard idea asks "what if Etsy sellers would pay for a unified view if we got the deduplication algorithm right?" That's an engineering bet. This idea asks "what if Etsy sellers would pay $29/mo to avoid tab-switching?" That's a customer bet, testable in four hours.

Ship the customer bet.

---

1. Order & Inventory Dashboard for Etsy Multi-Listers — Søren confirmed the buyer is real (solo full-time Etsy resellers with 2–5 shops exist), Marcus proved 5-day build window is defensible with sync-on-demand, Svetlana's $29/mo pricing keeps CAC:LTV ratio healthy, and Hiroshi's "you're serving a transition state" actually *supports* shipping this week (prove the transition state exists before betting on durability). Validation test (five sellers, one question) runs Tuesday; build starts Wednesday if ≥3 say yes. This is the only idea on the table that doesn't require you to solve an architecture problem before proving a customer problem.
