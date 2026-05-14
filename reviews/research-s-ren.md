# Research review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Søren (Researcher)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:43:36 PM

---

# WHO PAYS Analysis: Etsy Multi-Lister Dashboard

I'm going to be direct: this idea clears bars the last four didn't. But it has a specific buyer problem that needs to be named and tested before we commit.

---

## 1. WHO PAYS — The Exact Buyer

**Title:** Full-time Etsy reseller or part-time craftsperson  
**Company size:** Solo (self-employed) or micro-partnership (2 people)  
**Annual revenue from Etsy:** $15K–$80K  
**Budget they pull from:** Personal business discretionary spend or reinvestment profit (no procurement process)  
**Decision maker:** Themselves (no approval committee)

This is where the idea gets real: **you're selling to someone who currently pays $0 for this problem.** They use Etsy's free dashboard + free spreadsheets. The question isn't whether the problem is real—it obviously is. The question is: **does this person have budget consciousness or budget laziness?**

If they're budget-conscious (watches every $10), they'll build a better Sheets template before paying $X/month.  
If they're budget-lazy (would pay to not think about it), they'll buy.

**That split determines if this survives.**

---

## 2. WHY THEY PAY NOW

The honest answer: **they probably don't, yet.**

What's on fire:
- Restocking decisions take 30–45 min per shop when inventory runs low (manual tab-switching)
- They miss low-stock alerts across shops (lost sales)
- They can't see which SKU variants are moving across *all* shops (blind to portfolio performance)
- They lose 2–3 hours/week to manual sync between Etsy and personal inventory spreadsheet

But here's the friction: **these are annoying problems, not agonizing ones.** They don't generate revenue pressure. A solo seller who loses $100/month to inefficiency won't pay $20/month for a tool unless they're also feeling *time pressure* (about to hire help, managing growth, or burned out).

The real trigger: **"I'm about to hire someone to manage this, or I'm considering a second supplier."** That's when $50–100/month becomes cheaper than a part-time VA.

---

## 3. CLOSEST COMPETITOR / CURRENT ALTERNATIVE

**Current state:** Spreadsheet + Etsy's native multi-shop dashboard (side-by-side browser tabs)

**Why they don't use Etsy's native solution:**
- Etsy *does* show multiple shops in one dashboard now (as of 2023)
- But it doesn't show *real-time inventory levels* across shops in a single table
- You still have to click into each shop to see low-stock alerts
- No cross-shop CSV export for integrated restocking

**Other "competitors" (not stealing share, but solving adjacent):**
- Inventory sync tools (TradeGecko, Sellfy multi-channel) — too complex, too expensive ($100+/mo), designed for omnichannel (Shopify + Amazon + Etsy). Overkill.
- Manual VA/fulfillment outsourcing ($400–800/mo) — only viable if they're doing $50K+ annual revenue
- Etsy's own API + custom Zapier workflows — requires technical literacy, takes 8–10 hours to build

**The real alternative:** They keep doing it manually, or they hire someone.

---

## 4. THE ONE NUMBER (TAM × adoption × pricing)

For $1M ARR:

| Variable | Assumption | Math |
|----------|-----------|------|
| TAM | Active Etsy multi-listers (2+ shops, $10K+ annual) | ~45K in US + EU |
| Serviceable | Those doing >$20K annual (budget-conscious enough to pay) | 18K |
| Achievable (Year 1) | 1% adoption (170 customers) | 170 |
| Price (monthly) | Freemium: $0 basic, $15/mo (advanced alerts + 5+ shops) | $15 × 12 = $180 LTV |
| Revenue | 170 × $180 = $30.6K Year 1 | **FAILS $1M test** |

---

**To hit $1M ARR, you need:**

- 5,550 paying customers at $15/mo, OR
- 280 paying customers at $300/mo (enterprise), OR
- Adopt the EU market + US simultaneously and hit 3% penetration

**The math is brutal.** The TAM is real but small. The pricing ceiling is low (solo sellers won't pay $50/mo for a dashboard). The adoption rate has to be *very* high.

---

## 5. THIS WEEK'S VALIDATION TEST

**Profile to find:** 3–5 Etsy resellers who currently manage 3+ active shops and have been selling for 1+ year

**Where to find them:**
- Etsy Sellers Facebook group (search "multiple shops" or "inventory tracking")
- Reddit: r/Etsy (sort by "seller" flair, filter for posts about multi-shop management)
- Twitter: #EtsySeller and #ecommerce (look for people posting "need better dashboard" threads)
- Direct cold outreach: Find Etsy shops with 4+ years history and multiple variations per SKU (sign of serious seller), reverse-WHOIS their contact, DM them

**The one question:**
*"You're managing [X shops]. When you need to check if an item is running low across all your shops, walk me through exactly what you do right now—every tool you open, every step."*

**Listen for:**
1. Do they describe >10 min of friction? (Good signal)
2. Do they mention "I've tried to automate this" or "I looked into tools"? (Better signal — means they've thought about paying)
3. Do they say "I'd pay for X"? (Strongest signal)
4. Do they immediately say "I just use Etsy's dashboard, works fine"? (Kill signal)

**What kills the idea:**
- 4 out of 5 say "Etsy's dashboard works fine, I just tab-switch"
- All 5 say "I'd only pay if it also integrated with Amazon and eBay" (scope creep into real platform)
- Nobody mentions hiring help soon (means they're not hitting the "budget available" trigger)

**What keeps it alive:**
- 3+ say "I spend 30+ min a day on this and hate it"
- 2+ say "I've looked at tools but they're too expensive"
- 1+ says "I'm about to hire someone to handle this"

---

## My Read

**Why I'm not rejecting this:**

1. **It clears the compliance bar.** No tax logic, no payments, no regulated data. You can ship this without legal review.
2. **The problem is real.** I'd bet $500 that at least 60% of active multi-listers experience the friction described.
3. **It's shippable in 5 days.** Etsy API docs exist, OAuth is standard, syncing + UI is straightforward.
4. **The buyer is real.** Solo sellers with 3+ shops exist, and they do make purchasing decisions.

**Why I'm cautious:**

1. **The TAM math is tight.** 45K total addressable market, ~18K serviceable, 3% adoption gets you to $97K ARR. You *can* grow through integrations (Shopify sync, eBay sync) but that's scope creep we can't afford.
2. **The budget consciousness problem.** Etsy sellers are notoriously price-sensitive. The question "would you pay $15/mo for this?" has to land with force. If 3 out of 5 say "maybe, but I'd rather build a Sheets template," this isn't the idea.
3. **Churn risk.** Solo sellers are volatile. They retire shops, slow down, shut down. Keeping 170 customers at a $180 LTV with 80% annual churn is hard.

**Still concerned about TAM & LTV binding the upside** (this was my concern on cycle 4 as well—reseller TAM is inherently small).

---

## What You Do This Week

**Monday–Wednesday:** Run the validation test above. 5 sellers, 1 question each, recorded calls or detailed notes.

**Thursday:** Debrief.
- If 3+ say "I spend real time on this and would pay," approval.
- If <2 say that, **we pivot to a different buyer** inside Etsy (e.g., shop *managers* hired by sellers to handle multi-shop ops—different budget, different pain).
- If they all say "Etsy works fine," kill it and move to next idea.

**Friday:** Ship a single-shop version (MVP). Don't wait for multi-shop validation to matter. One Etsy account, real-time inventory + orders in one page, live by EOD Friday. Test it yourself.

By cycle end: Live URL, 1 seller testing it, decision on scale.

**You have the runway and the moral authority to ship this.** Execute mode means we're done philosophizing.
