import Link from "next/link";
import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { formatDate, formatCurrency } from "@/lib/utils";

interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  city: string;
  price: number;
  date: string;
  image?: string;
  category?: string;
}

export function EventCard({
  slug,
  title,
  city,
  price,
  date,
  image = "/mock-stage-main.svg",
}: EventCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/events/${slug}`}
      className="group overflow-hidden rounded-[24px] border border-[#EEE4D7] bg-white shadow-[0_16px_38px_rgba(83,58,23,0.08)] transition hover:translate-y-[-2px] hover:shadow-[0_22px_44px_rgba(83,58,23,0.12)]"
    >
      <div className="relative">
        <img src={image} alt={title} className="h-[112px] w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-[148px]" />
        <div className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#2B2520] shadow-sm md:left-3 md:top-3 md:h-8 md:w-8">
          <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </div>
      </div>

      <div className="space-y-1.5 p-3 text-right md:space-y-2 md:p-4">
        <h3 className="line-clamp-2 text-[1rem] font-extrabold leading-7 text-[#191717] md:text-[1.32rem] md:leading-8">{title}</h3>
        <div className="flex items-center justify-end gap-1 text-[11px] text-[#6D675E] md:text-sm">
          <CalendarDays className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="line-clamp-1">{formatDate(new Date(date), locale === "ar" ? "ar-EG" : "he-IL")}</span>
        </div>
        <div className="flex items-center justify-end gap-1 text-[11px] text-[#6D675E] md:text-sm">
          <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="line-clamp-1">{city}</span>
        </div>
        <div className="flex items-center justify-between pt-1 md:pt-2">
          <div className="flex items-center gap-1 text-[#F5C65B]">
            <Star className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" />
            <span className="text-xs font-bold md:text-sm">{price > 220 ? "+18" : "220"}</span>
          </div>
          <div className="text-base font-extrabold text-[#161616] md:text-lg">{formatCurrency(price)}</div>
        </div>
      </div>
    </Link>
  );
}
