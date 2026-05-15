# Etsy Dashboard — Quick Start Guide

Welcome! This dashboard helps you track inventory and orders from your Etsy shop in one place.

## What You'll Need

1. **An Etsy shop** with at least one active listing
2. **A web browser** — Chrome, Firefox, or Safari work great

---

## How to Connect Your Shop

### Step 1: Visit the Dashboard

1. Go to **[http://187.124.22.3:3000](http://187.124.22.3:3000)**
2. Click **"Connect Your Etsy Shop"**

### Step 2: Authorize the Dashboard

You'll be redirected to Etsy to approve access:

1. **Sign in to your Etsy account** if you're not already logged in
2. Review the permissions:
   - ✅ View your shop information
   - ✅ View your active listings (inventory)
   - ✅ View your orders and transactions
3. Click **"Allow Access"**
4. You'll be redirected back to the dashboard

**That's it!** The dashboard will automatically load your inventory and recent orders.

---

## What You Can Do

### 📦 View Inventory
- See all your active listings with current stock levels
- **Low stock alerts:** Items with less than 5 units are highlighted in yellow
- Sorted by quantity (lowest stock first) so you know what needs restocking

### 📋 View Recent Orders
- See your most recent orders (last 30 days)
- Includes order ID, item name, quantity, and order status
- Sorted by date (newest first)

### 🔄 Sync Your Data
- Click **"Sync Now"** to refresh your inventory and orders from Etsy
- The dashboard fetches the latest data from Etsy each time you sync
- **Note:** Etsy limits API calls, so wait at least 5 minutes between syncs

### 📊 Export to CSV
- Click **"Export CSV"** to download your inventory as a spreadsheet
- File name format: `inventory-YourShopName-2026-05-15.csv`
- Open in Excel, Google Sheets, or any spreadsheet tool
- Perfect for creating purchase orders or sharing with suppliers

---

## Troubleshooting

### "Authorization Failed" Error
- Make sure you're signed in to the correct Etsy account
- Try clearing your browser cookies and reconnecting
- Contact support if the issue persists

### Not Seeing All Your Listings
- Only **Active** listings appear in the dashboard
- Drafts, expired, and sold-out listings are not shown
- Make sure your listings are published on Etsy

### Orders Are Missing
- The dashboard shows orders from the **last 30 days only**
- Older orders aren't fetched to keep the dashboard fast
- If you need historical data, use Etsy's native reporting tools

### "Rate Limit Exceeded" Error
- Etsy limits how often we can fetch your data
- Wait **5 minutes** before clicking "Sync Now" again
- The dashboard respects Etsy's API limits to keep your account safe

### Connection Expired
- OAuth tokens expire after a period of time
- If you see "Please reconnect your shop," just click the button and authorize again
- Your data is safe and will reload once reconnected

---

## Privacy & Security

- **Your Etsy credentials are never stored** — authentication uses Etsy's secure OAuth system
- **Access tokens are encrypted** and stored securely in our database
- **We never modify your shop data** — this dashboard is read-only
- **No third parties** — your shop data stays between you, this dashboard, and Etsy

---

## Need Help or Have Feedback?

We're actively improving the dashboard based on seller feedback!

**Send us a message:**
- 📧 Email: [feedback@innovaine.com](mailto:feedback@innovaine.com)
- 💬 Or click the **"Send Feedback"** link at the bottom of the dashboard

Tell us:
- What's working well?
- What's confusing or broken?
- What features would make your life easier?

**Thank you for using the dashboard!** 🙏

---

## For Developers: Local Setup

If you're running this dashboard locally, you'll need to set up Etsy OAuth credentials:

### 1. Create an Etsy App

1. Go to **[Etsy Developer Portal](https://www.etsy.com/developers/your-apps)**
2. Click **"Create a New App"**
3. Fill in:
   - **App Name:** `My Shop Dashboard (Dev)`
   - **Description:** `Local development of inventory dashboard`
   - **Callback URL:** `http://localhost:3000/api/auth/callback`
4. Click **"Read Terms and Create App"**
5. Copy your **Keystring** and **Shared Secret**

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://etsy_user:etsy_pass@localhost:5432/etsy_dashboard"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
ETSY_CLIENT_ID="your_keystring_here"
ETSY_CLIENT_SECRET="your_shared_secret_here"
ETSY_API_KEY="your_keystring_here"
```

### 3. Run the App

```bash
npm install
npx prisma migrate deploy
npm run dev
```

Visit `http://localhost:3000` and click "Connect Your Etsy Shop" to test the OAuth flow.
