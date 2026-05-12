"use client";

import { Accessibility, CalendarRange, CircleUserRound, Headphones, House } from "lucide-react";

const navItems = [
  { label: "الرئيسية", icon: House, active: true },
  { label: "الفعاليات", icon: CalendarRange },
  { label: "الدعم", icon: Headphones },
  { label: "حسابي", icon: CircleUserRound },
  { label: "الوصول", icon: Accessibility },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7DFD4] bg-white/96 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur xl:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} type="button" className="flex flex-col items-center justify-center gap-1 rounded-2xl py-1.5 text-center">
              <Icon className={`h-5 w-5 ${item.active ? "text-black" : "text-[#85807A]"}`} />
              <span className={`text-[10px] font-semibold ${item.active ? "text-black" : "text-[#85807A]"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
