# Day 2 — Sales: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Tomás (Salesperson)
- **Cycle:** 9
- **Saved:** 14/05/2026, 3:03:19 PM

---

# PART 1: EMAIL TEMPLATES

### `email-cold-1-etsy-shop-owner-high-volume.txt`
```text
Subject: Your Etsy inventory is costing you time

[Recipient],

I sell on Etsy too. I know the pain: orders come in, you scramble to update inventory across listings, something falls out of sync, a customer buys stock you don't have. Then spreadsheets and manual fixes.

I'm building a dashboard that plugs into your Etsy account and shows you orders + stock in one place. You paste in your API key, refresh takes 30 seconds, and you see what's actually live vs. what's allocated. CSV export if you need it.

No setup, no monthly fee yet (testing with 2–3 sellers first). Just your Etsy account.

If you're moving more than 50 orders a month and managing inventory manually, I'd like to show you what this looks like. Takes 5 minutes to test.

Worth a conversation?

— [Founder]
```

### `email-cold-2-etsy-shop-owner-multi-channel.txt`
```text
Subject: Selling Etsy + elsewhere? This might help

[Recipient],

If you're selling on Etsy AND your own site (or Amazon, or somewhere else), inventory nightmares multiply. Etsy shows one stock level, reality is split across three places.

I'm building a dashboard for Etsy sellers that pulls your live orders and stock. Single source of truth for one shop to start.

I'm looking for 2–3 sellers to test with this week. You'd be one of the first, and you'd tell me what's broken so I can fix it before it matters.

Interested in 15 minutes?

— [Founder]
```

### `email-cold-3-etsy-shop-owner-struggling-growth.txt`
```text
Subject: Scaling your Etsy shop without chaos

[Recipient],

I noticed [Their Shop] is doing solid volume. I also noticed that scaling on Etsy while managing inventory manually is a grinding process—each extra order is one more thing to track by hand.

I'm building a lightweight dashboard that syncs with Etsy and gives you visibility into orders + stock without the spreadsheet friction. No integration with other platforms yet, just making Etsy less painful.

I'm validating with sellers like you this week. If you're open to 10 minutes to see whether this solves a real problem for you, I'd like to try.

— [Founder]
```

### `email-followup.txt`
```text
Subject: Re: [original subject]

Quick follow-up — still think this might be useful for [Their Shop]. No pressure, but if you have 10 minutes this week, I can show you what it looks like live.

Let me know.
```

---

## Outreach log — week 2

**Outbound today:** n/a — no real activity logged  
**Replies:** n/a  
**Live deals:** n/a — no real deals logged  

**Monday's action:** Owner must send at least one of the templates above to a real Etsy seller and log the outcome (reply, no reply, interested, not interested) in sales-log.md by EOD. Target: 5 outreaches this week. At least 1 response by Thursday.

---

## Notes for the owner

**On these templates:**  
I drafted them tight because you're moving fast and trust is fragile with cold outreach. No promises, no "enterprise-grade," no positioning you as a big thing. Just: here's the pain, I built something, you have 10 minutes to see if it's real.

The three personas are: high-volume single-shop (easiest user), multi-channel seller (biggest pain), and growth-stage (positioning you as someone who gets scaling). If one doesn't land by Thursday, we know which angle doesn't work.

**On validation:**  
You're not looking for ten yeses. You're looking for one person who opens it, replies, takes the 10-minute call, and either uses the dashboard or tells you why it's wrong. That person teaches you the next iteration. Two people validating the core loop (load Etsy key → see orders + stock → export CSV) means you move into cycle 5 knowing the MVP actually solves something.

**On timing:**  
Ship the URL by day 3. Don't wait for perfection. As soon as it loads in a browser and connects to Etsy, send these templates. Momentum beats polish.

---

PROGRESS:
- Round: 2
- Scope completion (this role for THIS week): 35%
- Remaining for this role:
  - Owner sends at least one template to a real prospect and logs response
  - Track first 3 replies: capture their feedback on what's broken or missing
  - After MVP ships (day 3), produce 1 outreach update template if early feedback suggests a pivot in positioning
  - Monitor daily: do we have 2–3 sellers willing to validate by end of week?
- Recommendation: keep_working

---

## Round 2

I'm reading this carefully, and I need to push back.

**The templates are done.** Good ones—I know because I wrote them yesterday, and they're tight. High-volume seller, multi-channel seller, struggling-growth seller, plus a follow-up. That's the job you asked for in PART 1. I'm not rewriting them because rewriting cold email is the opposite of momentum. It's procrastination dressed up as iteration.

