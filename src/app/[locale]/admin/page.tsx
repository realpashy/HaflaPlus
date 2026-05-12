"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Ticket, Activity, Settings, List, Building } from "lucide-react";

export default function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState("ar");
  const { orders } = useOrderStore();
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20">
        
        <div className="bg-background border-b">
          <div className="container py-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
               <ShieldAlert className="w-8 h-8 text-primary" />
               لوحة تحكم المنصة (Admin)
            </h1>
          </div>
        </div>

        <div className="container py-8 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0 space-y-2">
            <Button variant="secondary" className="w-full justify-start text-start gap-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20">
              <Activity className="w-5 h-5" />
              نظرة عامة
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <List className="w-5 h-5 text-muted-foreground" />
              الفعاليات
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Building className="w-5 h-5 text-muted-foreground" />
              المنظمون
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Users className="w-5 h-5 text-muted-foreground" />
              المستخدمون
            </Button>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Ticket className="w-5 h-5 text-muted-foreground" />
              الطلبات (مراقبة)
            </Button>
            <div className="pt-4 mt-4 border-t"></div>
            <Button variant="ghost" className="w-full justify-start text-start gap-3 rounded-xl">
              <Settings className="w-5 h-5 text-muted-foreground" />
              إعدادات المنصة
            </Button>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-sm text-muted-foreground">منظم معتمد</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="text-2xl font-bold mb-1">45</div>
                <div className="text-sm text-muted-foreground">فعالية نشطة</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="text-2xl font-bold mb-1">1,240</div>
                <div className="text-sm text-muted-foreground">مستخدم مسجل</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="text-2xl font-bold mb-1 text-primary">{orders.length}</div>
                <div className="text-sm text-muted-foreground">الطلبات الكلية</div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">طلبات بانتظار الموافقة</h2>
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-2xl">
                 لا توجد طلبات جديدة معلقة.
              </div>
            </div>

            {/* Audit Log Placeholder */}
            <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">سجل النظام (Audit Log)</h2>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-sm py-2 border-b">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-success"></div>
                       <span>قام System بتفعيل حساب منظم &quot;Halfa Live&quot;</span>
                    </div>
                    <div className="text-muted-foreground">منذ ساعتين</div>
                 </div>
                 <div className="flex items-center justify-between text-sm py-2 border-b">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary"></div>
                       <span>تم نشر فعالية &quot;ليلة طربية في الناصرة&quot;</span>
                    </div>
                    <div className="text-muted-foreground">منذ 5 ساعات</div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
