import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, Ticket, TicketType, Seat } from '../types';

interface CartState {
  selectedTickets: Record<string, number>;
  selectedSeats: Seat[];
  setTicketQuantity: (ticketTypeId: string, quantity: number) => void;
  toggleSeat: (seat: Seat) => void;
  clearCart: () => void;
}

interface OrderState {
  orders: Order[];
  tickets: Ticket[];
  addOrder: (order: Order, tickets: Ticket[]) => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      selectedTickets: {},
      selectedSeats: [],
      setTicketQuantity: (ticketTypeId, quantity) =>
        set((state) => ({
          selectedTickets: {
            ...state.selectedTickets,
            [ticketTypeId]: Math.max(0, quantity),
          },
        })),
      toggleSeat: (seat) =>
        set((state) => {
          const isSelected = state.selectedSeats.some((s) => s.id === seat.id);
          if (isSelected) {
            return {
              selectedSeats: state.selectedSeats.filter((s) => s.id !== seat.id),
            };
          }
          return {
            selectedSeats: [...state.selectedSeats, seat],
          };
        }),
      clearCart: () => set({ selectedTickets: {}, selectedSeats: [] }),
    }),
    {
      name: 'halfa-cart-storage',
    }
  )
);

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      tickets: [],
      addOrder: (order, tickets) =>
        set((state) => ({
          orders: [...state.orders, order],
          tickets: [...state.tickets, ...tickets],
        })),
      updateTicketStatus: (ticketId, status) =>
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === ticketId ? { ...t, status } : t
          ),
        })),
    }),
    {
      name: 'halfa-order-storage',
    }
  )
);