**But here's the problem:** The owner hasn't sent a single one. The outreach log is empty. And I just watched us ship FIVE cycles of approved ideas that produced zero customer signal because we kept waiting for perfect architecture, perfect feature lists, perfect positioning. Cycles 2 and 3 got blocked at the top. Cycle 4 we unblocked execution mode. Cycles 4 and 5 we actually *approved* things. But we still have no paying customer, no validation loop, nothing except a repo with code.

Now we're on day 2 of a build with a clear mandate: **live URL by day 3, paying customer by week 12.** The engineering team is shipping. The product is shipping. But the sales motion—the thing that proves this actually solves a problem anyone has—is still a draft in a file nobody sent.

**Here's what I'm not going to do:** Write more templates. Write positioning docs. Write buyer personas. Write ideal customer profiles. Write value props. Write discovery questions. That's all noise if the first email never gets opened.

**Here's what I'm actually going to do:**

I'm producing ONE thing: a **sales-activity-log.md** file that the owner needs to fill out by EOD tomorrow. Not suggestions. A real log. Because if I keep drafting things the owner doesn't send, I'm not a salesperson—I'm a consultant who doesn't ship.

---

### `execution/sales-activity-log.md`

```markdown
# Sales Activity Log — Etsy Dashboard (Cycle 5, Week 2)

## Target for this week
- Outbound: 10 cold emails (templates provided)
- Replies: 2+ (reply rate ~20%)
- Calls booked: 1+
- Validation: 1–2 sellers willing to test MVP by EOD Friday

---

## Daily log (owner fills this in)

### Day 2 (Today)
**Emails sent:** [number]  
**Recipients (paste names/shops):**
- [Example: Sarah @ SarahsMinerals]
- [Example: Mike @ VintageWoodCo]

**Replies received:** [number]  
**Follow-ups sent:** [number]

**Notes:**
[What worked? What didn't? Any early signal?]

---

### Day 3
**Emails sent:** [number]  
**Recipients:**
- 
- 

**Replies received:** [number]  
**Follow-ups sent:** [number]  

**Notes:**

---

### Day 4
**Emails sent:** [number]  
**Recipients:**
- 
- 

**Replies received:** [number]  
**Follow-ups sent:** [number]  

**Notes:**

---

### Day 5
**Emails sent:** [number]  
**Recipients:**
- 
- 

**Replies received:** [number]  
**Follow-ups sent:** [number]  

**Notes:**

---

## Validation calls scheduled

| Prospect | Shop name | Call date/time | Status | Outcome |
|----------|-----------|----------------|--------|---------|
| | | | | |
| | | | | |
| | | | | |

---

## Early signal (update as you learn)

**What's working:**  
[Which template gets opens/replies? Which persona responds?]

**What's not:**  
[Dead silence on any angle?]

**Pivot needed?**  
[Do we need to reposition, change subject lines, target different personas?]

---

## Rules
- **Send real emails only.** No test sends, no BCC'd versions, no "I'll send tomorrow." If you sent it, log it.
- **Log names/shops.** Not anonymized. We need to know who to follow up with.
- **Update daily by EOD.** I'll review Friday and decide whether we need new templates or a positioning shift.
- **Target: 2+ replies by Thursday.** If we have zero replies by then, we pivot the email angle and try again Friday.
```

---

## Now: the hard conversation

I know what this looks like. You gave me templates, I'm telling the owner to actually *use* them. That's a cop-out, right? I should keep drafting, keep building the sales infrastructure.

No.

I've watched this company block ideas for three cycles straight. I watched us finally unblock and approve things in cycles 4 and 5. And I'm watching the same paralysis happen in sales: we have good templates, but the owner isn't sending them because there's no external force making it real.

The templates are done. They're good. But they live in a file. Files don't sell things. Emails in inboxes sell things.

**So here's my ask:** The owner needs to pick 10 Etsy sellers *right now*—not tomorrow, not after the MVP ships perfectly, now—and send them email-cold-1 by EOD day 2. Then fill out that log. Then I'll see what actually happens (opens, replies, silence) and we'll iterate on positioning or target persona based on real data, not my guesses.

I'm still low on judgment, and that's a liability. But in a company that moves this fast, judgment matters less than *empirical feedback.* One real "no" teaches me more than ten theoretical personas.

The egg timer is ticking. Day 3 for the URL. Week 12 for paying customer. Day 2 for the first real email to land in a seller's inbox.

---

PROGRESS:
- Round: 2
- Scope completion (this role for THIS week): 55%
- Remaining for this role:
  - Owner sends 10 cold emails from templates and logs daily in `execution/sales-activity-log.md`
  - First validation call booked (call by Thursday)
  - Track replies and early signal; iterate templates if response rate is <15%
  - If 2+ sellers validate MVP by Friday, move to onboarding cycle 5
- Recommendation: next_step (owner must execute before I draft more)
