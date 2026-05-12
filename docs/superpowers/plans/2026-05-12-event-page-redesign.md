# Event Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/[locale]/events/[slug]` page so the desktop and mobile experience visually matches the supplied Hafla+ mockups as closely as possible while preserving the current MVP data/state hooks.

**Architecture:** Replace the current event-details composition with a mockup-driven layout made of focused sections: media rail, title/meta block, countdown card, perforated ticket module, seating map, utility sidebar, related-event cards, and mobile bottom navigation shell. Keep the current mock store for ticket quantities and seat selection, but rewrite the UI layer around it to prioritize pixel fidelity.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Zustand store, local mock data

---

### Task 1: Rebuild the Event Route Composition

**Files:**
- Modify: `src/app/[locale]/events/[slug]/page.tsx`
- Test: `npm run build`

- [ ] **Step 1: Replace the current page composition with a mockup-driven desktop/mobile layout scaffold**

Create a new route composition that renders:

```tsx
<Header />
<main>
  <div className="ambient background" />
  <section className="hero and meta block" />
  <section className="ticket block" />
  <section className="seat map block" />
  <section className="description/timeline/faq" />
  <aside className="desktop utility sidebar" />
  <section className="related events" />
</main>
<MobileStickyFooter />
<MobileBottomNav />
<Footer />
```

- [ ] **Step 2: Run the production build to verify the scaffold compiles**

Run: `npm run build`
Expected: successful production build with no TypeScript errors

- [ ] **Step 3: Commit the route composition rewrite**

```bash
git add src/app/[locale]/events/[slug]/page.tsx
git commit -m "feat: rebuild event page layout scaffold"
```

### Task 2: Rebuild the Hero and Meta Presentation

**Files:**
- Modify: `src/components/event/details/HeroCarousel.tsx`
- Modify: `src/components/layout/Header.tsx`
- Test: `npm run build`

- [ ] **Step 1: Rewrite the hero carousel to match the mockup**

Implement:

```tsx
<div className="desktop side previews + main hero card">
  <button aria-label="previous slide" />
  <button aria-label="next slide" />
  <button aria-label="play video preview" />
  <div className="pills for popularity/availability" />
  <div className="dots and slide count" />
</div>
```

- [ ] **Step 2: Adjust the header controls to align with the mockup**

Implement action chips for language, save reminder, share, and back navigation with layout variants that work on desktop and mobile.

- [ ] **Step 3: Run the build to verify the hero/header rewrite**

Run: `npm run build`
Expected: successful production build

- [ ] **Step 4: Commit the hero/meta work**

```bash
git add src/components/event/details/HeroCarousel.tsx src/components/layout/Header.tsx
git commit -m "feat: restyle event hero and header controls"
```

### Task 3: Rebuild the Ticket Module Into the Perforated Split Ticket

**Files:**
- Modify: `src/components/event/details/TicketModule.tsx`
- Test: `npm run build`

- [ ] **Step 1: Rewrite the ticket module layout around the existing cart state**

Implement:

```tsx
<section className="dark perforated ticket shell">
  <div className="left pane ticket rows with steppers" />
  <div className="center dashed divider" />
  <div className="right pane barcode summary CTA payments" />
</section>
```

- [ ] **Step 2: Keep existing interactive behavior while restyling**

Preserve:

```tsx
const { selectedTickets, setTicketQuantity } = useCartStore();
const totalQuantity = Object.values(selectedTickets).reduce(...);
const finalTotal = subtotal + serviceFee;
```

- [ ] **Step 3: Run the build to verify ticket-module changes**

Run: `npm run build`
Expected: successful production build

- [ ] **Step 4: Commit the ticket-module rewrite**

```bash
git add src/components/event/details/TicketModule.tsx
git commit -m "feat: match event ticket module mockup"
```

### Task 4: Rebuild Seating Selection to Match the Mockup

**Files:**
- Modify: `src/components/event/details/SeatingSelection.tsx`
- Test: `npm run build`

- [ ] **Step 1: Replace the current generated-seat presentation with a denser mockup-style seat map**

Implement:

```tsx
<section className="white rounded seat surface">
  <div className="legend row" />
  <div className="stage label" />
  <div className="multi-block seat grid" />
  <aside className="desktop selected seat + filters" />
</section>
```

