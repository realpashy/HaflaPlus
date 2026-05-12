"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, ExternalLink, Calendar as CalendarIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/useStore";
import { QRCodeSVG } from "qrcode.react";
import { mockEvent, mockTicketTypes } from "@/store/mockData";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

export default function SuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const [locale, setLocale] = useState("ar");
  const { orders, tickets } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  const order = orders.find(o => o.id === orderId);
  const orderTickets = tickets.filter(t => t.orderId === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">الطلب غير موجود</h1>
        <Button onClick={() => router.push(`/${locale}`)}>العودة للرئيسية</Button>
      </div>
    );
  }

  const eventDate = new Date(mockEvent.startsAt);

  return (
    <div className="min-h-screen bg-muted/20 py-12 md:py-24">
      <div className="container max-w-3xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">تم تأكيد حجزك بنجاح!</h1>
          <p className="text-lg text-muted-foreground">
            تم إرسال تفاصيل التذاكر إلى {order.buyerEmail}
          </p>
          <div className="mt-4 bg-background px-4 py-2 rounded-full border text-sm font-medium">
            رقم الطلب: {order.id}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
           <Link href={`/${locale}/tickets`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8">
              <ExternalLink className="w-5 h-5" />
              عرض تذاكري
           </Link>
           <Link href={`/${locale}/events`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-input bg-background shadow-sm hover:bg-muted hover:text-accent-foreground h-14 px-8">
              العودة للفعاليات
           </Link>
        </div>

        <div className="bg-card rounded-[2rem] border shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 border-b bg-muted/10">
            <h2 className="text-xl font-bold mb-4">{mockEvent.title}</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                 <CalendarIcon className="w-4 h-4" />
                 {formatDate(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL')} - {formatTime(eventDate, locale === 'ar' ? 'ar-EG' : 'he-IL')}
              </div>
              <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4" />
                 {mockEvent.venueName}، {mockEvent.city}
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 bg-ticket-bg text-ticket-text relative ticket-notch-both ticket-dashed-border">
             <h3 className="font-bold mb-6 text-lg">تذاكرك ({orderTickets.length})</h3>
             <div className="grid gap-4 sm:grid-cols-2">
                {orderTickets.map((ticket, i) => {
                   const type = mockTicketTypes.find(t => t.id === ticket.ticketTypeId);
                   return (
                     <div key={ticket.id} className="bg-white/5 border border-ticket-border rounded-2xl p-4 flex flex-col items-center text-center">
                        <div className="bg-white p-2 rounded-xl mb-4">
                           <QRCodeSVG value={ticket.qrCode} size={100} />
                        </div>
                        <div className="font-bold text-lg mb-1">{type?.name}</div>
                        <div className="text-sm text-ticket-muted mb-2">{ticket.attendeeName}</div>
                        {ticket.seatId && (
                           <div className="text-xs font-mono bg-black/30 px-2 py-1 rounded w-full mb-2">مقعد محجوز</div>
                        )}
                        <div className="text-[10px] font-mono tracking-widest text-ticket-muted mt-auto pt-2 border-t border-ticket-border w-full">
                           {ticket.id}
                        </div>
                     </div>
                   )
                })}
             </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
           <Button variant="outline" className="h-12 rounded-xl gap-2 bg-background">
              <CalendarIcon className="w-4 h-4 text-primary" />
              أضف إلى التقويم
           </Button>
           <Button variant="outline" className="h-12 rounded-xl gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-transparent">
              <MessageCircle className="w-4 h-4" />
              إرسال عبر واتساب
           </Button>
        </div>

      </div>
    </div>
  );
}

// Quick placeholder
function MapPin(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
}
