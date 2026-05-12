import { HeroCarousel } from "@/components/event/details/HeroCarousel";
import { TicketModule } from "@/components/event/details/TicketModule";
import { SeatingSelection } from "@/components/event/details/SeatingSelection";
import { DesktopSidebar } from "@/components/event/details/DesktopSidebar";
import { MobileStickyFooter } from "@/components/event/details/MobileStickyFooter";
import { MobileBottomNav } from "@/components/event/details/MobileBottomNav";
import { EventCard } from "@/components/event/EventCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockEvent, mockOrganizer, mockRelatedEvents, mockTicketTypes } from "@/store/mockData";
import { ArrowLeft, Bell, CalendarDays, Heart, MapPin, Share2 } from "lucide-react";

function TopAction({
  label,
  icon,
  compact = false,
}: {
  label: string;
  icon?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full border border-[#E8DFD2] bg-white font-bold text-[#282320] shadow-[0_4px_12px_rgba(84,62,30,0.05)] ${compact ? "px-3 py-2 text-[12px]" : "px-4 py-2.5 text-sm"}`}
    >
      {icon}
      {label ? <span>{label}</span> : null}
    </button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[30px] border border-[#EFE6D8] bg-white p-6 shadow-[0_16px_52px_rgba(97,66,29,0.08)] md:p-8">
      <h2 className="mb-6 text-[1.95rem] font-extrabold text-[#151515] md:text-[2.4rem]">{title}</h2>
      {children}
    </section>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const event = {
    ...mockEvent,
    title: "ليلة طربية في الناصرة",
    subtitle: "أمسية موسيقية شرقية مع أجواء فاخرة وتجربة حجز سهلة وآمنة",
    venueName: "قاعة بايس",
    city: "الناصرة",
    heroMedia: ["/mock-stage-main.svg", "/mock-stage-side.svg", "/mock-drum.svg", "/mock-stage-main.svg", "/mock-stage-side.svg", "/mock-drum.svg"],
  };

  const organizer = {
    ...mockOrganizer,
    name: "Hafla Live",
    logo: "/mock-organizer-avatar.svg",
  };

  const related = [
    {
      id: "evt-1",
      slug: event.slug,
      title: "ستاند أب كوميدي في حيفا",
      city: "قاعة بايس . الناصرة",
      price: 220,
      date: "2026-05-23T20:30:00.000Z",
      image: "/mock-stage-side.svg",
    },
    {
      id: "evt-2",
      slug: event.slug,
      title: "حفلة طرب في سخنين",
      city: "قاعة بايس . الناصرة",
      price: 220,
      date: "2026-05-24T20:30:00.000Z",
      image: "/mock-stage-main.svg",
    },
    {
      id: "evt-3",
      slug: event.slug,
      title: "حفلة الكوميدي في سخنين",
      city: "قاعة بايس . الناصرة",
      price: 230,
      date: "2026-05-25T20:30:00.000Z",
      image: "/mock-drum.svg",
    },
    {
      id: "evt-4",
      slug: event.slug,
      title: "حفلة طرب في سحنة حيفا",
      city: "قاعة بايس . الناصرة",
      price: 220,
      date: "2026-05-26T20:30:00.000Z",
      image: "/mock-stage-side.svg",
    },
  ];

  return (
    <>
      <main className="relative min-h-screen overflow-x-hidden bg-[#FBF6EE] pb-[220px] text-right xl:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-120px] top-[120px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(255,211,145,0.38)_0%,_rgba(255,211,145,0)_72%)]" />
          <div className="absolute right-[-80px] top-[520px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(215,255,170,0.25)_0%,_rgba(215,255,170,0)_70%)]" />
          <div className="absolute left-[28%] top-[760px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(254,229,186,0.26)_0%,_rgba(254,229,186,0)_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-3 py-4 md:px-6 xl:px-8">
          <header className="mb-5 hidden rounded-[34px] border border-[#F0E5D7] bg-white/88 px-4 py-4 shadow-[0_18px_48px_rgba(96,71,29,0.06)] backdrop-blur-md md:px-6 xl:mb-8 xl:block">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <TopAction label="AR / עברית" />
                <TopAction label="تذكّري" icon={<Bell className="h-4 w-4" />} />
                <TopAction label="مشاركة" icon={<Share2 className="h-4 w-4" />} />
                <TopAction label="" icon={<Heart className="h-4 w-4" />} />
              </div>

              <div className="text-center text-[2rem] font-extrabold tracking-tight text-[#131313]">Hafla+</div>

              <div className="flex justify-end">
                <TopAction label="العودة للفعاليات" icon={<ArrowLeft className="h-4 w-4" />} />
              </div>
            </div>
          </header>

          <header className="mb-4 rounded-[34px] border border-[#F0E5D7] bg-white/90 px-4 py-4 shadow-[0_18px_48px_rgba(96,71,29,0.06)] backdrop-blur-md xl:hidden">
            <div className="flex items-center justify-between">
              <div className="text-[1.9rem] font-extrabold tracking-tight text-[#131313]">Hafla+</div>
              <div className="flex items-center gap-2">
                <TopAction compact label="AR / עברית" />
                <TopAction compact label="تذكّري" icon={<Bell className="h-3.5 w-3.5" />} />
                <TopAction compact label="مشاركة" icon={<Share2 className="h-3.5 w-3.5" />} />
                <TopAction compact label="" icon={<Heart className="h-3.5 w-3.5" />} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <TopAction compact label="العودة للفعاليات" icon={<ArrowLeft className="h-3.5 w-3.5" />} />
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start xl:[direction:ltr]">
            <div className="space-y-6 xl:[direction:rtl]">
              <HeroCarousel media={event.heroMedia} />

              <section className="grid gap-4 xl:grid-cols-[230px_minmax(0,1fr)] xl:items-center xl:[direction:ltr]">
                <div className="order-2 rounded-[30px] border border-[#EADFD2] bg-white px-6 py-5 shadow-[0_14px_36px_rgba(92,63,23,0.07)] xl:order-none xl:px-7 xl:py-7">
                  <div className="text-[1.6rem] font-bold text-[#1D1B18]">يبدأ خلال</div>
                  <div className="mt-2 text-[3.2rem] font-extrabold leading-none tracking-tight text-[#151515] md:text-[3.6rem]">02:45:12</div>
                </div>

                <div className="order-1 space-y-4 rounded-[30px] bg-transparent px-1 py-1 xl:order-none xl:[direction:rtl]">
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full bg-[#7A58FF] px-3.5 py-1.5 text-xs font-bold text-white md:px-4 md:text-sm">حفلات موسيقية</span>
                    <span className="rounded-full border border-[#E6E0D6] bg-white px-3.5 py-1.5 text-xs font-bold text-[#2F2C28] md:px-4 md:text-sm">عائلي</span>
                    <span className="rounded-full border border-[#E6E0D6] bg-white px-3.5 py-1.5 text-xs font-bold text-[#2F2C28] md:px-4 md:text-sm">مباشر</span>
                    <span className="rounded-full border border-[#E6E0D6] bg-white px-3.5 py-1.5 text-xs font-bold text-[#2F2C28] md:px-4 md:text-sm">مناسب للمجموعات</span>
                  </div>

                  <div className="space-y-2.5">
                    <h1 className="text-[2.4rem] font-extrabold leading-[1.1] text-[#111111] md:text-[4.5rem]">
                      {event.title}
                    </h1>
                    <p className="text-base font-medium leading-8 text-[#37312A] md:text-[1.75rem] md:leading-10">
                      {event.subtitle}
                    </p>
                    <div className="flex items-center justify-end gap-2 text-base font-bold text-[#262321] md:text-lg">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                      <span>{event.venueName}، {event.city}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2.5">
                    <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
                      <div className="text-right">
                        <div className="text-[1.45rem] font-extrabold text-[#151515] md:text-[1.75rem]">+540 شخص مهتم</div>
                        <div className="text-sm text-[#5E564D] md:text-base">انضم أحمد و12 آخرون من منطقتك</div>
                      </div>
                      <div className="flex shrink-0 -space-x-3 rtl:space-x-reverse">
                        {[0, 1, 2].map((index) => (
                          <img key={index} src="/mock-organizer-avatar.svg" alt="" className="h-10 w-10 rounded-full border-2 border-[#FBF6EE] bg-white object-cover md:h-11 md:w-11" />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#39342E] md:text-base">تذاكر أصلية . دفع آمن . دعم واتساب</div>
                  </div>
                </div>
              </section>

              <TicketModule tickets={mockTicketTypes} />
              <SeatingSelection eventId={event.id} />

              <SectionCard title="اقرأ المزيد">
                <div className="space-y-6 text-lg leading-9 text-[#4C4741]">
                  <p>
                    أمسية موسيقية شرقية مميزة تُقام داخل فضاء دافئ وفاخر، مع تجربة دخول مريحة ومسار حجز رقمي سريع.
                    هذه الصفحة مصممة لتقود الزائر من اكتشاف الحدث وحتى اختيار المقعد والدفع بأقل قدر ممكن من التشتيت.
                  </p>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-[1.8rem] font-extrabold text-[#181818]">الجدول الزمني</h3>
                      <div className="space-y-3">
                        {[
                          ["19:00", "فتح الأبواب"],
                          ["20:30", "بداية العرض"],
                          ["23:00", "نهاية الفعالية"],
                        ].map(([time, label]) => (
                          <div key={time} className="flex items-center justify-between rounded-[18px] bg-[#FAF7F1] px-4 py-3">
                            <span className="font-bold text-[#171717]">{label}</span>
                            <span className="font-semibold text-[#6D675E]">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-[1.8rem] font-extrabold text-[#181818]">الأسئلة الشائعة</h3>
                      <Accordion className="space-y-3">
                        <AccordionItem value="refund" className="overflow-hidden rounded-[18px] border border-[#EEE5D9] bg-[#FBF9F3] px-4">
                          <AccordionTrigger className="py-4 text-lg font-bold hover:no-underline">متى عليّ أن أصل؟</AccordionTrigger>
                          <AccordionContent className="pb-4 text-base text-[#6D665D]">
                            يفضّل الوصول قبل بداية العرض بنحو 30 دقيقة لتسهيل الدخول والوصول إلى المقاعد.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="seat" className="overflow-hidden rounded-[18px] border border-[#EEE5D9] bg-[#FBF9F3] px-4">
                          <AccordionTrigger className="py-4 text-lg font-bold hover:no-underline">ماذا لو تم حجز المقاعد المجاورة؟</AccordionTrigger>
                          <AccordionContent className="pb-4 text-base text-[#6D665D]">
                            ستظهر لك المقاعد المتبقية بصرياً داخل الخريطة، ويمكنك تغيير الفلتر للعثور على أفضل بديل.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <section className="space-y-5 pt-2">
                <div className="flex items-center justify-between">
                  <button type="button" className="text-lg font-semibold text-[#3A352F]">اقرأ المزيد</button>
                  <h2 className="text-[2.1rem] font-extrabold text-[#151515] md:text-[2.7rem]">الحدثات المتابعة</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
                  {related.map((item) => (
                    <EventCard
                      key={item.id}
                      id={item.id}
                      slug={item.slug}
                      title={item.title}
                      city={item.city}
                      price={item.price}
                      date={item.date}
                      image={item.image}
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="xl:[direction:rtl]">
              <DesktopSidebar event={event} organizer={organizer} locale={locale} />
            </div>
          </div>
        </div>
      </main>

      <MobileStickyFooter tickets={mockTicketTypes} title={event.title} image="/mock-stage-main.svg" />
      <MobileBottomNav />
    </>
  );
}
