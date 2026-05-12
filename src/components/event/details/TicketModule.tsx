"use client";

import { useState } from "react";
import { Lock, Minus, Plus, ShieldCheck } from "lucide-react";
import { TicketType } from "@/types";
import { useCartStore } from "@/store/useStore";

interface TicketModuleProps {
  tickets: TicketType[];
}

export function TicketModule({ tickets }: TicketModuleProps) {
  const { selectedTickets, setTicketQuantity } = useCartStore();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const totalQuantity = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const subtotal = tickets.reduce((sum, ticket) => sum + ticket.price * (selectedTickets[ticket.id] || 0), 0);
  const serviceFee = totalQuantity > 0 ? totalQuantity * 10 : 0;
  const finalTotal = subtotal + serviceFee;

  return (
    <section className="relative overflow-hidden rounded-[34px] bg-[#1C1A1D] px-4 py-5 text-white shadow-[0_25px_70px_rgba(17,15,20,0.28)] md:px-8 md:py-8">
      <div className="ticket-edge-hole ticket-edge-hole-top" />
      <div className="ticket-edge-hole ticket-edge-hole-bottom" />
      <div className="ticket-edge-hole-left ticket-edge-hole-left-top" />
      <div className="ticket-edge-hole-left ticket-edge-hole-left-bottom" />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_300px] xl:[direction:ltr]">
        <div className="relative xl:[direction:rtl]">
          <div className="mb-5 flex items-center justify-between">
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure موافقة
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">اختر تذكرتك</h2>
          </div>

          <div className="space-y-3">
            {tickets.map((ticket, index) => {
              const qty = selectedTickets[ticket.id] || 0;
              const isSoldOut = ticket.isSoldOut;

              return (
                <div
                  key={ticket.id}
                  className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2 text-[1.05rem] font-semibold md:text-[1.2rem]">
                        <span className="text-white/78">{index + 1}.</span>
                        <span>{ticket.name}</span>
                        <span className="text-white/90">— {ticket.price} ₪</span>
                        {isSoldOut && (
                          <span className="rounded-full bg-[#E77878] px-2.5 py-1 text-xs font-bold text-white">نفدت التذاكر</span>
                        )}
                      </div>
                      <p className="text-sm text-white/65">{ticket.description}</p>
                      {!isSoldOut && ticket.quantityRemaining <= 10 && (
                        <p className="mt-1 text-sm font-semibold text-[#FF8778]">تبقّى {ticket.quantityRemaining} فقط</p>
                      )}
                    </div>

                    {isSoldOut ? (
                      <div className="flex w-full flex-col gap-2 md:w-[260px]">
                        <div className="text-sm text-white/55">تواصلني بعلاقة/الصوت.</div>
                        <div className="flex gap-2">
                          <input
                            value={waitlistEmail}
                            onChange={(event) => setWaitlistEmail(event.target.value)}
                            placeholder="Email/urloine waitlist"
                            className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setWaitlistSubmitted(true)}
                            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
                          >
                            أخبرني عند التوفر
                          </button>
                        </div>
                        {waitlistSubmitted && <p className="text-xs text-[#DFFF6A]">تم حفظ طلب الانتظار.</p>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 md:min-w-[210px] md:justify-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2 py-1">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/6 text-white transition hover:bg-white/12"
                            onClick={() => setTicketQuantity(ticket.id, qty - 1)}
                            aria-label={`Decrease ${ticket.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-5 text-center text-base font-bold">{qty}</span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/6 text-white transition hover:bg-white/12"
                            onClick={() => setTicketQuantity(ticket.id, qty + 1)}
                            aria-label={`Increase ${ticket.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="min-w-[70px] text-right">
                          <div className="text-[1.05rem] font-semibold">{ticket.price} ₪</div>
                          <div className="text-xs text-white/45">داخل السعر</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative xl:[direction:rtl]">
          <div className="hidden h-full xl:block">
            <div className="absolute bottom-0 right-auto top-0 w-px border-l border-dashed border-white/16" />
          </div>
          <div className="rounded-[26px] bg-[#171518] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] xl:h-full">
            <div className="mb-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[2rem] font-extrabold">{totalQuantity} تذاكر</div>
                  <div className="text-sm text-white/50">Ticket number</div>
                </div>
                <div className="rounded-[18px] border border-white/10 bg-white/4 p-3">
                  <div className="mb-2 flex h-12 gap-1">
                    {Array.from({ length: 18 }).map((_, index) => (
                      <span key={index} className={`h-full ${index % 3 === 0 ? "w-1.5" : "w-0.5"} bg-white/85`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, index) => (
                        <span key={index} className={`h-1.5 w-1.5 rounded-[2px] ${index % 4 === 0 ? "bg-white/90" : "bg-white/20"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-[2rem] font-extrabold">{finalTotal} ₪ المجموع:</div>
                <div className="text-sm text-white/55">يشمل ضريبة ورسوم الخدمة</div>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-[20px] bg-[linear-gradient(180deg,#7C59FF_0%,#5A36F4_100%)] px-6 py-4 text-xl font-extrabold text-white shadow-[0_14px_32px_rgba(98,70,255,0.38)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_42px_rgba(98,70,255,0.42)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={totalQuantity === 0}
            >
              احجز تذكرتك الآن
            </button>

            <div className="mt-4 text-center text-sm text-white/62">دفع آمن ومشفّر</div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-black"> Pay</div>
              <div className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-black">G Pay</div>
              <div className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-black">Mastercard</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
