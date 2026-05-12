# Halfa.Plus (Halfa+) MVP

Welcome to the Halfa.Plus MVP ticketing platform. This is a fully functional, mobile-first, and RTL-first application built with Next.js App Router, Tailwind CSS, shadcn/ui, Zustand, and next-intl.

## What was built
We have implemented the complete core user journey for an event ticketing platform tailored for the Israeli-Arab market. The design strictly follows the warm, premium, rounded aesthetic requested, including light/dark theme support.

### Routes Created
- `/[locale]` - Homepage (Hero, Search, Featured events)
- `/[locale]/events` - Events Discovery (Filters, grid)
- `/[locale]/events/[slug]` - Event Details (Hero carousel, dark physical ticket module, reserved seating grid, sticky desktop sidebar, mobile sticky booking footer)
- `/[locale]/checkout` - Checkout Flow (Buyer details, fee breakdown, mock payment)
- `/[locale]/checkout/success` - Order Confirmation
- `/[locale]/tickets` - My Tickets (List of user's valid/used/cancelled tickets)
- `/[locale]/tickets/[id]` - Single Ticket QR View (Includes unique QR code for scanning)
- `/[locale]/check-in` - Staff Check-in Dashboard (Validates ticket code/QR against the Zustand store)
- `/[locale]/organizer` - Organizer Dashboard (Overview, active events, orders)
- `/[locale]/admin` - Platform Admin Dashboard (Stats, audit log)
- `/[locale]/memberships` - Membership Plans placeholder
- `/[locale]/online/[slug]` - Online Event Access (Placeholder logic for streaming access)

## How to run the project
1. Ensure you have Node.js 18+ installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open `http://localhost:3000` in your browser. The default locale is Arabic (`/ar`).

## What is fully working
- Global RTL layout and English/Hebrew ready structure.
- Light/Dark mode toggling.
- Interactive Ticket Selection: Quantity limits, sold-out badging, waitlist mock submission.
- Interactive Seating Selection: Select available seats up to the number of tickets chosen.
- Mock Checkout: Submits order and creates locally persisted tickets.
- Ticket Generation: Uses `qrcode.react` to render visual QRs.
- Check-in Validation: The `/[locale]/check-in` route will validate ticket IDs and accurately mark them as 'used' or reject invalid/already used tickets.
- Local Storage Persistence: Using Zustand `persist`, your cart, generated orders, and ticket statuses remain across page refreshes.

## What is mock/placeholder
- Payment processing (UI placeholders only).
- Database and Auth (handled purely on the client-side via Zustand/localStorage).
- Email/WhatsApp actual delivery.
- Complex backend seating concurrency (handled via mock grid for MVP demonstration).
- Most links on the Organizer and Admin dashboards are placeholders to demonstrate layout and UX.

## Known limitations
- The checkout currently trusts client-side totals.
- Re-hydration mismatch warnings may occasionally occur due to `localStorage` sync with React server-rendering.
- The QR check-in page relies on manual code entry in this MVP build, though the UI supports the flow of scanning.

## Recommended Next Steps
1. **Real Database & ORM:** Integrate Prisma or Drizzle with PostgreSQL/Supabase to replace Zustand local storage.
2. **Real Auth:** Implement NextAuth.js or Clerk for User, Organizer, and Admin roles.
3. **Payment Gateway:** Implement a server-side abstraction for an Israeli payment provider (e.g., Meshulam, Cardcom).
4. **Email/WhatsApp APIs:** Integrate Twilio or similar for real ticket delivery.
5. **Real QR Scanner:** Add a library like `html5-qrcode` to allow staff cameras to directly read the generated tickets.
