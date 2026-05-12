"use client";

import { useState } from "react";
import { ShieldCheck, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketType } from "@/types";
import { useCartStore } from "@/store/useStore";

interface TicketModuleProps {
  tickets: TicketType[];
}

export function TicketModule({ tickets }: TicketModuleProps) {
  const { selectedTickets, setTicketQuantity } = useCartStore();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState<string | null>(null);

  const handleWaitlist = (ticketId: string) => {
    if (waitlistEmail) {
      setWaitlistSubmitted(ticketId);
      setWaitlistEmail("");
    }
  };

  const totalQuantity = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  const subtotal = tickets.reduce((total, ticket) => {
    const qty = selectedTickets[ticket.id] || 0;
    return total + (ticket.price * qty);
  }, 0);
  
  const serviceFee = totalQuantity > 0 ? 10 * totalQuantity : 0; // Mock fee 10 ILS per ticket
  const finalTotal = subtotal + serviceFee;

  return (
    <div className="bg-ticket-bg text-ticket-text rounded-[2rem] overflow-hidden shadow-float relative ticket-notch-both ticket-dashed-border">
      {/* Secure Badge */}
      <div className="absolute top-0 left-0 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-br-2xl text-xs font-medium flex items-center gap-1.5 z-10">
        <ShieldCheck className="w-4 h-4" />
        حجز آمن
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row h-full">
        {/* Left Side (Tickets List) */}
        <div className="flex-1 space-y-6 relative md:pl-8">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-start">اختر تذكرتك</h2>
          
          <div className="space-y-4">
            {tickets.map((ticket, index) => {
              const qty = selectedTickets[ticket.id] || 0;
              const isSelected = qty > 0;

              return (
                <div 
                  key={ticket.id} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${
                    isSelected ? "border-primary bg-primary/5" : "border-ticket-border bg-ticket-bg/50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{index + 1}. {ticket.name} — {ticket.price} ₪</span>
                      {ticket.isSoldOut && (
                        <span className="bg-destructive/20 text-destructive text-xs px-2 py-0.5 rounded-full font-medium">نفدت التذاكر</span>
                      )}
                    </div>
                    <p className="text-sm text-ticket-muted">{ticket.description}</p>
                    {ticket.requiresStudentId && (
                      <p className="text-xs text-warning mt-1">يتطلب بطاقة طالب</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    {ticket.isSoldOut ? (
                      waitlistSubmitted === ticket.id ? (
                        <div className="text-success text-sm font-medium bg-success/10 px-3 py-1.5 rounded-full">
                          تم التسجيل في قائمة الانتظار
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Input 
                            placeholder="Email أو رقم الهاتف" 
                            className="h-9 bg-black/20 border-ticket-border text-white placeholder:text-ticket-muted w-full sm:w-48 text-xs"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                          />
                          <Button size="sm" variant="secondary" className="h-9 whitespace-nowrap text-xs" onClick={() => handleWaitlist(ticket.id)}>
                            أخبرني
                          </Button>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-3 bg-black/30 rounded-full p-1 border border-ticket-border">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-white"
                            onClick={() => setTicketQuantity(ticket.id, qty - 1)}
                            disabled={qty === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-4 text-center font-bold text-lg">{qty}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-white"
                            onClick={() => setTicketQuantity(ticket.id, qty + 1)}
                            disabled={qty >= ticket.quantityRemaining}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {ticket.quantityRemaining <= 10 && qty < ticket.quantityRemaining && (
                          <span className="text-xs text-warning font-medium">تبقى {ticket.quantityRemaining} فقط</span>
                        )}
                        {qty >= ticket.quantityRemaining && ticket.quantityRemaining > 0 && (
                          <span className="text-xs text-ticket-muted">الحد الأقصى</span>
                        )}
                      </div>
                    )}
                    
                    {!ticket.isSoldOut && (
                      <div className="text-end hidden sm:block min-w-[80px]">
                         <div className="font-bold text-xl">{ticket.price} ₪</div>
                         <div className="text-xs text-ticket-muted">لكل تذكرة</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side (Summary) - Desktop dashed separator */}
        <div className="hidden md:block w-px bg-ticket-border mx-8 my-4 relative">
            <div className="absolute top-0 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background"></div>
            <div className="absolute bottom-0 translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background"></div>
        </div>

        {/* Mobile dashed separator */}
        <div className="md:hidden h-px w-full bg-ticket-border my-6 relative ticket-dashed-border border-0">
            <div className="absolute left-0 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-background"></div>
            <div className="absolute right-0 translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-background"></div>
        </div>

        {/* Summary Area */}
        <div className="md:w-64 flex flex-col justify-between md:pr-4">
          <div className="text-center md:text-start flex flex-col items-center md:items-start gap-4">
             {/* Mock Barcode */}
             <div className="hidden md:block w-full">
                <div className="flex gap-1 justify-center opacity-30 h-12 mb-2">
                   {[...Array(20)].map((_, i) => (
                     <div key={i} className={`bg-white h-full ${i % 3 === 0 ? 'w-2' : i % 2 === 0 ? 'w-1' : 'w-[2px]'}`}></div>
                   ))}
                </div>
                <div className="text-center text-xs text-ticket-muted tracking-widest font-mono">TICKET NUMBER</div>
             </div>

             <div className="w-full text-center mt-4">
                <div className="text-lg text-ticket-muted mb-1">{totalQuantity} تذاكر</div>
                <div className="text-3xl font-bold mb-1">المجموع: {finalTotal} ₪</div>
                <div className="text-xs text-ticket-muted">يشمل {serviceFee} ₪ رسوم خدمة</div>
             </div>
          </div>

          <div className="mt-8 space-y-4">
             <Button 
               size="lg" 
               className="w-full rounded-full text-lg h-14 bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(132,204,22,0.3)]"
               disabled={totalQuantity === 0}
             >
               احجز تذكرتك الآن
             </Button>
             
             <div className="flex items-center justify-center gap-2 text-ticket-muted text-xs">
                <span>دفع آمن ومشفّر</span>
                <div className="flex gap-1">
                   <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">Pay</div>
                   <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">G Pay</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
