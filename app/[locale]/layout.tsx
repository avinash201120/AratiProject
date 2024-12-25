import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import React from "react";
import "../globals.css";
import { Providers } from "../Provider";
import ReduxProvider from "@/store/ReduxProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
// import { FormProvider } from "./dashboard/student/exchanges/productforproduct/component/FormContext";
import ClientWrapper from "./dashboard/ClientWrapper";
import { Toaster } from "react-hot-toast";

// Load custom fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Function to dynamically load translations
async function getMessages(locale: string) {
  try {
    const messages = (await import(`../../locales/${locale}/common.json`))
      .default;
    return messages;
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error(
        `Error loading translations for locale "${locale}": ${error.message}`
      );
    } else {
      console.error(
        `An unknown error occurred while loading translations for locale "${locale}".`
      );
    }
    return null;
  }
}

// async function getMessages(locale: string) {
//   try {
//     const messages = (await import(`../../locales/${locale}/common.json`))
//       .default;
//     return messages;
//   } catch (error) {
//     console.error(
//       `Error loading translations for locale "${locale}": ${error.message}`
//     );
//     return null;
//   }
// }

// Layout Component
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Supported locales
  const supportedLocales = ["en", "fr"];

  // Validate locale
  if (!supportedLocales.includes(locale)) {
    console.error(`Unsupported locale "${locale}". Redirecting to 404.`);
    notFound();
  }

  // Load translations for the given locale
  const messages = await getMessages(locale);

  // If translations are not found, redirect to 404
  if (!messages) {
    console.error(`Missing translation messages for locale "${locale}".`);
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Providers */}
        <Providers>
          <ReduxProvider>
            {/* Internationalization Provider */}
            <NextIntlClientProvider locale={locale} messages={messages}>
              {/* Language Switcher */}
              {/* <FormProvider> */}
              <ClientWrapper>
                <LanguageSwitcher />
                <Toaster position="top-right" reverseOrder={false} />
                {children}
              </ClientWrapper>
              {/* </FormProvider> */}
            </NextIntlClientProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
