# Day 11 — Risk watch: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Hiroshi (Devil's Advocate)
- **Cycle:** 20
- **Saved:** 15/05/2026, 12:16:40 AM

---

# ANALYSIS — Day 11, Cycle 18

I'm reading this setup cold: we've shipped something *live*, passed code review, containers are running, APIs responding. It's deployed. The prompt asks me to write a risk register—not to re-litigate whether this product should exist (I already blocked it in cycle 4; that horse is dead).

But I need to state plainly what I'm seeing, because it matters for what risks actually bite us today.

---

## What I notice

**No customer signal yet.** Not "weak signal"—*none*. We're day 11. The code review from day 10 says "no new code," only verification prose. The app is running. But there is no evidence anywhere that an actual Etsy seller has logged in, connected their shops, or looked at their inventory.

That's not unusual for day 11. But it's the fact that shapes every risk below.

**The repo is messy in ways that block iteration.** 30 files at root, five server-run logs from May 14 that are diagnostics noise, test results scattered across day-02 through day-10 with gaps. This isn't a blocker—the app works—but it tells me the cycle has been firefighting, not building. I see no `package.json`, no `docker-compose.yml` reference, no `.env.example`. Deploying and verifying "it runs" is not the same as shipping something a human can clone and run in 90 seconds.

**We're at execution fatigue 80/100.** This is a warning light. The team's been shipping six cycles in a row (12–18) with zero breaks. That's the texture I'm reading: fast enough to deploy, tight enough that nobody documented the setup or cleaned the repo. Burnout compounds risk. I know this from my father's shop floor: when people are tired, they skip the step that catches the stupid error.

**Still concerned about the underlying market assumption:** Etsy sellers with 2–5 shops don't solve this problem by building a dashboard—they solve it by consolidating to one shop or abandoning the marginal ones. I flagged this in cycle 4. Nothing in the codebase changes that observation. But that's a *product* risk, not an *execution* risk, and the execution has moved past my objection.

---

## The risk register

What *actually* kills us in the next 48 hours if we ignore it?

```markdown
# Day 11 — Risks

| # | Risk | Probability | Impact | Mitigation today | Earliest signal |
|---|---|---|---|---|---|
| 1 | **Etsy API auth flow silent-fails on first user.** Auth route exists; no test coverage shows a real seller connecting a real shop. We've validated the code shape, not the Etsy handshake. | High | High | Pull the Etsy API docs; manually test OAuth flow with a throwaway shop account today. If it fails, we discover it from a user report (bad). If it succeeds, we log it and move on. | One seller actually lands on /auth, clicks "Connect Shop," and either sees a working dashboard or a clear error message by EOD tomorrow. |
| 2 | **No onboarding for the first user—they land and have no shops connected.** The dashboard assumes shops are already in the DB. First user sees an empty state or a crash. | Med | High | Write a 30-second "connect your shop" prompt that appears when `shops.length === 0`. One sentence, one button. Ship it tomorrow. | A real user lands, sees a clear next step, and either connects or bounces with intent (not confusion). |
| 3 | **Repo cleanliness will slow troubleshooting if something breaks in production.** 30 files at root, orphaned server-run logs, no docker-compose.yml reference, no .env.example. If the Etsy API rate-limits or the sync breaks, we debug in chaos. | Med | Med | Spend 30 minutes today: delete server-run logs, move test-results into /docs, add docker-compose.yml and .env.example to repo root. This is not a feature; it's a triage tax. | Deployment instructions are clear enough that a new hire could spin up the stack in under 5 minutes. |
| 4 | **Execution fatigue is at 80/100. The team has shipped six cycles straight.** Tire = mistakes. Mistakes under time pressure = hidden bugs that customers find first. | High | Med | Do not assign new features today. Instead: declare day 12 a *stabilization day*. One engineer owns "make the onboarding work end-to-end with a real Etsy seller." One engineer owns "repo hygiene + deployment docs." Both ship one PR each by EOD. Release tension, not features. | By end of day 12, morale moves from 87 to 90, and the team can describe the product to a friend in one sentence without fumbling. |
| 5 | **No revenue, no paying customer, no clear path to one in next 3 weeks.** We have 8.5 months runway. This product is unproven. If we don't see *intent to pay* (not money, intent) by day 21, we're bleeding runway on a hypothesis. | High | High | By day 13, one engineer reaches out to 5 Etsy sellers directly (not cold—check Twitter, ProductHunt, Etsy forums, ask for warm intros). Ask: "If this worked perfectly, would you use it? Would you pay?" Capture their unfiltered answer. Ship a link. | One seller says yes and actually logs in. We don't need money yet; we need a human to care. |

**Top concern today:** Etsy API integration is untested in the real world. We've validated the code; we haven't validated the customer journey.

**What kills us today if we ignore it:** A user lands, tries to connect their shop, hits a silent failure or a confusing error, and bounces. We don't hear about it (they don't report). We assume product-market fit is the problem when the real problem is a broken onboarding. Three weeks later, we've wasted time and morale on a feature nobody got to use.
```

---

## What I want to say directly

**This is a shipping-fast product with zero customer proof.** That's not a failure—it's the necessary intermediate state between cycle 18 and finding product-market fit. But it means every risk is *real* in a way that's different from a product with ten users. We don't know if the Etsy API integration is correct because nobody has tried it yet.

My recommendation:
- **Day 12:** Stabilization + one real test. Have an engineer (or two) actually sign up with a real Etsy seller account and walk through the flow. If the auth breaks, fix it in hours, not later. If onboarding is confusing, fix it in hours.
- **Day 13:** Customer signal sprint. Reach out, show the deployed URL, watch them click. Capture their reaction.
- **By day 21:** Either we see intent to pay (even if they don't pay yet) or we kill this and move to the next hypothesis.

I'm not re-litigating the product. But I am saying: we shipped it fast, which is good. Now we need to *prove* it works with a real human before we optimize it.

---

### `day-11-risks.md`
See above — embedded in the response.

---

PROGRESS:
- Round: 1 (Hiroshi, Day 11 risk register + analysis)
- Scope completion (this role for TODAY): 92%
- Remaining for this role:
  - None — risk register is complete and specific.
- Recommendation: next_step
