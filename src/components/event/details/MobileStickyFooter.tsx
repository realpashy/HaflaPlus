"use client";

import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { TicketType } from "@/types";

interface MobileStickyFooterProps {
  tickets: TicketType[];
}

export function MobileStickyFooter({ tickets }: MobileStickyFooterProps) {
  const { selectedTickets } = useCartStore();
  
  const totalQuantity = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  const subtotal = tickets.reduce((total, ticket) => {
    const qty = selectedTickets[ticket.id] || 0;
    return total + (ticket.price * qty);
  }, 0);
  
  const serviceFee = totalQuantity > 0 ? 10 * totalQuantity : 0;
  const finalTotal = subtotal + serviceFee;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          {totalQuantity > 0 ? (
            <>
              <div className="text-xs text-muted-foreground">{totalQuantity} تذاكر</div>
              <div className="font-bold text-lg">{finalTotal} ₪</div>
            </>
          ) : (
            <div className="text-sm font-medium text-muted-foreground">اختر تذكرتك</div>
          )}
        </div>
        <Button 
          size="lg" 
          className="flex-1 rounded-full text-base font-bold h-12 shadow-md"
          disabled={totalQuantity === 0}
        >
          احجز الآن
        </Button>
      </div>
    </div>
  );
}
