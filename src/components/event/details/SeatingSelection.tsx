"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Seat } from "@/types";
import { Maximize2, Check } from "lucide-react";
import { useCartStore } from "@/store/useStore";

interface SeatingSelectionProps {
  eventId: string;
}

export function SeatingSelection({ eventId }: SeatingSelectionProps) {
  const { selectedTickets, selectedSeats, toggleSeat } = useCartStore();
  const totalTicketsAllowed = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  // Generate a mock grid of seats (e.g., 5 rows, 10 columns)
  const mockGrid: Seat[][] = Array.from({ length: 5 }, (_, r) => 
    Array.from({ length: 10 }, (_, c) => {
      // Create some random statuses for the mock
      const rand = Math.random();
      let status: Seat['status'] = 'available';
      if (rand > 0.8) status = 'sold';
      else if (rand > 0.7) status = 'reserved';
      else if (rand > 0.6) status = 'disabled';

      return {
        id: `seat-${r}-${c}`,
        eventId,
        section: "A",
        row: String.fromCharCode(65 + r),
        number: `${c + 1}`,
        status,
        priceModifier: 0,
        accessible: false,
        x: c,
        y: r,
      };
    })
  );

  const handleSeatClick = (seat: Seat) => {
    if (seat.status !== 'available') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (!isSelected && selectedSeats.length >= totalTicketsAllowed) {
       return;
    }
    
    toggleSeat(seat);
  };

  return (
    <div className="bg-card border rounded-[2rem] p-6 shadow-sm overflow-hidden flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold">اختر مقعدك</h2>
         <div className="text-sm font-medium bg-muted px-3 py-1 rounded-full">
            المقاعد المتاحة للاختيار: {totalTicketsAllowed - selectedSeats.length}
         </div>
      </div>

      {/* Stage */}
      <div className="w-64 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground text-sm mb-12 relative before:content-[''] before:absolute before:-bottom-4 before:w-48 before:h-2 before:bg-primary/20 before:rounded-full before:blur-sm">
        المسرح
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2 mb-8 items-center overflow-x-auto max-w-full pb-4">
        {mockGrid.map((row, rIdx) => (
          <div key={`row-${rIdx}`} className="flex gap-2">
            {row.map((seat) => {
              const isSelected = selectedSeats.some(s => s.id === seat.id);
              
              let seatClass = "w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[10px] cursor-pointer ";
              
              if (isSelected) {
                seatClass += "bg-primary text-primary-foreground shadow-md scale-110";
              } else if (seat.status === 'available') {
                seatClass += "bg-muted hover:bg-primary/20";
              } else if (seat.status === 'sold') {
                seatClass += "bg-destructive/20 text-destructive/50 cursor-not-allowed";
              } else if (seat.status === 'reserved' || seat.status === 'disabled') {
                seatClass += "bg-border text-muted-foreground cursor-not-allowed";
              }

              return (
                <div 
                  key={seat.id} 
                  className={seatClass}
                  onClick={() => handleSeatClick(seat)}
                  title={`الصف ${seat.row} المقعد ${seat.number}`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground bg-muted/50 py-3 px-6 rounded-2xl w-full mb-6">
         <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-muted border"></div> متاح</div>
         <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary"></div> مختار</div>
         <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-border"></div> محجوز</div>
         <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-destructive/20"></div> مباع</div>
      </div>

      <Button variant="outline" className="w-full gap-2 rounded-full h-12">
        <Maximize2 className="w-4 h-4" />
        عرض الخريطة كاملة
      </Button>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
         <div className="w-full mt-6 space-y-2">
            <h4 className="font-bold text-sm">المقاعد المختارة:</h4>
            <div className="flex flex-col gap-2">
               {selectedSeats.map(seat => (
                 <div key={seat.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border text-sm">
                    <div>
                       <span className="font-bold">الصف {seat.row}، المقعد {seat.number}</span>
                       <span className="text-muted-foreground mr-2 text-xs">رؤية ممتازة</span>
                    </div>
                    {seat.priceModifier > 0 && (
                       <span className="font-bold">+{seat.priceModifier} ₪</span>
                    )}
                 </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
}
