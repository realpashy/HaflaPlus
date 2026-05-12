"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore } from "@/store/useStore";
import { mockTicketTypes, mockEvent } from "@/store/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QrCode, Search, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import { Ticket } from "@/types";

export default function CheckInPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState("ar");
  const [ticketCode, setTicketCode] = useState("");
  const { tickets, updateTicketStatus } = useOrderStore();
  const [isClient, setIsClient] = useState(true);
  const [scannedTicket, setScannedTicket] = useState<Ticket | null>(null);
  const [scanResult, setScanResult] = useState<'success' | 'already_used' | 'invalid' | 'error' | null>(null);

  useEffect(() => {
    
    params.then(p => setLocale(p.locale));
  }, [params]);

  if (!isClient) return null;

  const handleScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ticketCode.trim()) return;

    const ticket = tickets.find(t => t.id.toLowerCase() === ticketCode.trim().toLowerCase());
    
    if (!ticket) {
      setScanResult('invalid');
      setScannedTicket(null);
      return;
    }

    setScannedTicket(ticket);

    if (ticket.status === 'valid') {
      setScanResult('success');
    } else if (ticket.status === 'used') {
      setScanResult('already_used');
    } else {
      setScanResult('error'); // cancelled or refunded
    }
  };

  const handleCheckIn = () => {
    if (scannedTicket && scannedTicket.status === 'valid') {
      updateTicketStatus(scannedTicket.id, 'used');
      setScannedTicket({ ...scannedTicket, status: 'used' });
      setScanResult('success');
      // Briefly show success before resetting
      setTimeout(() => {
         resetScanner();
      }, 2000);
    }
  };

  const resetScanner = () => {
    setTicketCode("");
    setScannedTicket(null);
    setScanResult(null);
  };

  const renderResult = () => {
    if (!scanResult) return null;

    if (scanResult === 'invalid') {
      return (
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-bold text-destructive mb-2">تذكرة غير صالحة</h3>
          <p className="text-muted-foreground">تأكد من إدخال الرمز الصحيح.</p>
        </div>
      );
    }

    const type = mockTicketTypes.find(t => t.id === scannedTicket?.ticketTypeId);

    return (
      <div className={`rounded-2xl border p-6 animate-in fade-in zoom-in duration-300 ${
        scanResult === 'success' ? 'bg-success/10 border-success/20' : 
        scanResult === 'already_used' ? 'bg-warning/10 border-warning/20' : 'bg-destructive/10 border-destructive/20'
      }`}>
        <div className="flex flex-col items-center text-center">
           {scanResult === 'success' && <CheckCircle2 className="w-12 h-12 text-success mb-4" />}
           {scanResult === 'already_used' && <AlertTriangle className="w-12 h-12 text-warning mb-4" />}
           {scanResult === 'error' && <AlertCircle className="w-12 h-12 text-destructive mb-4" />}

           <h3 className={`text-xl font-bold mb-2 ${
             scanResult === 'success' ? 'text-success' : 
             scanResult === 'already_used' ? 'text-warning' : 'text-destructive'
           }`}>
             {scanResult === 'success' ? 'تذكرة صالحة' : 
              scanResult === 'already_used' ? 'تم استخدام التذكرة مسبقاً' : 'تذكرة غير صالحة'}
           </h3>

           <div className="bg-background/50 w-full rounded-xl p-4 mt-4 text-start">
             <div className="text-xs text-muted-foreground mb-1">الاسم</div>
             <div className="font-bold mb-3">{scannedTicket?.attendeeName}</div>
             
             <div className="text-xs text-muted-foreground mb-1">الفئة</div>
             <div className="font-bold mb-3">{type?.name}</div>

             <div className="text-xs text-muted-foreground mb-1">الرمز</div>
             <div className="font-mono text-sm">{scannedTicket?.id}</div>
           </div>

           {scanResult === 'success' && scannedTicket?.status === 'valid' && (
             <Button className="w-full mt-6 h-12 text-lg rounded-xl" onClick={handleCheckIn}>
               تأكيد الدخول
             </Button>
           )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 py-8 md:py-16">
        <div className="container max-w-md">
          
          <div className="bg-card rounded-[2rem] border shadow-sm p-6 md:p-8">
             <div className="text-center mb-8">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                 <QrCode className="w-8 h-8" />
               </div>
               <h1 className="text-2xl font-bold mb-2">تسجيل الدخول</h1>
               <p className="text-muted-foreground text-sm">{mockEvent.title}</p>
             </div>

             <form onSubmit={handleScan} className="mb-8 relative">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
               <Input 
                 placeholder="أدخل رمز التذكرة..." 
                 className="pl-4 pr-12 h-14 text-lg font-mono text-center rounded-xl bg-background border-2 focus-visible:ring-primary"
                 value={ticketCode}
                 onChange={(e) => setTicketCode(e.target.value)}
                 dir="ltr"
               />
               <Button type="submit" className="w-full mt-4 h-12 rounded-xl text-base font-bold">
                 فحص التذكرة
               </Button>
             </form>

             <div className="min-h-[300px]">
               {scanResult ? (
                 <>
                   {renderResult()}
                   <Button variant="ghost" className="w-full mt-4 gap-2" onClick={resetScanner}>
                     <RefreshCw className="w-4 h-4" />
                     مسح تذكرة أخرى
                   </Button>
                 </>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <QrCode className="w-16 h-16 mb-4" />
                    <p>أدخل رمز التذكرة للتحقق من صلاحيتها</p>
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
