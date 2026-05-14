# Backend Validation Checklist — Order & Inventory Dashboard
**By EOD Day 12, answer these. If any is "no," flag immediately.**

## Etsy API Integration
- [ ] Can a user input a valid Etsy API key on `/auth` and get redirected to `/dashboard`?
- [ ] Does the session persist after page refresh? (check localStorage / cookie)
- [ ] Can you view the network tab and see `/api/sync` being called?

## Live Data Sync
- [ ] Does `/api/sync` return HTTP 200 with a timestamp?
- [ ] Does `/api/orders` return a JSON array with at least 2 real orders from the connected Etsy account?
  - Required fields: `id`, `customer_name`, `total`, `status`, `date`, `items_count`
- [ ] Does `/api/inventory` return a JSON array with at least 3 real listings from the connected Etsy account?
  - Required fields: `id`, `title`, `sku`, `quantity`, `status`

## Dashboard Display
- [ ] Does the dashboard load without 404 or 500 errors?
- [ ] Do orders appear in the table within 3 seconds of page load?
- [ ] Do inventory items appear in the table within 3 seconds of page load?
- [ ] Can you click "Manual Sync Now" and see the timestamp update?

## CSV Export
- [ ] Does "Export Orders" button produce a downloadable file?
- [ ] Does the CSV contain at least the columns: Order ID, Customer, Total, Status, Date?
- [ ] Does "Export Inventory" button produce a downloadable file?
- [ ] Does the CSV contain at least the columns: Title, SKU, Current Stock, Status?

## Error Handling
- [ ] If sync fails, does an error banner appear (not a blank page or silent fail)?
- [ ] If you disconnect your Etsy account and refresh, are you redirected to auth?

## If any of the above is "no":
- Document the exact error (screenshot, console error, network response)
- Flag as blocker before EOD
- Chiara pauses design work on detail layers until backend is live

---

**Owner:** Kenji (PM) — run this and report back. Use this to unblock Chiara's next design round.