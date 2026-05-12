import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/event/details/HeroCarousel";
import { TicketModule } from "@/components/event/details/TicketModule";
import { SeatingSelection } from "@/components/event/details/SeatingSelection";
import { DesktopSidebar } from "@/components/event/details/DesktopSidebar";
import { MobileStickyFooter } from "@/components/event/details/MobileStickyFooter";
import { mockEvent, mockTicketTypes, mockOrganizer, mockRelatedEvents } from "@/store/mockData";
import { Users, Info, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EventCard } from "@/components/event/EventCard";

export default async function EventDetailsPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  
  const event = mockEvent;
  const tickets = mockTicketTypes;
  const organizer = mockOrganizer;

  return (
    <>
      <Header />
      <main className="flex-1 bg-background relative pb-24 md:pb-0">
        <div className="container py-6 lg:py-10">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
              
              <HeroCarousel media={event.heroMedia} />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                    {event.category}
                  </div>
                  {event.tags.map((tag, i) => (
                    <div key={i} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </div>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  {event.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground">
                  {event.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium mt-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {event.venueName}، {event.city}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 bg-muted/50 p-3 rounded-2xl w-fit border shadow-sm">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary/20 overflow-hidden">
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 overflow-hidden">
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-warning/20 overflow-hidden">
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">+540 شخص مهتم</div>
                    <div className="text-muted-foreground text-xs">انضم أحمد و12 آخرون من منطقتك</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                 <div className="text-center md:text-start">
                    <div className="text-sm text-muted-foreground font-bold mb-1">يبدأ خلال</div>
                    <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                       02:45:12
                    </div>
                 </div>
                 <div className="hidden md:flex flex-wrap gap-2 items-center justify-end">
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 bg-muted px-4 py-2 rounded-full">
                       تذاكر أصلية
                    </div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 bg-muted px-4 py-2 rounded-full">
                       دفع آمن
                    </div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 bg-muted px-4 py-2 rounded-full">
                       دعم واتساب
                    </div>
                 </div>
              </div>

              <TicketModule tickets={tickets} />
              
              {event.hasReservedSeating && (
                 <SeatingSelection eventId={event.id} />
              )}

              <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm mt-4">
                <h2 className="text-2xl font-bold mb-6">عن الفعالية</h2>
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{event.description}</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                     <Users className="w-4 h-4 text-primary" /> مناسب للعائلات
                  </div>
                  <div className="bg-muted text-foreground px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                     <Info className="w-4 h-4 text-primary" /> دخول بالـ QR
                  </div>
                  <div className="bg-muted text-foreground px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                     <Info className="w-4 h-4 text-primary" /> مواقف قريبة
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">جدول الفعالية</h2>
                <div className="space-y-6 relative before:absolute before:inset-y-0 before:right-[7px] before:w-px before:bg-border">
                  {[
                    { time: "19:00", title: "فتح الأبواب" },
                    { time: "20:00", title: "استقبال وترحيب" },
                    { time: "20:30", title: "بداية العرض" },
                    { time: "23:00", title: "نهاية الفعالية" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative">
                       <div className="w-4 h-4 rounded-full bg-primary absolute right-0 top-1 ring-4 ring-background"></div>
                       <div className="w-16 text-sm font-bold text-muted-foreground pt-0.5">{item.time}</div>
                       <div className="font-bold">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
                <Accordion className="w-full">
                  <AccordionItem value="q1" className="border-b-0 mb-2 bg-muted/30 px-4 rounded-xl">
                    <AccordionTrigger className="hover:no-underline font-bold text-start">هل يمكن استرجاع التذكرة؟</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      نعم، يمكن استرجاع التذكرة حتى 48 ساعة قبل موعد الفعالية حسب الشروط والأحكام.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2" className="border-b-0 mb-2 bg-muted/30 px-4 rounded-xl">
                    <AccordionTrigger className="hover:no-underline font-bold text-start">هل التذكرة تصل عبر البريد أو واتساب؟</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      تصلك التذكرة الرقمية فوراً بعد الدفع عبر البريد الإلكتروني وواتساب، ويمكنك الوصول إليها دائماً عبر حسابك.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3" className="border-b-0 mb-2 bg-muted/30 px-4 rounded-xl">
                    <AccordionTrigger className="hover:no-underline font-bold text-start">هل المقاعد مرقمة؟</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      نعم، في حال كان نوع التذكرة يشمل مقاعد مخصصة، يمكنك اختيار مقعدك من الخريطة التفاعلية.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

            </div>

            <DesktopSidebar event={event} organizer={organizer} locale={locale} />
            
          </div>

          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6">فعاليات قريبة منك</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockRelatedEvents.map((e, i) => (
                <EventCard 
                  key={i}
                  id={e.id}
                  slug={e.id}
                  title={e.title}
                  city={e.city}
                  price={e.price}
                  date={e.date}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
      
      <MobileStickyFooter tickets={tickets} />
      <Footer />
    </>
  );
}