- [ ] **Step 2: Preserve selected-seat behavior and add compact seat detail summary**

Preserve:

```tsx
const { selectedTickets, selectedSeats, toggleSeat } = useCartStore();
```

- [ ] **Step 3: Run the build to verify seating changes**

Run: `npm run build`
Expected: successful production build

- [ ] **Step 4: Commit the seating redesign**

```bash
git add src/components/event/details/SeatingSelection.tsx
git commit -m "feat: redesign seating section to match reference"
```

### Task 5: Rebuild the Utility Sidebar and Mobile Footer/Nav Shell

**Files:**
- Modify: `src/components/event/details/DesktopSidebar.tsx`
- Modify: `src/components/event/details/MobileStickyFooter.tsx`
- Create: `src/components/event/details/MobileBottomNav.tsx`
- Test: `npm run build`

- [ ] **Step 1: Rewrite the desktop sidebar into stacked compact utility cards**

Implement summary, map, calendar, WhatsApp, trust, and organizer cards styled like the reference.

- [ ] **Step 2: Rewrite the mobile sticky purchase bar to match the mockup**

Implement compact summary, quantity preview, total, and CTA bar.

- [ ] **Step 3: Add a presentational mobile bottom nav shell**

Implement nav items:

```tsx
[
  "الرئيسية",
  "الفعاليات",
  "الدعم",
  "حسابي",
  "إمكانية الوصول"
]
```

- [ ] **Step 4: Run the build to verify sidebar/mobile shell changes**

Run: `npm run build`
Expected: successful production build

- [ ] **Step 5: Commit the sidebar and mobile-shell work**

```bash
git add src/components/event/details/DesktopSidebar.tsx src/components/event/details/MobileStickyFooter.tsx src/components/event/details/MobileBottomNav.tsx
git commit -m "feat: add mockup-style utility sidebar and mobile nav"
```

### Task 6: Restyle Related Event Cards and Finish the Page

**Files:**
- Modify: `src/components/event/EventCard.tsx`
- Modify: `src/app/[locale]/events/[slug]/page.tsx`
- Test: `npm run build`
- Test: `npm run lint`

- [ ] **Step 1: Rework related-event cards to visually match the reference grid**

Implement image-first, denser metadata, tighter actions, and premium radius/shadow treatment.

- [ ] **Step 2: Finalize ambient background, section spacing, and mobile ordering**

Ensure the route composition aligns desktop and mobile layout ordering with the supplied mockups.

- [ ] **Step 3: Run final verification**

Run: `npm run build`
Expected: successful production build

Run: `npm run lint`
Expected: no new lint errors introduced by the redesign

- [ ] **Step 4: Commit the final polish**

```bash
git add src/components/event/EventCard.tsx src/app/[locale]/events/[slug]/page.tsx
git commit -m "feat: finish event page redesign polish"
```

### Task 7: Visual QA Against the Mockups

**Files:**
- Modify: any of the files above as needed after QA
- Test: local browser check

- [ ] **Step 1: Run the local app and inspect the event page in desktop and mobile widths**

Run:

```bash
npm run dev
```

Open the event route and compare to the supplied references at desktop and mobile widths.

- [ ] **Step 2: Tweak spacing, colors, shadows, and component proportions until the page is visually close**

Focus on:

```text
hero proportions
headline scale
ticket slab silhouette
seat map density
sidebar card spacing
mobile bottom navigation fit
```

- [ ] **Step 3: Re-run verification after QA changes**

Run: `npm run build`
Expected: successful production build

Run: `npm run lint`
Expected: lint output unchanged or improved

- [ ] **Step 4: Commit the QA adjustments**

```bash
git add src/app/[locale]/events/[slug]/page.tsx src/components/event/details/HeroCarousel.tsx src/components/event/details/TicketModule.tsx src/components/event/details/SeatingSelection.tsx src/components/event/details/DesktopSidebar.tsx src/components/event/details/MobileStickyFooter.tsx src/components/event/details/MobileBottomNav.tsx src/components/event/EventCard.tsx src/components/layout/Header.tsx
git commit -m "style: tune event page to match design references"
```
