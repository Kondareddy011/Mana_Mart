# 🌾 Mana Grocery Hub — Multi-City Community Bulk Buying Platform

A working full-stack business MVP for **Mana Grocery Hub (మన గ్రోసరీ హబ్)**. This platform enables apartment families and gated communities across **Hyderabad, Vijayawada, Guntur, Visakhapatnam, and Tirupati** to pool their monthly grocery demand, source directly from wholesale mills and mandis (Kurnool rice mills, Guntur mirchi yard, Tenali oil expellers), and receive free consolidated doorstep/lobby delivery while saving 20–25% on every staple.

---

## 🚀 Live Working Ports & Quickstart

| Service | Port / URL | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Web App (Customer Store)** | [http://localhost:3000](http://localhost:3000) | React 19, Vite, Tailwind CSS v4, Lucide | **ONLINE** |
| **Standalone Admin Operations Portal** | [http://localhost:3001](http://localhost:3001) | HTML5, Vanilla CSS, JS, Lucide | **ONLINE** |
| **Backend API & Swagger Docs** | [http://127.0.0.1:8008/docs](http://127.0.0.1:8008/docs) | Python 3.11, FastAPI, SQLAlchemy, SQLite | **ONLINE** |

---

## 🔑 Administrator Credentials

- **Admin Email**: `admin@groceryhub.in`
- **Password**: `Vijayawada2026!`

---

## 🌟 Key Features

### 🛒 1. Customer Website (Apartment Residents)
- **Multi-City Society Selector with City Filters**: Pre-configured with prominent gated societies across multiple cities:
  - **Hyderabad**: *My Home Bhooja (HITEC City)*, *Aparna Sarovar Zenith (Nallagandla)*, *Rainbow Vistas Rockgarden (Moosapet)*
  - **Vijayawada**: *Trendset Winz (Benz Circle)*, *Amaravati Heights (Tadigadapa)*, *Lanco Hills Enclave (Gollapudi)*, *Sri Krishna Grandeur (Kanuru)*
  - **Guntur**: *Prakruthi Enclave (Koretipadu)*, *Lotus Palms (Lakshmipuram)*
  - **Visakhapatnam**: *Sea Breeze Enclave (MVP Colony)*, *Hill Crest Towers (Rushikonda)*
  - **Tirupati**: *Sapthagiri Residency (Korlagunta)*
  - *Ability for any resident in any city to propose a new apartment society!*
  - *Lanco Hills Enclave (Gollapudi Bypass)*
  - *Sri Krishna Grandeur (Kanuru / Auto Nagar)*
  - *Bhavani Residency (Bhavanipuram / MG Road)*
  - *Ability for any resident to propose a new Vijayawada society!*
- **Live Monthly Savings Calculator**: Interactive spend slider calculating instant monthly and annual family savings (~22% savings).
- **1-Click Monthly Andhra Family Baskets**:
  - *Couple & Small Family Basket (2-3 Members)*
  - *Standard Andhra Family Mega Basket (4-5 Members)*
  - *Healthy Living & Joint Family Basket (Millets, Cold-pressed Oils & Dry fruits)*
- **Grocery Catalogue with Bilingual Info**:
  - Categories: Rice & Millets, Dals & Pulses, Cooking Oils & Ghee, Spices & Masalas, Flours & Atta, Dry Fruits, Household Bulk.
  - English & Telugu staple names (e.g., *కర్నూలు సోనా మసూరి బియ్యం*, *గుంటూరు కంది పప్పు*).
  - Bulk pack sizes: 25 kg bags, 10 kg bags, 5 Litre tins, 5 kg pouches.
- **Slide-over Cart Drawer**: Live weight calculation (kg), retail MRP comparison, and free bulk delivery milestone.
- **Streamlined Checkout**: Flat number, tower block, resident contact, and batch delivery confirmation.
- **Verified Lean Payment System**:
  - Dynamic QR code generation for UPI apps (GPay, PhonePe, Paytm, BHIM).
  - 12-digit UTR reference input.
  - Cash / UPI on Delivery Day toggle.
- **Order Tracking (5-Stage Visual Progress Timeline)**:
  1. *Order Placed*
  2. *Payment Confirmed*
  3. *Mandi Procurement Finalized*
  4. *Packed for Household*
  5. *Delivered to Apartment Lobby*

---

### 🛡️ 2. Admin & Procurement Hub
- **Combined Demand Aggregator (Wholesale Procurement Sheet)**:
  - Automatically sums up exact quantities across all resident orders (e.g. *Total 25kg Rice bags: 48 bags = 1,200 kg*, *Freedom 5L Oil: 35 cans*).
  - Calculates wholesale mandi purchase cost vs. collected retail revenue to show Hub gross margin.
  - **1-Click Print Mandi Purchase Order** & **Export CSV** for supplier negotiation.
- **Household Packing Lists**:
  - Flat-by-flat assembly slips grouped by apartment society.
  - Interactive checkboxes for packing staff to tick off groceries as they pack each household's carton.
  - Printable delivery slips.
- **Orders Lifecycle & Status Manager**:
  - Real-time status updater (*ORDER_PLACED* ➔ *PAYMENT_CONFIRMED* ➔ *SUPPLIER_ORDER_FINALIZED* ➔ *HUB_PACKED* ➔ *DELIVERED*).
  - Instant UPI payment verification.
- **Products & Mandi Pricing Manager**:
  - In-place price and mandi cost editing.
  - Real-time margin % calculator.
  - Add new products modal.
- **Batches & Societies Scheduler**:
  - Manage monthly batch cutoff dates and target delivery schedules.

---

### 🌐 3. English & Telugu Bilingual Support
- Instant bilingual toggle `[ English | తెలుగు ]` in the navbar.
- High-fidelity Telugu localization for UI strings, savings calculators, Telugu staple names (e.g. *కర్నూలు సోనా మసూరి బియ్యం*, *గుంటూరు ఎండు మిర్చి*, *తెనాలి వేరుశనగ నూనె*), and checkout terms.

---

### 🎨 4. Real-Time Design Theme Switcher
Switch between 3 curated design styles instantly from the top header navbar:
1. **Fresh Green & Crisp White** *(Default)*: Clean, organic, farm-fresh grocery aesthetic.
2. **Dark Emerald & Cream**: Luxury artisanal bulk buying club with gold/amber accents.
3. **Friendly & Colorful**: Warm family-focused saffron and orange palette.

---

## 🛠️ Project Structure

```
community grossary/
├── Admin/                      # 🛡️ DEDICATED STANDALONE ADMIN & MANDI PROCUREMENT PORTAL (Port 3001)
│   ├── index.html              # Standalone Admin Portal SPA (Zero-install option)
│   ├── admin.js                # State manager, live API bridge to 8008 & CSV exporter
│   ├── styles.css              # Custom styling, stage badges & print stylesheets
│   ├── package.json            # Node server scripts (npm start -> port 3001)
│   └── README.md               # Admin operations documentation
├── backend/                    # ⚙️ FASTAPI BACKEND & ORM (Port 8008)
│   ├── app/
│   │   ├── config.py           # Configuration & credentials
│   │   ├── database.py         # SQLAlchemy engine & session
│   │   ├── models.py           # DB models (Apartments, Batches, Products, Orders, Items)
│   │   ├── schemas.py          # Pydantic v2 validation & DTOs
│   │   ├── seed_data.py        # Vijayawada realistic seed staples & sample orders
│   │   ├── main.py             # FastAPI app with CORS & router mounting
│   │   └── routers/
│   │       ├── products.py     # Product & Category endpoints
│   │       ├── apartments.py   # Vijayawada societies endpoints
│   │       ├── batches.py      # Delivery batches scheduling
│   │       ├── orders.py       # Order placement & tracking
│   │       ├── admin.py        # Combined demand aggregator & packing lists
│   │       └── auth.py         # Admin & resident auth
│   ├── run_server.py           # Server runner on port 8008
│   └── requirements.txt        # Frozen Python dependencies
├── frontend/                   # 🛒 PURE RESIDENT CUSTOMER STOREFRONT (Port 3000)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, HeroBanner, ProductCard, CartDrawer, etc.
│   │   ├── context/            # CartContext, ThemeContext, LanguageContext
│   │   ├── pages/              # HomePage, CataloguePage, CheckoutPage, OrderTrackingPage
│   │   ├── services/api.js     # Centralized REST API client
│   │   ├── index.css           # Tailwind CSS v4, theme tokens & glassmorphism
│   │   └── App.jsx             # Customer storefront router & basket state
│   ├── vite.config.js          # Vite configuration with API proxy to port 8008
│   └── package.json            # React 19, Lucide, Tailwind v4
└── README.md
```

---

## 💻 Manual Commands to Run

### Backend (FastAPI):
```powershell
cd "backend"
.\.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8008 --reload
```

### Frontend (React + Vite):
```powershell
cd "frontend"
npm run dev -- --host 127.0.0.1 --port 3000
```
