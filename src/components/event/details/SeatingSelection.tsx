"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Seat } from "@/types";
import { useCartStore } from "@/store/useStore";

interface SeatingSelectionProps {
  eventId: string;
}

type SeatTone = "mint" | "blue" | "purple" | "peach" | "gray" | "selected" | "sold";

function buildSeat(eventId: string, row: string, number: number, tone: SeatTone, forcedStatus?: Seat["status"]): Seat & { tone: SeatTone } {
  return {
    id: `${row}-${number}`,
    eventId,
    section: "B",
    row,
    number: String(number),
    status: forcedStatus ?? (tone === "sold" ? "sold" : tone === "gray" ? "reserved" : "available"),
    priceModifier: tone === "selected" ? 120 : tone === "peach" ? 80 : 0,
    accessible: false,
    x: number,
    y: row.charCodeAt(0),
    tone,
  };
}

export function SeatingSelection({ eventId }: SeatingSelectionProps) {
  const { selectedTickets, selectedSeats, toggleSeat } = useCartStore();
  const totalTicketsAllowed = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const [primaryFilter, setPrimaryFilter] = useState("الأقرب للمسرح");
  const [secondaryFilter, setSecondaryFilter] = useState("الأفضل سعراً");

  const seatRows = useMemo(
    () => [
      [
        ...Array.from({ length: 4 }, (_, i) => buildSeat(eventId, "A", i + 1, "mint")),
        ...Array.from({ length: 6 }, (_, i) => buildSeat(eventId, "A", i + 5, i >= 2 && i <= 4 ? "selected" : "blue")),
        ...Array.from({ length: 3 }, (_, i) => buildSeat(eventId, "A", i + 11, i === 0 ? "peach" : "gray")),
      ],
      [
        ...Array.from({ length: 4 }, (_, i) => buildSeat(eventId, "B", i + 1, "blue")),
        ...Array.from({ length: 6 }, (_, i) => buildSeat(eventId, "B", i + 5, i <= 2 ? "selected" : "mint")),
        ...Array.from({ length: 3 }, (_, i) => buildSeat(eventId, "B", i + 11, i === 2 ? "sold" : "gray")),
      ],
      [
        ...Array.from({ length: 4 }, (_, i) => buildSeat(eventId, "C", i + 1, i === 0 ? "gray" : "blue")),
        ...Array.from({ length: 6 }, (_, i) => buildSeat(eventId, "C", i + 5, i === 1 ? "selected" : i === 4 ? "mint" : "blue")),
        ...Array.from({ length: 3 }, (_, i) => buildSeat(eventId, "C", i + 11, i === 1 ? "sold" : "peach")),
      ],
      [
        ...Array.from({ length: 4 }, (_, i) => buildSeat(eventId, "D", i + 1, "gray")),
        ...Array.from({ length: 6 }, (_, i) => buildSeat(eventId, "D", i + 5, i === 3 ? "mint" : "gray")),
        ...Array.from({ length: 3 }, (_, i) => buildSeat(eventId, "D", i + 11, i === 0 ? "mint" : "gray")),
      ],
      [
        ...Array.from({ length: 4 }, (_, i) => buildSeat(eventId, "E", i + 1, i <= 1 ? "peach" : "gray")),
        ...Array.from({ length: 6 }, (_, i) => buildSeat(eventId, "E", i + 5, i === 4 ? "mint" : "gray")),
        ...Array.from({ length: 3 }, (_, i) => buildSeat(eventId, "E", i + 11, i === 0 ? "sold" : "gray")),
      ],
    ],
    [eventId]
  );

  const handleSeatClick = (seat: Seat & { tone: SeatTone }) => {
    if (seat.status !== "available") return;
    const isSelected = selectedSeats.some((selected) => selected.id === seat.id);
    if (!isSelected && selectedSeats.length >= totalTicketsAllowed) return;
    toggleSeat(seat);
  };

  const seatColor = (seat: Seat & { tone: SeatTone }, isSelected: boolean) => {
    if (isSelected) return "bg-[#8A5CFF] text-white";
    switch (seat.tone) {
      case "mint":
        return "bg-[#B8EDB4] text-[#53804B]";
      case "blue":
        return "bg-[#BFEAF8] text-[#3B7086]";
      case "purple":
      case "selected":
        return "bg-[#8A5CFF] text-white";
      case "peach":
        return "bg-[#F6BC8D] text-[#8D5428]";
      case "sold":
        return "bg-[#F08E87] text-[#9A322C]";
      default:
        return "bg-[#DEDEDE] text-[#8A8A8A]";
    }
  };

  return (
    <section className="rounded-[34px] border border-[#EFE7DA] bg-white px-4 py-5 shadow-[0_16px_60px_rgba(91,62,26,0.08)] md:px-8 md:py-8">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:[direction:ltr]">
        <div className="xl:[direction:rtl]">
          <h2 className="text-[2rem] font-extrabold text-[#141414] md:text-[2.6rem]">اختر مقعدك</h2>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#7E7B76]">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#B8EDB4]" /> الأقرب للمسرح</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#8A5CFF]" /> الأفضل سعراً</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#DEDEDE]" /> متجاورة فقط</span>
          </div>
        </div>

        <div className="grid gap-3 xl:min-w-[250px] xl:[direction:rtl]">
          <button type="button" className="flex items-center justify-between rounded-[20px] border border-[#EAE1D4] bg-white px-4 py-3 text-right shadow-sm">
            <div>
              <div className="text-lg font-bold text-[#222]">الصف B. المقعد 12</div>
              <div className="text-sm text-[#7D776E]">رؤية ممتازة</div>
              <div className="text-lg font-bold text-[#141414]">+120 ₪</div>
            </div>
            <ChevronDown className="h-5 w-5 text-[#706A62]" />
          </button>
          <button
            type="button"
            onClick={() => setPrimaryFilter(primaryFilter === "الأقرب للمسرح" ? "متجاورة فقط" : "الأقرب للمسرح")}
            className="flex items-center justify-between rounded-[18px] border border-[#EEE5D7] bg-[#FBF8F1] px-4 py-3 text-base font-semibold text-[#3D3834]"
          >
            <span>{primaryFilter}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setSecondaryFilter(secondaryFilter === "الأفضل سعراً" ? "متجاورة فقط" : "الأفضل سعراً")}
            className="flex items-center justify-between rounded-[18px] border border-[#EEE5D7] bg-[#FBF8F1] px-4 py-3 text-base font-semibold text-[#3D3834]"
          >
            <span>{secondaryFilter}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_250px] xl:[direction:ltr]">
        <div className="rounded-[28px] bg-[#FEFEFD] px-3 py-4 md:px-6 xl:[direction:rtl]">
          <div className="mx-auto mb-8 flex h-14 w-[240px] items-center justify-center rounded-[16px] bg-[#ECEAE8] text-[1.7rem] font-extrabold text-[#23211F]">
            المسرح
          </div>

          <div className="space-y-3 overflow-x-auto pb-2">
            {seatRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex min-w-[620px] items-center justify-center gap-2">
                <div className="w-6 text-center text-xs font-bold text-[#7F7F7F]">{String.fromCharCode(65 + rowIndex)}</div>
                {row.map((seat) => {
                  const isSelected = selectedSeats.some((selected) => selected.id === seat.id);
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => handleSeatClick(seat)}
                      title={`الصف ${seat.row} المقعد ${seat.number}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-[11px] font-bold shadow-sm transition ${seatColor(seat, isSelected)} ${seat.status !== "available" ? "cursor-not-allowed opacity-80" : "hover:scale-105"}`}
                    >
                      {isSelected ? <Check className="h-4 w-4" /> : ""}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 xl:hidden">
          {selectedSeats.length > 0 && (
            <div className="rounded-[20px] border border-[#EFE5D8] bg-[#FAF8F3] p-4">
              <div className="text-base font-extrabold text-[#1C1A18]">المقاعد المختارة</div>
              <div className="mt-3 space-y-2">
                {selectedSeats.map((seat) => (
                  <div key={seat.id} className="flex items-center justify-between rounded-[16px] bg-white px-4 py-3 text-sm shadow-sm">
                    <div>
                      <div className="font-bold text-[#222]">الصف {seat.row} . المقعد {seat.number}</div>
                      <div className="text-[#7B756A]">رؤية ممتازة</div>
                    </div>
                    {seat.priceModifier > 0 && <div className="font-extrabold text-[#1C1A18]">+{seat.priceModifier} ₪</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden space-y-3 xl:block xl:[direction:rtl]">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <div key={seat.id} className="rounded-[20px] border border-[#EFE5D8] bg-[#FAF8F3] p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-bold text-[#222]">الصف {seat.row}. المقعد {seat.number}</div>
                    <div className="text-sm text-[#7B756A]">رؤية ممتازة</div>
                  </div>
                  {seat.priceModifier > 0 && <div className="text-lg font-extrabold text-[#1C1A18]">+{seat.priceModifier} ₪</div>}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[20px] border border-[#EFE5D8] bg-[#FAF8F3] p-4 text-sm text-[#7B756A] shadow-sm">
              اختر عدد التذاكر ثم انقر على المقاعد المتاحة لتثبيت مقعدك.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
