# CFO review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Svetlana (CFO)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:45:21 PM

---

# REAL MATH — ETSY MULTI-SHOP DASHBOARD

I'm going to cut through this because the shape is sound and we're in execution mode. But I need actual numbers, not the pitch story.

---

## 1. PRICING MODEL — COMMITTED

**$29/month per dashboard user.**

Why this number:
- Etsy sellers making $500–2k/month per shop (conservative mid-tier reseller). Managing 3 shops = $1.5–6k/month gross revenue.
- They're already paying Etsy 6.5% transaction + $0.20/sale. They're not price-sensitive to $29/month for time saved on inventory.
- Stripe + hosting = ~$8/month fixed cost per user (generous). At $29, we keep $21 contribution margin per user, per month.
- Comparable: Shopify's multi-channel tools start at $9/month (Shopify Basic) and charge $29/month add-ons for advanced inventory. We're in the middle, which is rational.
- Not $49 (too close to Shopify's tier, kills conversion). Not $9 (looks desperate, signals low value).

**Pricing floor check:** If we sign 10 paying customers in week 4, that's $290/month recurring. Our burn is ~$42k/month (4 FTE + minimal ops). This is 0.7% of burn. **This product cannot be our revenue lifeline—it's a validation play, not a business.**

---

## 2. CAC FOR FIRST 10 CUSTOMERS

**Estimated CAC: $840 per customer (all-in, including founder time)**

Breakdown:
- **Founder outreach (40 hours @ $100/hr equivalent internal cost):** $4k ÷ 5 signups (assuming 5 convert from cold reach) = $800 per customer acquired
- **Paid spend (optional, not required for first 5):** $0 (we skip it; cold outreach to Etsy seller communities)
- **Onboarding/support (2 hours per new customer @ $100/hr):** $200 per customer
- **Total:** $1,000 per customer (being conservative)

**But reality check:**
- We already have a network bias: founders know Etsy sellers, freelancer communities, or have email lists. Cold reach to r/EtsySellers, Etsy forums, seller Facebook groups = nearly free.
- Actual founder time per signup: 3–5 hours (discovery call, setup, initial feedback) = $300–500.
- **Realistic range: $400–800 per customer for first 10.**
- I'm using $840 to flag that we can't afford to be sloppy about who we contact.

**What this means:** We have to close 3 customers in week 4, not 1. Bottleneck is founder availability to do discovery + setup, not the product.

---

## 3. RUNWAY COST TO VALIDATE THIS IDEA

**1.5 weeks of runway. (We have 16.5 months; this costs 0.9%)**

What "validation" means here:
- Week 1: Build (5 days, 1 FTE eng time = $2k all-in). Deploy a working dashboard that syncs one shop and exports one CSV.
- Week 2: Find 5 Etsy sellers, get 3 to sign up, collect $87/month recurring from live signups.
- Week 3: Measure: Do they keep the subscription? Do they come back? Any churn? Do they ask for features? Do they send referrals?

**Real cost:**
- Eng salary: ~$8k/week (loaded). This eats 1 week.
- Founder discovery + support: $2–3k (already budgeted as overhead).
- **Total: ~$10k out of a $42k/week burn = 0.24 weeks.**

**So: 1.5 weeks of "real validation spend" (including founder time + small mistakes).**

If this fails, we've lost 1.5 weeks of runway. If it succeeds (3 paying customers, zero churn in week 2), we've bought a real option on a self-serve product that doesn't require enterprise sales.

---

## 4. THE SINGLE NUMBER THAT HAS TO BE TRUE

**Retention after 30 days ≥ 60% of sign-ups.**

Why this one:
- We sign up 5 sellers in weeks 1–2.
- By week 3, at least 3 of them are still paying and actively using it (checking the dashboard at least once per week).
- If 2 or fewer stay, the product doesn't have product-market signal. It's nice-to-have, not must-have.
- If 3+ stay, we've found something real: Etsy sellers actually use consolidated inventory tracking, and they'll pay for it.

**Secondary numbers that matter:**
- **Time-to-first-value:** Seller can upload API keys, see their 3 shops' inventory in <10 minutes. If this takes 30+ minutes, they bounce.
- **Referral rate:** Of the 3 retained customers, do any mention it to other Etsy sellers unprompted? (One referral by week 4 would be a strong signal; zero means we're not solving a pain point, just a convenience.)
- **Churn:** If any customer cancels in weeks 2–3, we call them. What happened? (Did they switch back to sheets? Did a feature break? Did they stop selling?) This tells us if the product broke or if the pain point was real but our solution missed.

---

## THE HARD PART (AND MY CONCERN)

I'm **not** blocking this. But I need you to hear what I'm worried about, because it's the thing that kills these ideas:

**Etsy seller cohorts are fragmented.** You're targeting "resellers managing 2–5 shops," but that could mean:
- Dropshippers using Printful (don't need manual inventory tracking).
- Vintage/thrift resellers (highly manual, might love this).
- Craftspeople with one main shop + 1–2 side accounts (might not feel enough pain to pay).

Your week 1 research has to clarify: Which sub-cohort feels the most pain? If you go after the wrong group, you'll get signups but no retention.

**Action for week 1:** Before you code, interview 3 Etsy sellers you can reach this week. Ask:
1. Do you manage multiple shops right now?
2. How often do you need to check inventory across shops?
3. If you had one dashboard showing all your inventory, would you use it weekly?
4. Would you pay $29/month for that?

If 2 of 3 say yes to #4 and can articulate a specific inventory problem, we build. If they say "maybe" or "sounds nice," we don't. No building without a clear yes on the money question.

---

## DECISION: APPROVED FOR 5-DAY BUILD

You have:
- **Week 1 (days 1–2):** Founder does 3 seller interviews. Get explicit yes on pricing.
- **Week 1 (days 3–5):** Engineer builds: Etsy API auth → sync 1 shop → CSV export → live URL.
- **Week 2:** Outreach to 5 sellers, close 3 paid signups.
- **Week 3:** Measure retention.

**Go/no-go call on day 21.** If 3+ are still paying, we iterate and push for 10 customers by week 6. If <3 are retained, we sunset this and move to the next idea (which better be ready).

**Your runway hit:** ~1.5 weeks. You have 16.5 months. You can afford this.

**What I need from you before day 1:** Founder names the 3 Etsy sellers they'll interview. If they don't have names by EOD tomorrow, we're stalling, and I'm pulling the plug.

Ship it.
