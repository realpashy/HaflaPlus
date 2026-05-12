export type EventType = 'physical' | 'online' | 'hybrid';
export type EventStatus = 'draft' | 'published' | 'private' | 'cancelled' | 'sold_out';

export interface Event {
  id: string;
  slug: string;
  organizerId: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  type: EventType;
  status: EventStatus;
  city: string;
  venueName: string;
  address: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  ageRestriction?: string;
  heroMedia: string[];
  hasReservedSeating: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantityTotal: number;
  quantitySold: number;
  quantityRemaining: number;
  benefits: string[];
  isSoldOut: boolean;
  requiresStudentId: boolean;
  sortOrder: number;
}

export type SeatStatus = 'available' | 'selected' | 'held' | 'sold' | 'reserved' | 'disabled';

export interface Seat {
  id: string;
  eventId: string;
  section: string;
  row: string;
  number: string;
  status: SeatStatus;
  priceModifier: number;
  accessible: boolean;
  x: number;
  y: number;
}

export interface Organizer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  bio: string;
  verified: boolean;
  rating: number;
  whatsapp: string;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface Order {
  id: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  status: OrderStatus;
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
  createdAt: string;
}

export type TicketStatus = 'valid' | 'used' | 'cancelled' | 'refunded';

export interface Ticket {
  id: string;
  orderId: string;
  eventId: string;
  ticketTypeId: string;
  attendeeName: string;
  qrCode: string;
  status: TicketStatus;
  seatId?: string;
  createdAt: string;
}
