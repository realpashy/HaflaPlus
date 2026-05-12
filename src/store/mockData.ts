import { Event, TicketType, Organizer } from '../types';

export const mockOrganizer: Organizer = {
  id: "org-1",
  name: "Halfa Live",
  slug: "halfa-live",
  logo: "/placeholder-logo.png",
  bio: "محبو غنوتنا وموسيقانا، فريق متخصص بتنظيم الحفلات الموسيقية في جميع أنحاء البلاد.",
  verified: true,
  rating: 4.8,
  whatsapp: "+972500000000"
};

export const mockEvent: Event = {
  id: "evt-1",
  slug: "طربية-الناصرة",
  organizerId: "org-1",
  title: "ليلة طربية في الناصرة",
  subtitle: "أمسية موسيقية شرقية مع أجواء فاخرة وتجربة حجز سهلة وآمنة",
  description: "أمسية موسيقية شرقية مميزة تجمع بين الطرب الأصيل والأجواء الفاخرة في قلب الناصرة. استمتع بتجربة سلسة من لحظة الحجز حتى دخول القاعة، مع تذاكر رقمية آمنة ودعم مباشر عند الحاجة.",
  category: "حفلات موسيقية",
  tags: ["عائلي", "مباشر", "مناسب للمجموعات"],
  type: "physical",
  status: "published",
  city: "الناصرة",
  venueName: "قاعة بايس",
  address: "الناصرة، شارع الفنون",
  startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
  endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 3).toISOString(),
  timezone: "Asia/Jerusalem",
  ageRestriction: "+16",
  heroMedia: ["/placeholder-hero.jpg"],
  hasReservedSeating: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockTicketTypes: TicketType[] = [
  {
    id: "tt-1",
    eventId: "evt-1",
    name: "VIP",
    description: "مقاعد أمامية، دخول سريع، هدية",
    price: 220,
    currency: "ILS",
    quantityTotal: 50,
    quantitySold: 42,
    quantityRemaining: 8,
    benefits: ["مقاعد أمامية", "دخول سريع", "هدية خاصة"],
    isSoldOut: false,
    requiresStudentId: false,
    sortOrder: 1
  },
  {
    id: "tt-2",
    eventId: "evt-1",
    name: "Standard",
    description: "مقاعد مضمونة، دخول عام",
    price: 120,
    currency: "ILS",
    quantityTotal: 200,
    quantitySold: 158,
    quantityRemaining: 42,
    benefits: ["مقاعد مضمونة", "دخول عام"],
    isSoldOut: false,
    requiresStudentId: false,
    sortOrder: 2
  },
  {
    id: "tt-3",
    eventId: "evt-1",
    name: "Student",
    description: "يتطلب بطاقة طالب",
    price: 80,
    currency: "ILS",
    quantityTotal: 50,
    quantitySold: 35,
    quantityRemaining: 15,
    benefits: ["يتطلب بطاقة طالب"],
    isSoldOut: false,
    requiresStudentId: true,
    sortOrder: 3
  },
  {
    id: "tt-4",
    eventId: "evt-1",
    name: "Economy",
    description: "مقاعد خلفية",
    price: 50,
    currency: "ILS",
    quantityTotal: 100,
    quantitySold: 100,
    quantityRemaining: 0,
    benefits: [],
    isSoldOut: true,
    requiresStudentId: false,
    sortOrder: 4
  }
];

export const mockRelatedEvents = [
  {
    id: "evt-2",
    title: "ستاند أب كوميدي في حيفا",
    city: "حيفا",
    price: 220,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString()
  },
  {
    id: "evt-3",
    title: "حفلة طرب في سخنين",
    city: "سخنين",
    price: 180,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString()
  }
];
