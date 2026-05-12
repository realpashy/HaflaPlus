import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, ShieldCheck, Star, UserRound } from "lucide-react";
import { Event, Organizer } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";

interface DesktopSidebarProps {
  event: Event;
  organizer: Organizer;
  locale: string;
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-[#EFE6D8] bg-white p-5 shadow-[0_12px_34px_rgba(97,66,29,0.08)]">
      <h3 className="mb-4 text-[1.55rem] font-extrabold tracking-tight text-[#151515]">{title}</h3>
      {children}
    </section>
  );
}

export function DesktopSidebar({ event, organizer, locale }: DesktopSidebarProps) {
  const eventDate = new Date(event.startsAt);
  const formattedDate = formatDate(eventDate, locale === "ar" ? "ar-EG" : "he-IL");
  const formattedTime = formatTime(eventDate, locale === "ar" ? "ar-EG" : "he-IL");

  return (
    <aside className="hidden w-[310px] shrink-0 flex-col gap-4 xl:flex">
      <SidebarCard title="Hafla+">
        <div className="space-y-4 text-right">
          <div className="border-b border-[#EFE9DF] pb-4 text-[2rem] font-extrabold text-[#151515]">{event.title}</div>
          <div className="space-y-3 text-[1.1rem] text-[#222]">
            <div className="flex items-center justify-between gap-3"><CalendarDays className="h-5 w-5 text-[#2A2A2A]" /><span>{formattedDate}</span></div>
            <div className="flex items-center justify-between gap-3"><Clock3 className="h-5 w-5 text-[#2A2A2A]" /><span>{formattedTime}</span></div>
            <div className="flex items-center justify-between gap-3"><MapPin className="h-5 w-5 text-[#2A2A2A]" /><span>{event.venueName}، {event.city}</span></div>
            <div className="flex items-center justify-between gap-3"><CalendarDays className="h-5 w-5 text-[#2A2A2A]" /><span>{event.category}</span></div>
            <div className="flex items-center justify-between gap-3"><UserRound className="h-5 w-5 text-[#2A2A2A]" /><span>{event.ageRestriction}</span></div>
          </div>
        </div>
      </SidebarCard>

      <SidebarCard title="الوجهة">
        <div className="overflow-hidden rounded-[22px] border border-[#ECE4D8] bg-[#F8F5EF]">
          <img src="/mock-map.svg" alt="Map preview" className="h-[190px] w-full object-cover" />
        </div>
        <div className="mt-3 text-right text-sm text-[#6D665D]">
          <div className="font-semibold text-[#171717]">قاعة بايس، الناصرة</div>
          <div>أقرب أماكن الوقوف على بعد 100م</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="button" className="flex-1 rounded-full bg-[#E6F5FF] px-4 py-2.5 text-sm font-bold text-[#2B5C7E]">افتح في Waze</button>
          <button type="button" className="flex-1 rounded-full border border-[#E8E2D9] bg-white px-4 py-2.5 text-sm font-bold text-[#2E2A26]">Google Maps</button>
        </div>
      </SidebarCard>

      <SidebarCard title="التقويم">
        <div className="space-y-3">
          <button type="button" className="w-full rounded-full border border-[#EAE2D7] bg-[#FAF7F1] px-4 py-3 text-base font-bold text-[#2D2925]">أضف إلى التقويم</button>
          <div className="flex gap-2">
            <button type="button" className="flex-1 rounded-full border border-[#EAE2D7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2D2925]">Google Calendar</button>
            <button type="button" className="flex-1 rounded-full border border-[#EAE2D7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2D2925]">iCal</button>
          </div>
        </div>
      </SidebarCard>

      <button
        type="button"
        className="flex items-center justify-center gap-3 rounded-[22px] bg-[#2FD168] px-5 py-4 text-[1.65rem] font-extrabold text-white shadow-[0_16px_42px_rgba(47,209,104,0.28)]"
      >
        <MessageCircle className="h-8 w-8" />
        تحتاج مساعدة؟ واتساب
      </button>

      <SidebarCard title="Trust">
        <div className="space-y-3 text-sm text-[#2A2A2A]">
          {["تذاكر أصلية . دفع آمن . مأمون", "يدعم الدعم . دعم واتساب"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#7CCB63]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </SidebarCard>

      <SidebarCard title="المنظّم">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D9F6F3] px-3 py-1 text-xs font-bold text-[#317A74]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Certifioed
        </div>
        <div className="flex items-center gap-3">
          <img src="/mock-organizer-avatar.svg" alt={organizer.name} className="h-16 w-16 rounded-full border border-[#E9E1D5] object-cover" />
          <div className="text-right">
            <div className="text-[1.35rem] font-extrabold text-[#141414]">{organizer.name}</div>
            <div className="flex items-center gap-1 text-sm text-[#4C4A47]">
              <Star className="h-4 w-4 fill-[#F4C65C] text-[#F4C65C]" />
              <span>{organizer.rating}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#70695F]">{organizer.bio}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" className="flex-1 rounded-full bg-[#F4F989] px-4 py-2.5 text-sm font-bold text-[#2E2B24]">راسل المنظّم</button>
          <button type="button" className="flex-1 rounded-full border border-[#ECE5DA] bg-white px-4 py-2.5 text-sm font-bold text-[#2E2B24]">زيارة الصفحة</button>
        </div>
      </SidebarCard>
    </aside>
  );
}
