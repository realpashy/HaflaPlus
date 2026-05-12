"use client";

import { TicketType } from "@/types";
import { useCartStore } from "@/store/useStore";

interface MobileStickyFooterProps {
  tickets: TicketType[];
  title?: string;
  image?: string;
}

export function MobileStickyFooter({
  tickets,
  title = "ليلة طربية في الناصرة",
  image = "/mock-stage-main.svg",
}: MobileStickyFooterProps) {
  const { selectedTickets } = useCartStore();
  const totalQuantity = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const subtotal = tickets.reduce((sum, ticket) => sum + ticket.price * (selectedTickets[ticket.id] || 0), 0);
  const serviceFee = totalQuantity > 0 ? totalQuantity * 10 : 0;
  const finalTotal = subtotal + serviceFee;

  return (
    <div className="fixed inset-x-3 bottom-[74px] z-40 rounded-[22px] border border-[#E8DED2] bg-white px-3 py-2.5 shadow-[0_18px_50px_rgba(75,53,23,0.18)] xl:hidden">
      <div className="flex items-center gap-2.5">
        <img src={image} alt={title} className="h-14 w-14 rounded-[16px] object-cover" />
        <div className="min-w-0 flex-1 text-right">
          <div className="truncate text-[13px] font-bold text-[#171717]">{title}</div>
          <div className="truncate text-[11px] text-[#6F675E]">20:30 . مسرح وسمرينا الأمسية</div>
          <div className="mt-0.5 text-[13px] font-bold text-[#171717]">{totalQuantity} تذاكر . {finalTotal} ₪</div>
        </div>
      </div>

      <button
        type="button"
        className="mt-2.5 w-full rounded-[18px] bg-[linear-gradient(180deg,#BDAFFF_0%,#A996FF_100%)] px-4 py-3 text-lg font-extrabold text-white shadow-[0_10px_26px_rgba(141,118,255,0.28)] disabled:opacity-50"
        disabled={totalQuantity === 0}
      >
        احجز الآن
      </button>
    </div>
  );
}
