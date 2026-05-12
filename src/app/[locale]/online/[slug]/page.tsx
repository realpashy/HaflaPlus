"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockEvent } from "@/store/mockData";
import { Button } from "@/components/ui/button";
import { MonitorPlay, Lock, Calendar, ExternalLink } from "lucide-react";

export default function OnlineEventPage() {
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    
  }, []);

  if (!isClient) return null;

  // Mocking that the user has purchased the ticket, but the event hasn't started yet.
  const hasAccess = true;
  const isLive = false;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 flex flex-col">
        <div className="flex-1 container py-12 flex items-center justify-center min-h-[60vh]">
           <div className="bg-card w-full max-w-2xl rounded-[2rem] border shadow-sm overflow-hidden">
              <div className="bg-ticket-bg text-ticket-text p-8 text-center relative ticket-dashed-border">
                 <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                    <MonitorPlay className="w-8 h-8 ml-1" />
                 </div>
                 <div className="bg-primary/20 text-primary w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold mb-4">
                    فعالية عن بُعد (أونلاين)
                 </div>
                 <h1 className="text-2xl font-bold mb-2">{mockEvent.title}</h1>
                 <div className="text-ticket-muted text-sm">{new Date(mockEvent.startsAt).toLocaleDateString()}</div>
              </div>
              
              <div className="p-8 text-center">
                 {!hasAccess ? (
                    <div className="space-y-4">
                       <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                       <h2 className="text-xl font-bold">هذه الفعالية خاصة</h2>
                       <p className="text-muted-foreground mb-6">يجب شراء تذكرة للوصول إلى رابط البث المباشر.</p>
                       <Button className="rounded-full px-8">شراء تذكرة</Button>
                    </div>
                 ) : !isLive ? (
                    <div className="space-y-6">
                       <Calendar className="w-12 h-12 text-primary mx-auto mb-2" />
                       <h2 className="text-xl font-bold">الفعالية لم تبدأ بعد</h2>
                       <p className="text-muted-foreground max-w-sm mx-auto">
                          سيتم عرض رابط الدخول المباشر هنا قبل 15 دقيقة من موعد بدء الفعالية.
                       </p>
                       
                       <div className="bg-muted/50 p-6 rounded-2xl border flex flex-col items-center gap-2">
                          <div className="text-sm font-bold text-muted-foreground">يبدأ البث خلال</div>
                          <div className="text-4xl font-mono font-bold tracking-widest text-primary">02:45:12</div>
                       </div>
                       
                       <Button variant="outline" className="rounded-full gap-2">
                          <Calendar className="w-4 h-4" />
                          أضف تنبيه للتقويم
                       </Button>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                          <div className="w-3 h-3 bg-destructive rounded-full" />
                       </div>
                       <h2 className="text-xl font-bold">الفعالية بدأت!</h2>
                       <p className="text-muted-foreground">البث المباشر متاح الآن.</p>
                       <Button size="lg" className="rounded-full gap-2 h-14 px-8 w-full sm:w-auto">
                          انضم إلى البث <ExternalLink className="w-4 h-4 rtl:-scale-x-100" />
                       </Button>
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
