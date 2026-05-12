import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/event/EventCard";
import { Button } from "@/components/ui/button";
import { mockEvent, mockRelatedEvents, mockTicketTypes } from "@/store/mockData";
import { CalendarDays, MapPin, Search, ShieldCheck, Sparkles, Ticket } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const featuredEvents = [
    {
      id: mockEvent.id,
      slug: mockEvent.slug,
      title: mockEvent.title,
      city: mockEvent.city,
      price: mockTicketTypes[1]?.price ?? mockTicketTypes[0]?.price ?? 0,
      date: mockEvent.startsAt,
      category: mockEvent.category,
      image: mockEvent.heroMedia[0],
    },
    ...mockRelatedEvents.map((event) => ({
      id: event.id,
      slug: mockEvent.slug,
      title: event.title,
      city: event.city,
      price: event.price,
      date: event.date,
      category: "فعاليات مقترحة",
      image: mockEvent.heroMedia[0],
    })),
  ];

  const localeTag = locale === "he" ? "he-IL" : "ar-EG";

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="border-b bg-gradient-to-b from-primary/10 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
                  <Sparkles className="h-4 w-4 text-primary" />
                  احجز فعالياتك خلال دقائق وبواجهة مصممة للسوق المحلي
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
                    Hafla.plus
                    <span className="block text-primary">تجربة حجز تذاكر أنيقة وسريعة للفعاليات</span>
                  </h1>
                  <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                    اكتشف الحفلات والعروض والفعاليات القريبة منك، اختر مقاعدك، وادفع بثقة لتحصل على تذكرتك الرقمية فورًا.
                  </p>
                </div>

                <div className="grid gap-3 rounded-[2rem] border bg-card p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
                  <div className="flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 text-sm text-muted-foreground">
                    <Search className="h-4 w-4 text-primary" />
                    ابحث عن فعالية، مدينة أو فنان
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    الناصرة، حيفا، سخنين والمزيد
                  </div>
                  <Link href={`/${locale}/events/${mockEvent.slug}`} className="w-full md:w-auto">
                    <Button className="h-full w-full rounded-2xl px-6">ابدأ الحجز</Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="rounded-full bg-secondary/10 px-4 py-2 font-medium text-secondary">
                    +540 مهتم بهذه الفعالية
                  </div>
                  <div className="rounded-full bg-muted px-4 py-2 font-medium text-muted-foreground">
                    دفع آمن وتذاكر QR
                  </div>
                  <div className="rounded-full bg-muted px-4 py-2 font-medium text-muted-foreground">
                    دعم عربي وواجهة RTL
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">الفعالية المميزة هذا الأسبوع</div>
                    <h2 className="mt-2 text-2xl font-bold">{mockEvent.title}</h2>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {mockEvent.category}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.5rem] bg-muted/60 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {formatDate(new Date(mockEvent.startsAt), localeTag)}
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {mockEvent.venueName}، {mockEvent.city}
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{mockEvent.subtitle}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border bg-background p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Ticket className="h-4 w-4 text-primary" />
                        يبدأ من
                      </div>
                      <div className="text-xl font-bold">
                        {formatCurrency(mockTicketTypes[1]?.price ?? mockTicketTypes[0]?.price ?? 0)}
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-background p-4">
                      <div className="mb-2 text-sm font-medium text-muted-foreground">المتبقي</div>
                      <div className="text-xl font-bold">{mockTicketTypes.reduce((sum, ticket) => sum + ticket.quantityRemaining, 0)} تذكرة</div>
                    </div>
                    <div className="rounded-2xl border bg-background p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        الحجز
                      </div>
                      <div className="text-xl font-bold">فوري وآمن</div>
                    </div>
                  </div>

                  <Link href={`/${locale}/events/${mockEvent.slug}`}>
                    <Button className="w-full rounded-2xl">عرض صفحة الفعالية</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-10 md:py-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">فعاليات مقترحة لك</h2>
              <p className="mt-2 text-muted-foreground">
                مجموعة أولية من الفعاليات المعروضة داخل نسخة MVP التي بناها Jules.
              </p>
            </div>
            <Link href={`/${locale}/tickets`}>
              <Button variant="outline" className="rounded-full">
                تذاكري
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                slug={event.slug}
                title={event.title}
                city={event.city}
                price={event.price}
                date={event.date}
                category={event.category}
                image={event.image}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
