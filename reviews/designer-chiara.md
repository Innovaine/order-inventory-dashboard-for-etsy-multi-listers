# Designer review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Chiara (Designer)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:47:52 PM

---

# UX Review: Order & Inventory Dashboard for Etsy Multi-Listers

## 1. Who's the user and what's their current workflow

**Etsy reseller running 2–5 shops.** Usually:
- Morning routine: Open browser, log out of one Etsy account, log into another. Repeat 2–5 times.
- Check orders placed since yesterday. Note them in Google Sheets or a notebook.
- Check inventory on each shop. Update Sheets with stock counts.
- If restocking: cross-reference Sheets to see which SKUs are low across *all* shops, then decide what to reorder from supplier.
- ~20–30 minutes of tab-switching, context-switching, manual entry.

Actual workflow varies: some use Sheets religiously. Some use phone notes. Some just keep it in their head until something runs out and they lose a sale.

The user is not tech-averse—they're running a business on Etsy—but they're time-constrained and don't have a budget for third-party inventory software (those start at $40/month and assume a different business model).

---

## 2. The friction we're removing (one sentence)

Eliminating the need to log in and out of multiple Etsy accounts and manually consolidate order and inventory data across shops.

---

## 3. Where the design gets hard

**API key input & security perception:**
- Users will see "paste your API key here" and feel *exposed*. We're asking them to hand over credentials. The UX must immediately communicate: "This stays private. We never store this on a server. We only use it to fetch your data." (Even if technically we do store it encrypted—the user needs permission to feel safe.)
- First-time users will hesitate. Second-time users (after they see it works) will move faster. Design needs to front-load trust, not assume it.

**Real-time sync expectations:**
- Users will expect "live" to mean *instant*. If they list a new item on Etsy and it takes 5 minutes to appear in our dashboard, they'll think it's broken.
- We need to set sync frequency *visibly* (e.g., "Last updated 3 minutes ago. Next sync in 2 minutes.") so expectations are honest. Don't hide latency.

**Multiple shops, one view—filtering and mental model:**
- If I see 47 pending orders, I need to instantly know: which shop? Which variant? Without clear visual separation by shop, this becomes unreadable noise.
- Users will want to filter by shop, by status (pending/shipped), by low stock. If we ship v1 without filtering, the dashboard becomes useless at 3+ shops.
- Still concerned about the CSV export—"one CSV per shop" is a shipping crutch, not a feature. It assumes users want to *leave* our dashboard to do restocking decisions. If that's the case, we've failed to be the consolidation tool we promised. (I flagged this logic in cycle 4 with the multi-shop dashboard; same problem.)

**Inventory sync accuracy & freshness:**
- Etsy doesn't push inventory updates in real-time. If a shop has 5 units of something and I sell one on Etsy, our dashboard might show 5 for another 5 minutes.
- Users will double-check Etsy manually if they don't trust our counts. That means we haven't actually removed friction—we've just added a second source of truth.
- Design can't fix this (it's a data problem), but UX must be honest about it: "Inventory synced every 5 minutes" or whatever our actual cadence is.

**Accessibility:**
- Tables with 6+ columns (Shop, Order ID, Item, Qty, Status, Date) get cramped on mobile. Resellers might check this on their phone while at a supplier or packing orders.
- Need a mobile-first layout: either card-based (one order per card, shop name prominent) or a smart table that hides less-critical columns on small screens.

**Error states:**
- What if an API key expires or gets revoked? Dashboard shows stale data. User doesn't notice. Then they restock based on wrong numbers.
- Need a status indicator per shop: green (syncing), yellow (last sync was >15 min ago—possible delay), red (API key invalid, sync failed).
- First sync can fail (Etsy API rate limits, network hiccup, invalid key). Can't let users walk away thinking it worked when it didn't.

---

## 4. What the first 60 seconds looks like (user holding phone)

**Scenario: Reseller named Maya, runs 2 Etsy shops, checking the dashboard on her phone during lunch break.**

- **Second 1–5:** Lands on homepage. Sees headline: "Manage all your Etsy shops in one place." Below it: "Connect your shops" button. Nothing else. (Good—low cognitive load.) She taps it.

- **Second 6–15:** New screen: "Add your first shop." A text input field labeled "Etsy Shop API Key" with a small info icon. She's confused. Taps the icon. A popover explains: "Find this in Etsy Seller Settings > Apps and Connections > Generate New Key." She switches to Etsy app. Generates a key. Comes back. Pastes it. Feels *slightly* paranoid but does it anyway.

- **Second 16–25:** Dashboard loads. She sees:
  - Top: Two shop names as tabs or buttons ("VintageHats" | "CraftedJewelry")
  - Below: A list of orders (3–5 recent orders visible) with columns: Item, Qty, Status, Date. Inventory section below showing top 10 products by stock level.
  - A timestamp at the bottom: "Last synced: 2 minutes ago."

- **Second 26–45:** She taps the second shop tab. Dashboard refreshes. Now showing orders and inventory for shop 2. She visually scans for items with low stock (red indicator, or just a number that looks small). Sees one item has "2 left in stock." Mentally notes: need to reorder that.

- **Second 46–60:** She goes back to tab 1, quickly scans again. Satisfied. Closes phone. Goes back to lunch. (No CSV export needed—she got what she came for: a quick inventory check across both shops in under a minute.)

**The feel:** Fast, clear, uncluttered. No surprises. Trust builds because she got an answer without friction. She'll come back tomorrow.

---

## My take

This is shippable in 5 days *if* we ruthlessly cut scope:

**Ship v1 with:**
- Multi-shop API key input (with clear trust-building copy)
- Orders list per shop (columns: Item, Qty, Status, Date—no custom filtering yet)
- Inventory view per shop (sorted by stock level, highlight anything <5 units in yellow/red)
- Sync status indicator (when last sync happened, whether API key is valid)
- Mobile-responsive card layout for small screens
- No CSV export in v1 (users can screenshot or note inventory manually if needed—friction-free beats feature-complete)

**Validation path (concurrent with build):**
- Find 3 active Etsy resellers by Wednesday (ask in Etsy forums, Facebook groups for resellers, or cold-message sellers with 2+ active shops)
- Offer them free access + 15-min interview in exchange for testing the dashboard by end of week
- Ask: "Did this save you time vs. logging into Etsy 5 times?" and "What would make you *not* use this?"

**Why I'm saying yes:**
- It avoids the liability tar pit of tax/expense ideas
- It uses an existing API (low build risk)
- The core workflow (consolidation + visibility) is real and repeatable
- We've already designed and rejected a similar dashboard shape; this reuses that skeleton
- Most importantly: it's so obviously incomplete that it *forces* us to validate with real users instead of shipping to crickets and waiting

**What still worries me:**
- CSV export as a crutch. If we ship it, users will use it instead of staying in the dashboard. That's a sign we haven't solved the consolidation problem fully.
- Sync latency. Etsy doesn't give us real-time pushes. Users will notice their dashboard is behind Etsy's native dashboard. We need to be transparent about that or they'll stop trusting the numbers.
- Schema creep. Once we have orders + inventory, product managers will want to add "print labels," "auto-message buyers," "sync to Shopify." We need a hard line: this cycle is *read-only consolidation*. Nothing else.

**Recommendation: APPROVE with the scope discipline above.** We ship something users can validate in 5 days, we get real signal by end of week, and if it works, we iterate. If it doesn't, we've burned 7 days instead of 28 on a dead-end idea.
