import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Share, Heart, Bell } from 'lucide-react';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-bold text-xl">Halfa+</span>
          </Link>
          <div className="hidden md:flex">
            <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              العودة للفعاليات
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <Share className="h-4 w-4" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <Bell className="h-4 w-4" />
              ذكّرني
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-full px-1">
            <Link href={locale === 'ar' ? '/he' : '/ar'} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-full px-3">
              {locale === 'ar' ? 'עברית' : 'AR'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
