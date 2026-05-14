# HR staffing plan: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Nalini (HR)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:49:28 PM

---

I'm reading this as: Chairman approved the *shape* (Etsy seller dashboard), but pivoted the scope down to single-shop first, multi-shop second. That's the right call—it halves complexity, validates the core value prop faster, and doesn't burn a week arguing about API architecture.

I can staff this.

---

## TEAM STRUCTURE

**Extend**: Product + Engineering (existing team)  
**New headcount**: 0  
**Duration**: 7 days (day 3 = working URL, day 7 = validation ready)

---

## ROLES NEEDED

1. **1 Backend Engineer** (assign from existing eng — must own Etsy API integration + sync logic)  
   — Job: OAuth + shop API key storage, pull orders/inventory on demand, no database design heroics. Just HTTP calls → data → database. Done by day 2.

2. **1 Full-stack/Frontend Engineer** (assign from existing eng — must own dashboard UI + CSV export)  
   — Job: Build the page, wire up the data, make the CSV button work. Ship by day 3.

3. **1 Product Manager** (you, stepping in light; no new hire)  
   — Job: Find 2–3 Etsy sellers by EOD Tuesday, book their 15-min validation calls for Thursday–Friday. Write the script: "Show me your Etsy seller account. Watch me sign in with your API key. Does this CSV export solve your restocking headache?" Capture: Do they use it daily this week? Do they ask for multi-shop without prompting?

4. **1 Designer** (assign from existing design — light; optional but recommended)  
   — Job: One clean dashboard layout by day 1 EOD. Orders table + inventory table + export button. No polish. No mobile. Desktop only.

---

## EXECUTION TEMPO

- **Day 1**: API key upload form + Etsy OAuth. Designer ships layout. PM locks in seller interviews.
- **Day 2**: Live order/inventory fetch working. Frontend wired to test data.
- **Day 3**: URL deployed. CSV export button live. One seller can sign in and export.
- **Day 4–5**: Ship fixes from early tester feedback.
- **Day 6–7**: Validation calls. Measure: daily use + multi-shop asks.

---

## SCOPE GUARD RAILS

- **No**: Webhooks, realtime push, multi-user, permissions, role-based anything.
- **No**: Multi-shop aggregation (Chairman blocked it; do it in cycle 5 if validation says yes).
- **No**: Fancy UX. Ugly dashboard that works > beautiful one that ships on day 5.
- **Database**: Single table per shop. New shop = new tenant record. Dumb and fast.

---

## CONCERNS (last, as requested)

**Validation risk**: We're assuming 2–3 Etsy sellers exist and are reachable by Tuesday. PM—you—need to move fast here. Check your personal network first. If you don't have seller contacts, we cold-email Etsy communities (r/Etsy, Etsy forums) by EOD today with "beta tester wanted" and take the first three who respond. If we can't find sellers by Wednesday, we pivot to plan B: build the URL, dogfood it ourselves with dummy Etsy data, ship anyway. The point is: no validation delays the ship date.

**Etsy API stability**: I'm trusting the Chairman's intel that Etsy docs exist and are stable. If the API is more brittle than expected, backend engineer pivots to GraphQL proxy or polling wrapper by day 1 EOD. Don't let perfectionistm on sync logic block the working URL.

**Morale note**: This is the first shipped URL in three cycles. The team is strained. Celebrate day 3, even if it's ugly. Momentum stops the bleeding.
