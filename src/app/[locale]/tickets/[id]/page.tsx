"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore } from "@/store/useStore";
import { mockEvent, mockTicketTypes } from "@/store/mockData";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, Calendar, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";

export default function SingleTicketPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const router = useRouter();
  const [locale, setLocale] = useState("ar");
  const [ticketId, setTicketId] = useState("");
  const { tickets } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
    params.then(p => {
      setLocale(p.locale);
      setTicketId(p.id);
    });
  }, [params]);

  if (!isClient || !ticketId) return null;

  const ticket = tickets.find(t => t.id === ticketId);

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-warning mb-4" />
        <h1 className="text-2xl font-bold mb-4">التذكرة غير موجودة</h1>
        <Button onClick={() => router.push(`/${locale}/tickets`)}>العودة لتذاكري</Button>
      </div>
    );
  }

  const type = mockTicketTypes.find(t => t.id === ticket.ticketTypeId);
  const eventDate = new Date(mockEvent.startsAt);

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 py-8 md:py-16 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-md px-4">
          
          <Button variant="ghost" onClick={() => router.push(`/${locale}/tickets`)} className="mb-6 gap-2">
             <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
             العودة
          </Button>

          {/* Ticket Card */}
          <div className="bg-ticket-bg text-ticket-text rounded-[2.5rem] overflow-hidden shadow-float relative ticket-notch-both ticket-dashed-border">
            
            <div className="p-8 pb-10 text-center relative">
               <div className="bg-primary/20 text-primary w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold mb-4 border border-primary/30">
                  {mockEvent.category}
               </div>
               <h1 className="text-2xl font-bold mb-2">{mockEvent.title}</h1>
               <div className="text-ticket-muted text-sm">{mockEvent.subtitle}</div>
            </div>

            <div className="px-8 pb-8 space-y-4">
               <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                   <Calendar className="w-5 h-5 text-white" />
                 </div>
                 <div className="text-sm">
                   <div className="font-bold">{formatDate(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL')}</div>
                   <div className="text-ticket-muted">{formatTime(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL')}</div>
                 </div>
               </div>
               
               <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                   <MapPin className="w-5 h-5 text-white" />
                 </div>
                 <div className="text-sm">
                   <div className="font-bold">{mockEvent.venueName}</div>
                   <div className="text-ticket-muted">{mockEvent.city}</div>
                 </div>
               </div>
            </div>

            <div className="h-px w-full relative ticket-dashed-border border-0 my-2">
               <div className="absolute left-0 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-muted/20"></div>
               <div className="absolute right-0 translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-muted/20"></div>
            </div>

            <div className="p-8 pt-10 flex flex-col items-center">
               
               <div className="flex w-full justify-between items-center mb-8 bg-white/5 p-4 rounded-2xl">
                  <div>
                     <div className="text-xs text-ticket-muted mb-1">الاسم</div>
                     <div className="font-bold">{ticket.attendeeName}</div>
                  </div>
                  <div className="text-end">
                     <div className="text-xs text-ticket-muted mb-1">الفئة</div>
                     <div className="font-bold text-primary">{type?.name}</div>
                  </div>
               </div>

               {ticket.status !== 'valid' && (
                  <div className={`w-full text-center py-3 mb-6 rounded-xl font-bold ${
                     ticket.status === 'used' ? 'bg-muted text-muted-foreground' : 'bg-destructive/20 text-destructive'
                  }`}>
                     {ticket.status === 'used' ? 'تم استخدام التذكرة' : 'تذكرة غير صالحة'}
                  </div>
               )}

               <div className={`bg-white p-4 rounded-3xl mb-4 ${ticket.status !== 'valid' ? 'opacity-30' : ''}`}>
                  <QRCodeSVG value={ticket.qrCode} size={200} />
               </div>
               
               <div className="font-mono tracking-[0.3em] text-ticket-muted text-sm mb-2">{ticket.id}</div>
               
               {ticket.seatId && (
                  <div className="mt-4 border border-ticket-border px-4 py-2 rounded-lg text-sm font-bold text-secondary">
                     مقعد محجوز
                  </div>
               )}

               <div className="text-xs text-ticket-muted mt-8 text-center px-4">
                  يرجى إبراز هذا الرمز عند بوابة الدخول. يُنصح بزيادة سطوع الشاشة.
               </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
