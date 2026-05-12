"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown } from "lucide-react";

export default function MembershipsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 pb-24">
        <div className="bg-primary/5 border-b">
          <div className="container py-16 text-center max-w-3xl">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
               <Crown className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">عضوية حلفة بلس</h1>
            <p className="text-xl text-muted-foreground">
              ارتقِ بتجربتك. احصل على أولوية الحجز، خصومات حصرية، ومقاعد مخصصة للأعضاء فقط.
            </p>
          </div>
        </div>

        <div className="container py-16">
           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              <div className="bg-card rounded-[2rem] p-8 border shadow-sm flex flex-col relative overflow-hidden">
                 <h3 className="text-xl font-bold mb-2">مجاني</h3>
                 <div className="text-3xl font-extrabold mb-6">0 ₪ <span className="text-sm font-normal text-muted-foreground">/ شهرياً</span></div>
                 <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm">تصفح الفعاليات</span></li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm">حجز التذاكر العادية</span></li>
                    <li className="flex gap-2 text-muted-foreground"><Check className="w-5 h-5 shrink-0 opacity-50" /> <span className="text-sm">لا يشمل أولوية الحجز</span></li>
                 </ul>
                 <Button variant="outline" className="w-full rounded-xl">الحساب الحالي</Button>
              </div>

              <div className="bg-ticket-bg text-ticket-text rounded-[2rem] p-8 border border-primary shadow-float flex flex-col relative overflow-hidden transform md:-translate-y-4">
                 <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-center text-xs font-bold py-1">الأكثر شعبية</div>
                 <h3 className="text-xl font-bold mb-2 mt-2 text-primary">Halfa+ Member</h3>
                 <div className="text-3xl font-extrabold mb-6">29 ₪ <span className="text-sm font-normal text-ticket-muted">/ شهرياً</span></div>
                 <ul className="space-y-4 mb-8 flex-1 text-ticket-muted">
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm text-ticket-text">أولوية حجز قبل 24 ساعة</span></li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm text-ticket-text">خصم 5% على التذاكر</span></li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm text-ticket-text">دخول فعاليات الأعضاء فقط</span></li>
                 </ul>
                 <Button className="w-full rounded-xl">اشترك الآن</Button>
              </div>

              <div className="bg-card rounded-[2rem] p-8 border shadow-sm flex flex-col relative overflow-hidden">
                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Star className="w-5 h-5 text-warning fill-warning" /> VIP</h3>
                 <div className="text-3xl font-extrabold mb-6">99 ₪ <span className="text-sm font-normal text-muted-foreground">/ شهرياً</span></div>
                 <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm">أولوية حجز قبل 48 ساعة</span></li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm">إلغاء واسترداد مجاني (Premium)</span></li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-sm">دخول لاونج الـ VIP في الفعاليات</span></li>
                 </ul>
                 <Button variant="outline" className="w-full rounded-xl hover:bg-warning/10 hover:text-warning hover:border-warning">اشترك الآن</Button>
              </div>

           </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
