# Paul Davis Restoration — York Region (`pauldavisrestoration.ca`)

**Custom Responsive Homepage Redesign Demo**  
Built for **Paul Davis Restoration ("Your YORK REGION First Responder")** — 24/7 Residential & Commercial Property Emergency Restoration across York Region and the Greater Toronto Area.

---

## 1. Business & Brand Overview

- **Business Name:** Paul Davis Restoration — York Region
- **Original Website:** [https://pauldavisrestoration.ca/](https://pauldavisrestoration.ca/)
- **Industry:** 24/7 Emergency Water, Flood, Fire, Smoke, Mold & Property Reconstruction Services
- **24/7 Dispatch Line:** `(647) 494-8481`
- **Email:** `info@pauldavisrestoration.ca`
- **Regional Operations:** `108 Milvan Dr., North York / York Region, ON M9L 1Z6`
- **Core Guarantees:**
  - **24/7/365 Live Availability**
  - **30-Minute Callback Response Guarantee**
  - **4-Hour On-Site Water Extraction Arrival**
  - **IICRC-Certified Restoration Specialists**
  - **Direct Property Insurance Coordination**

---

## 2. Brand Identity & Extracted Color System

| Role | Hex Code | Usage |
| :--- | :--- | :--- |
| **Paul Davis Gold (Primary Accent)** | `#B4975A` | Official brand gold, primary emergency CTAs, SLA highlights |
| **Architectural Carbon Black** | `#231F20` / `#141211` | Hero command canvas, sticky header, dark diagnostic surfaces |
| **Brand Warm Stone / Taupe** | `#887A6F` / `#D2CBC3` | Official tagline tone, secondary metadata & borders |
| **Warm Alabaster Surface** | `#F5F2EB` | Alternating editorial sections & card backgrounds |
| **Emergency Dispatch Signal** | `#C93B2B` | 24/7 live emergency status badge |

---

## 3. Project Structure (GitHub Pages Ready)

```text
pauldavisrestoration.ca/
├── index.html                  # Main responsive homepage (semantic HTML5, noindex demo directive)
├── css/
│   └── style.css               # Mobile-first custom CSS architecture (zero external CSS frameworks)
├── js/
│   └── script.js               # Vanilla ES6+ interactions (mobile drawer, dropdown, service tabs, FAQ, callback brief)
├── assets/
│   ├── logo/                   # Official transparent Paul Davis light/dark logos & SVG favicon
│   ├── images/                 # Original pauldavisrestoration.ca images + custom brand-uniformed visuals (.webp + .jpg)
│   └── icons/                  # Custom architectural SVG restoration icons
├── .nojekyll                   # Disables Jekyll processing for direct static serving on GitHub Pages
└── README.md                   # Project documentation
```

---

## 4. Key Improvements Over Existing Site

1. **Mobile-First Zero-Overflow Architecture:** Engineered from `360px` upward (`360px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, `1440px`) with a dedicated bottom sticky mobile emergency action dock (`Call 24/7` + `Callback`), accessible slide-over navigation drawer, and balanced side gutters.
2. **Immediate 3-Second Value Clarity:** High-authority hero communicating 24/7 York Region dispatch, 30-minute callback guarantee, and 4-hour on-site arrival without clutter.
3. **Preserved Original Assets + Brand-Consistent Field Imagery:** Incorporates all three original `pauldavisrestoration.ca` recovery stage photographs alongside custom documentary-style restoration visuals featuring official Paul Davis uniformed technicians.
4. **Transparent Interactive Callback Brief:** Modernizes the original site's callback timeframe selector (`Now`, `15 Min`, `1 Hour`, `Tomorrow AM/PM`) with honest `mailto:` brief generation—zero fake form submission claims.
5. **Corrected Copy & Accessibility:** Fixes typographical errors present on the legacy page while maintaining semantic heading hierarchy, ARIA controls, keyboard navigation, and `noindex, nofollow` demo protection.

---

## 5. Local Preview & GitHub Pages Deployment

### Local Static Server
```bash
python3 -m http.server 8000
```

### GitHub Pages Setup
1. Open **Settings → Pages** in this GitHub repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the target branch (`main` after merging, or current working branch) and folder **`/ (root)`**, then click **Save**.
