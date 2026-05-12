import { Calendar, MapPin, MessageCircle, Star, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, Organizer } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";

interface DesktopSidebarProps {
  event: Event;
  organizer: Organizer;
  locale: string;
}

export function DesktopSidebar({ event, organizer, locale }: DesktopSidebarProps) {
  const eventDate = new Date(event.startsAt);
  const formattedDate = formatDate(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL');
  const formattedTime = formatTime(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL');

  return (
    <div className="hidden lg:flex flex-col w-[320px] shrink-0 gap-6 sticky top-24 h-fit">
      
      <div className="bg-card rounded-2xl border p-5 shadow-sm">
        <h3 className="font-bold text-lg mb-4">ملخص الفعالية</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">{formattedDate}</div>
              <div className="text-muted-foreground">{formattedTime}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">{event.venueName}</div>
              <div className="text-muted-foreground">{event.city}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="text-sm font-medium">{event.category}</div>
          </div>
          {event.ageRestriction && (
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="text-sm font-medium">{event.ageRestriction}</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-5 shadow-sm">
        <h3 className="font-bold text-lg mb-4">الموقع</h3>
        <div className="w-full aspect-video bg-muted rounded-xl mb-4 overflow-hidden relative">
           <div className="absolute inset-0 bg-primary/10 bg-cover bg-center opacity-50"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <MapPin className="w-8 h-8 text-primary drop-shadow-md" />
           </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{event.address}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">Waze</Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">Google Maps</Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-5 shadow-sm">
        <h3 className="font-bold text-lg mb-4">أضف إلى التقويم</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8 gap-2">
            <Calendar className="w-3 h-3" />
            Google
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8 gap-2">
            <Calendar className="w-3 h-3" />
            iCal
          </Button>
        </div>
      </div>

      <Button className="w-full rounded-2xl h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md gap-2 text-base font-bold">
        <MessageCircle className="w-5 h-5" />
        تحتاج مساعدة؟ واتساب
      </Button>

      <div className="bg-card rounded-2xl border p-5 shadow-sm">
        <h3 className="font-bold text-lg mb-4">لماذا تحجز معنا؟</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            تذاكر أصلية 100%
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            استرداد حسب الشروط
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            دعم قبل وأثناء الحدث
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            دفع آمن ومشفّر
          </li>
        </ul>
      </div>

      <div className="bg-card rounded-2xl border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">المنظّم</h3>
          {organizer.verified && (
            <div className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              منظم معتمد
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl font-bold overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/placeholder-logo.png" alt={organizer.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold">{organizer.name}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span>{organizer.rating}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {organizer.bio}
        </p>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">راسل المنظّم</Button>
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">زيارة الصفحة</Button>
        </div>
      </div>

    </div>
  );
}
