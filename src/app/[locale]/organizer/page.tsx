"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore } from "@/store/useStore";
import { mockEvent, mockOrganizer } from "@/store/mockData";
import { Button } from "@/components/ui/button";
import { Users, Ticket, DollarSign, Calendar, TrendingUp, Settings, PlusCircle } from "lucide-react";

export default function OrganizerDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState("ar");
  const { orders, tickets } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalTicketsSold = tickets.length;
  const checkIns = tickets.filter(t => t.status === 'used').length;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20">
        
        {/* Dashboard Header */}
        <div className="bg-background border-b">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">مرحباً، {mockOrganizer.name}</h1>
                <p className="text-muted-foreground">نظرة عامة على أداء فعالياتك</p>
              </div>
              <Button className="rounded-full gap-2">
                <PlusCircle className="w-4 h-4" />
                إنشاء فعالية جديدة
              </Button>
            </div>
          </div>
        </div>

        <div className="container py-8 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0 space-y-2">
            <Button variant="secondary" className="w-full justify-start text-start gap-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20">
              <TrendingUp className="w-5 h-5" />
              نظرة عامة
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              فعالياتي
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Ticket className="w-5 h-5 text-muted-foreground" />
              الطلبات والتذاكر
            </Button>
            <Link href={`/${locale}/check-in`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground w-full justify-start text-start h-9 px-4 py-2 rounded-xl">
                 <Users className="w-5 h-5 text-muted-foreground" />
                 تسجيل الدخول (الماسح)
            </Link>
            <div className="pt-4 mt-4 border-t"></div>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Settings className="w-5 h-5 text-muted-foreground" />
              إعدادات المنظم
            </Button>
          </aside>

          {/* Main Dashboard Content */}
          <div className="flex-1 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold mb-1">{totalRevenue} ₪</div>
                <div className="text-sm text-muted-foreground">إجمالي الإيرادات</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-4">
                  <Ticket className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold mb-1">{totalTicketsSold}</div>
                <div className="text-sm text-muted-foreground">التذاكر المباعة</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold mb-1">{checkIns}</div>
                <div className="text-sm text-muted-foreground">عمليات الدخول (Check-ins)</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-muted text-muted-foreground rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold mb-1">1</div>
                <div className="text-sm text-muted-foreground">فعاليات نشطة</div>
              </div>
            </div>

            {/* Active Events */}
            <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">الفعاليات الحالية</h2>
              
              <div className="border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-muted rounded-xl shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mockEvent.heroMedia[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">{mockEvent.title}</h3>
                    <div className="text-sm text-muted-foreground">{mockEvent.city} • {new Date(mockEvent.startsAt).toLocaleDateString()}</div>
                    <div className="mt-1 bg-success/10 text-success px-2 py-0.5 rounded text-xs font-bold w-fit">منشورة</div>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Link href={`/${locale}/events/${mockEvent.id}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex-1 md:w-auto">عرض الفعالية</Link>
                  <Button variant="secondary" size="sm" className="flex-1 md:w-auto">تعديل</Button>
                </div>
              </div>
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">أحدث الطلبات</h2>
                 <Button variant="ghost" size="sm">عرض الكل</Button>
              </div>
              
              {orders.length === 0 ? (
                 <div className="text-center py-8 text-muted-foreground">لا توجد طلبات بعد.</div>
              ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start">
                       <thead className="text-muted-foreground border-b bg-muted/30">
                          <tr>
                             <th className="font-medium p-3 text-start">رقم الطلب</th>
                             <th className="font-medium p-3 text-start">المشتري</th>
                             <th className="font-medium p-3 text-start">المبلغ</th>
                             <th className="font-medium p-3 text-start">الحالة</th>
                          </tr>
                       </thead>
                       <tbody>
                          {orders.slice(0, 5).map(order => (
                             <tr key={order.id} className="border-b last:border-0 hover:bg-muted/10">
                                <td className="p-3 font-mono text-xs">{order.id}</td>
                                <td className="p-3">{order.buyerName}</td>
                                <td className="p-3 font-bold">{order.total} ₪</td>
                                <td className="p-3">
                                   <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-bold">مدفوع</span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
