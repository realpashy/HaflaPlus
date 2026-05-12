"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps extends React.ComponentProps<typeof NextThemesProvider> {
  messages: any;
  locale: string;
  children: React.ReactNode;
}

export function Providers({ children, messages, locale, ...props }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jerusalem">
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </NextIntlClientProvider>
  );
}
