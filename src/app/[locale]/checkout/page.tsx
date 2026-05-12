"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore, useOrderStore } from "@/store/useStore";
import { mockEvent, mockTicketTypes } from "@/store/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ChevronRight, Ticket as TicketIcon } from "lucide-react";
import { Order, Ticket, TicketStatus } from "@/types";

export default function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();
  const [locale, setLocale] = useState<string>("ar");
  const { selectedTickets, selectedSeats, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    coupon: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  const totalQuantity = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  if (totalQuantity === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 container py-24 flex flex-col items-center justify-center text-center">
          <TicketIcon className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">عربة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-8">قم باختيار تذاكر للفعالية للمتابعة إلى الدفع.</p>
          <Button onClick={() => router.push(`/${locale}`)}>تصفح الفعاليات</Button>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = mockTicketTypes.reduce((total, ticket) => {
    const qty = selectedTickets[ticket.id] || 0;
    return total + (ticket.price * qty);
  }, 0);
  
  const serviceFee = 10 * totalQuantity;
  const finalTotal = subtotal + serviceFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      eventId: mockEvent.id,
      buyerName: formData.buyerName,
      buyerEmail: formData.buyerEmail,
      buyerPhone: formData.buyerPhone,
      status: 'paid',
      subtotal,
      serviceFee,
      total: finalTotal,
      currency: "ILS",
      createdAt: new Date().toISOString(),
    };

    const newTickets: Ticket[] = [];
    Object.entries(selectedTickets).forEach(([ticketTypeId, qty]) => {
      for (let i = 0; i < qty; i++) {
        const ticketCode = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const seat = selectedSeats[newTickets.length]; // Assign seats sequentially if available

        newTickets.push({
          id: ticketCode,
          orderId,
          eventId: mockEvent.id,
          ticketTypeId,
          attendeeName: formData.buyerName,
          qrCode: ticketCode,
          status: 'valid' as TicketStatus,
          seatId: seat?.id,
          createdAt: new Date().toISOString(),
        });
      }
    });

    addOrder(newOrder, newTickets);
    clearCart();
    router.push(`/${locale}/checkout/success?orderId=${orderId}`);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-primary/10 border-b">
          <div className="container py-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              إتمام الطلب بأمان
            </h1>
          </div>
        </div>

        <div className="container py-10 flex flex-col lg:flex-row gap-8">
          
          {/* Left Form Area */}
          <div className="flex-1 space-y-8">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              
              {/* Buyer Info */}
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6">بيانات المشتري</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">الاسم الكامل *</label>
                    <Input 
                      required 
                      value={formData.buyerName}
                      onChange={e => setFormData({...formData, buyerName: e.target.value})}
                      placeholder="أحمد محمد"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">البريد الإلكتروني *</label>
                      <Input 
                        required 
                        type="email"
                        value={formData.buyerEmail}
                        onChange={e => setFormData({...formData, buyerEmail: e.target.value})}
                        placeholder="ahmed@example.com"
                        dir="ltr"
                        className="rtl:text-right"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">رقم الهاتف *</label>
                      <Input 
                        required 
                        type="tel"
                        value={formData.buyerPhone}
                        onChange={e => setFormData({...formData, buyerPhone: e.target.value})}
                        placeholder="050-000-0000"
                        dir="ltr"
                        className="rtl:text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Payment */}
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6">طريقة الدفع</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-primary bg-primary/5 rounded-xl flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-4 border-primary bg-background"></div>
                      <span className="font-bold">بطاقة ائتمان (Mock)</span>
                    </div>
                    <div className="flex gap-1">
                       <div className="w-8 h-5 bg-muted rounded"></div>
                       <div className="w-8 h-5 bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 border rounded-xl flex items-center justify-center cursor-not-allowed opacity-50">
                        <span className="font-bold">Apple Pay</span>
                     </div>
                     <div className="p-4 border rounded-xl flex items-center justify-center cursor-not-allowed opacity-50">
                        <span className="font-bold">Google Pay</span>
                     </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Right Summary Sidebar */}
          <div className="w-full lg:w-96 shrink-0 space-y-6">
            <div className="bg-ticket-bg text-ticket-text rounded-2xl p-6 shadow-float ticket-dashed-border relative ticket-notch-both">
              <h3 className="font-bold text-lg mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 mb-6">
                {mockTicketTypes.map(ticket => {
                  const qty = selectedTickets[ticket.id];
                  if (!qty) return null;
                  return (
                    <div key={ticket.id} className="flex justify-between items-start text-sm">
                      <div>
                        <div className="font-bold">{ticket.name}</div>
                        <div className="text-ticket-muted">{qty} × {ticket.price} ₪</div>
                      </div>
                      <div className="font-bold">{qty * ticket.price} ₪</div>
                    </div>
                  );
                })}
              </div>

              {selectedSeats.length > 0 && (
                 <div className="py-4 border-y border-ticket-border mb-6">
                    <h4 className="text-sm font-bold mb-2">المقاعد المختارة</h4>
                    <div className="text-xs text-ticket-muted flex flex-wrap gap-1">
                       {selectedSeats.map(s => `الصف ${s.row} مقعد ${s.number}`).join('، ')}
                    </div>
                 </div>
              )}

              <div className="space-y-2 text-sm mb-6 pb-6 border-b border-ticket-border">
                <div className="flex justify-between text-ticket-muted">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ₪</span>
                </div>
                <div className="flex justify-between text-ticket-muted">
                  <span>رسوم الخدمة</span>
                  <span>{serviceFee} ₪</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-xl font-bold">المجموع الكلي</div>
                  <div className="text-xs text-ticket-muted">شامل الضريبة</div>
                </div>
                <div className="text-2xl font-bold text-primary">{finalTotal} ₪</div>
              </div>

              <Button 
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full h-14 text-lg font-bold rounded-xl"
              >
                {loading ? "جاري الدفع..." : "إتمام الطلب"}
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              بإتمامك للطلب، أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بحلفة بلس والمنظّم.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
