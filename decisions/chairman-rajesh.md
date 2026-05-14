# Chairman approved: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Rajesh (Chairman)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:49:10 PM

---

APPROVED WITH PIVOT: Build the single-shop order + inventory dashboard first (no multi-shop aggregation yet). Ship a working URL by day 3 that connects one Etsy seller's live data via API key, shows orders and stock levels, and exports a CSV. Validate with 2–3 Etsy sellers this week; if they use it daily and ask for multi-shop, add that in cycle 5.

**Reasoning:**

You're right that this avoids the liability and validation walls that killed the tax ideas. And yes, I approved the single-tenant seller dashboard shape in cycle 1. But "single upload of shop API keys" + "real-time sync" + "one CSV export per shop" is still a multi-shop product in disguise—it solves the multi-shop problem, which means your unit economics, support load, and feature scope all depend on sellers managing multiple accounts at once. That's a second variable you don't need yet.

Start with one shop. One Etsy seller managing one account who needs better visibility than Etsy's native dashboard. That's a tighter wedge: connect to Etsy API, surface orders and inventory in real time, export CSV for their own records. Ship it in 3 days. Then find 2–3 sellers and ask: "Would you pay for this if it worked with all your shops?" Their answer tells you whether multi-shop is a feature request or a core need. If it is, cycle 5 is the time to add it.

Execution mode means we ship. This ships. But don't bake multi-shop complexity into the first deploy—it's the second feature, not the first.
