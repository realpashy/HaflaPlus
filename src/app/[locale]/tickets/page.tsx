"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore } from "@/store/useStore";
import { mockEvent, mockTicketTypes } from "@/store/mockData";
import { Ticket as TicketIcon, Calendar, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";

export default function MyTicketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState("ar");
  const { tickets } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 pb-24">
        <div className="bg-background border-b">
          <div className="container py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <TicketIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              تذاكري
            </h1>
          </div>
        </div>

        <div className="container py-8">
          {tickets.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-[2rem] border border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <TicketIcon className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">لا توجد لديك تذاكر</h2>
              <p className="text-muted-foreground mb-8">احجز تذاكر لفعالياتك المفضلة لتظهر هنا.</p>
              <Link href={`/${locale}/events`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 rounded-full">
                 استكشف الفعاليات
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => {
                // For MVP, we assume all tickets are for mockEvent
                const eventDate = new Date(mockEvent.startsAt);
                const type = mockTicketTypes.find(t => t.id === ticket.ticketTypeId);
                
                return (
                  <div key={ticket.id} className="bg-card rounded-[2rem] border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="p-6 border-b bg-muted/10 relative">
                       {ticket.status === 'used' && (
                          <div className="absolute top-4 right-4 bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded">تم الاستخدام</div>
                       )}
                       {ticket.status === 'cancelled' && (
                          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">ملغاة</div>
                       )}
                       <h3 className="font-bold text-lg mb-4 line-clamp-1 pr-16">{mockEvent.title}</h3>
                       <div className="space-y-2 text-sm text-muted-foreground">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4" />
                           {formatDate(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL')}
                         </div>
                         <div className="flex items-center gap-2">
                           <MapPin className="w-4 h-4" />
                           {mockEvent.venueName}، {mockEvent.city}
                         </div>
                       </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <div className="flex justify-between items-center mb-6">
                          <div>
                             <div className="font-bold">{type?.name}</div>
                             <div className="text-sm text-muted-foreground">{ticket.attendeeName}</div>
                          </div>
                          {ticket.seatId && (
                             <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded font-bold">مقعد محجوز</div>
                          )}
                       </div>
                       
                       <Link href={`/${locale}/tickets/${ticket.id}`} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full mt-auto rounded-xl h-9 px-4 py-2 ${ticket.status === 'valid' ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90' : 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'}`}>
                          <QrCode className="w-4 h-4" />
                          عرض التذكرة (QR)
                       </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
