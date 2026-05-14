# Etsy Dashboard — Quick Start Guide

Welcome! This dashboard helps you track inventory and orders from your Etsy shop in one place.

## What You'll Need

1. **Your Etsy API Key** — Follow the steps below to get one (it takes about 5 minutes)
2. **A web browser** — Chrome, Firefox, or Safari work great

---

## Step 1: Get Your Etsy API Key

To connect your shop, you need an Etsy API key (also called an "OAuth token").

### How to Create an Etsy API Key:

1. Go to **[Etsy Developer Portal](https://www.etsy.com/developers/your-apps)**
2. Click **"Create a New App"**
3. Fill in the form:
   - **App Name:** `My Shop Dashboard` (or whatever you like)
   - **App Description:** `Personal dashboard for inventory and orders`
   - **Intended Use:** Select **"I want to use Etsy's API to manage my shop"**
4. Click **"Read Terms and Create App"**
5. Once your app is created, you'll see:
   - **Keystring** (this is your API key — copy it!)
   - **Shared Secret** (you don't need this for now)
6. **Important:** Click **"Set Permissions"** and enable:
   - ✅ Read listings (inventory)
   - ✅ Read orders
   - Click **Save**

**Copy your Keystring** — you'll paste it into the dashboard in the next step.

---

## Step 2: Connect Your Shop to the Dashboard

1. Open the dashboard: **[http://187.124.22.3:3000](http://187.124.22.3:3000)**
2. Paste your **Etsy API Key** (the Keystring from Step 1)
3. Click **"Connect Shop"**
4. Wait a few seconds while the dashboard loads your inventory and recent orders

**That's it!** You're ready to use the dashboard.

---

## What You Can Do

### 📦 View Inventory
- See all your active listings with current stock levels
- **Low stock alerts:** Items with less than 5 units are highlighted in yellow

### 📋 View Recent Orders
- See your most recent orders (last 30 days)
- Includes order ID, item, quantity, and status

### 🔄 Sync Your Data
- Click **"Sync Now"** to refresh your inventory and orders from Etsy
- The dashboard automatically syncs every 30 minutes

### 📊 Export to CSV
- Click **"Export CSV"** to download your inventory as a spreadsheet
- File name format: `inventory-YourShopName-2026-05-15.csv`
- Open in Excel, Google Sheets, or any spreadsheet tool

---

## Troubleshooting

### "Invalid API Key" Error
- Double-check you copied the **Keystring** (not the Shared Secret)
- Make sure you enabled **Read listings** and **Read orders** permissions in the Etsy Developer Portal
- Try creating a fresh API key

### Not Seeing All Your Listings
- Make sure your listings are set to **Active** in Etsy
- Drafts and expired listings won't show up

### Orders Are Missing
- The dashboard shows orders from the last 30 days only
- Older orders aren't fetched to keep things fast

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

**Thank you for testing the dashboard!** 🙏
