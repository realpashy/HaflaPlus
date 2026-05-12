import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { Providers } from "@/components/Providers";
import { locales } from "@/i18n";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoKufi = Noto_Kufi_Arabic({ 
  subsets: ["arabic"], 
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Halfa.Plus | حلفة بلس",
  description: "Your premium event ticketing platform | منصتك المتميزة لحجز تذاكر الفعاليات",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoKufi.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <Providers 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          locale={locale}
          messages={messages}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
