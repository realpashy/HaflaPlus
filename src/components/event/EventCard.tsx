import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLocale } from "next-intl";

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

export function EventCard({ id, slug, title, city, price, date, image = "/placeholder-hero.jpg", category }: EventCardProps) {
  const locale = useLocale();
  
  return (
    <div className="group relative rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-80 hover:opacity-100 bg-secondary text-secondary-foreground flex items-center justify-center cursor-pointer shadow-sm">
          <Heart className="h-4 w-4" />
        </div>
        {category && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-background/90 text-xs font-medium backdrop-blur-sm">
            {category}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="shrink-0 font-medium">المدينة:</span>
            <span>{city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="shrink-0 font-medium">التاريخ:</span>
            <span>{formatDate(new Date(date), locale === 'ar' ? 'ar-EG' : 'he-IL')}</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="font-bold text-primary flex items-center gap-1">
              <span className="text-muted-foreground font-normal text-xs">من</span>
              {formatCurrency(price)}
            </div>
            <Link href={`/${locale}/events/${slug}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-full px-3 text-xs">
              احجز الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
