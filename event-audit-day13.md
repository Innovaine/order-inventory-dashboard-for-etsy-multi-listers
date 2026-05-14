# Event Log Audit — Day 13 Scaling Phase

## Methodology
- Pull events from POST /api/events for last 24h (2026-05-13 00:00 to 2026-05-14 23:59)
- Parse by event type: page_view, button_click, form_submit, sync_trigger, export_start, export_complete
- Identify: drop-off steps, rage clicks, repeated actions (sign of confusion), time-to-action
- If < 3 live sellers in logs, note that and schedule contact for day 14 testing

## Run one live seller through onboarding TODAY
- Owner will provide contact (or we pull from Etsy validation list)
- Ask them to: auth → view dashboard → export a CSV → close
- Watch event log fire in real-time on a split screen
- Note: where do they hesitate? what buttons do they click twice? do they read the onboarding tour or skip it?

## Questions to answer by EOD day 13
1. **Auth friction**: Is signup/Etsy API key entry causing bounce?
2. **Empty dashboard**: Are sellers seeing "0 orders" and leaving, or does empty-state guidance help?
3. **Export confusion**: Do sellers find the CSV button or do they search for "download"?
4. **Tour effectiveness**: Did onboarding-tour.html reduce bounce, or did they skip it entirely?
5. **Unknown unknowns**: What action did we NOT instrument that a seller tried to do?

## Next artifact (day 14)
- If event data shows friction at step X, produce a redesign of that step
- If no friction found, move to multi-seller dashboard hypothesis (expand scope)
- If friction is at a backend layer (API latency, sync timeout), escalate to Anil with specific event sequence

---

## Blocking: CAN'T COMPLETE THIS AUDIT WITHOUT
- Access to event logs from yesterday's deploy (ask Anil for Prisma query or endpoint)
- One live seller contact for real-time walkthrough (ask Søren for validation list)