"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "@/app/[locale]/dashboard/student/exchanges/productforproduct/component/FormContext";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { formData, currentStep } = useFormContext();

  const supportedLocales = ["en", "fr"] as const;
  type Locale = (typeof supportedLocales)[number]; // "en" | "fr"

  const currentLocale = supportedLocales.includes(
    pathname.split("/")[1] as Locale
  )
    ? (pathname.split("/")[1] as Locale)
    : "en";

  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);

  useEffect(() => {
    setSelectedLocale(currentLocale);
  }, [currentLocale]);

  const switchLanguage = (locale: Locale) => {
    if (locale === currentLocale) return;

    // Save form data and step to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));

    // Update locale in the pathname without reloading
    const params = new URLSearchParams(searchParams.toString());
    const newPathname = `/${locale}${pathname.slice(3)}`;
    router.replace(`${newPathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-10 right-4 z-50">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">EN</span>
        <div
          className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
          onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
        >
          <div
            className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
              selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
            }`}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700">FR</span>
      </div>
    </div>
  );
}

//for ts error
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useFormContext } from "@/app/[locale]/dashboard/student/exchanges/productforproduct/component/FormContext";

// export default function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const { formData, currentStep } = useFormContext();

//   const supportedLocales = ["en", "fr"];
//   const currentLocale = supportedLocales.includes(pathname.split("/")[1])
//     ? pathname.split("/")[1]
//     : "en";

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale) => {
//     if (locale === currentLocale) return;

//     // Save form data and step to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("currentStep", JSON.stringify(currentStep));

//     // Update locale in the pathname without reloading
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`;
//     router.replace(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="fixed top-16 right-4 z-50">
//       {" "}
//       {/* Changed absolute to fixed and adjusted position */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         <div
//           className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useFormContext } from "@/app/[locale]/dashboard/student/exchanges/productforproduct/component/FormContext";

// export default function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const { formData, currentStep } = useFormContext();

//   const supportedLocales = ["en", "fr"];
//   const currentLocale = supportedLocales.includes(pathname.split("/")[1])
//     ? pathname.split("/")[1]
//     : "en";

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale) => {
//     if (locale === currentLocale) return;

//     // Save form data and step to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("currentStep", JSON.stringify(currentStep));

//     // Update locale in the pathname without reloading
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`;
//     router.replace(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="absolute top-4 right-4 z-50">
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         <div
//           className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import {
//   FormProvider,
//   useFormContext,
// } from "@/app/[locale]/dashboard/student/exchanges/productforproduct/component/FormContext";
// import { useEffect, useState } from "react";

// export default function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const { formData, currentStep } = useFormContext();

//   const supportedLocales = ["en", "fr"];
//   const currentLocale = supportedLocales.includes(pathname.split("/")[1])
//     ? pathname.split("/")[1]
//     : "en";

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale) => {
//     if (locale === currentLocale) return;

//     // Save form data and step to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("currentStep", JSON.stringify(currentStep));

//     // Update locale in the pathname
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`;
//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="absolute top-4 right-4 z-50">
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         <div
//           className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

//og
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const supportedLocales = ["en", "fr"]; // Define your supported locales
//   const defaultLocale = "en"; // Define the default locale

//   // Get the current locale from the pathname
//   const currentLocale = supportedLocales.includes(pathname.split("/")[1])
//     ? pathname.split("/")[1]
//     : defaultLocale;

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     // Update the selected locale when the path changes
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale: string) => {
//     if (locale === currentLocale) return; // Prevent unnecessary reloads

//     // Preserve query parameters
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`; // Replace the locale in the path

//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="absolute top-4 right-4 z-50">
//       <div className="flex items-center space-x-2">
//         {/* English Label */}
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         {/* Switcher */}
//         <div
//           className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         {/* French Label */}
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

//problem
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState, useEffect } from "react";

// export default function LanguageSwitcher() {
//   const t = useTranslations("common"); // Assuming translations exist in `common.json`
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentLocale = pathname.split("/")[1]; // Get the current locale from the URL
//   const supportedLocales = ["en", "fr"]; // Define your supported locales

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     // Update the selected locale when the path changes
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale: string) => {
//     if (locale === currentLocale) return; // Prevent unnecessary reloads

//     // Preserve query parameters
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`; // Replace locale in path (e.g., /en/... -> /fr/...)

//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="absolute top-4 right-4 z-50">
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         <div
//           className="relative w-10 h-6 bg-gray-100 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-8" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

//og
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";

// export default function LanguageSwitcher() {
//   const t = useTranslations("common"); // Assuming translations exist in `common.json`
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentLocale = pathname.split("/")[1]; // Get the current locale from the URL
//   const supportedLocales = ["en", "fr"]; // Define your supported locales

//   const switchLanguage = (locale: string) => {
//     // Preserve query parameters
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`; // Replace locale in path (e.g., /en/... -> /fr/...)

//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       {supportedLocales.map((locale) => (
//         <button
//           key={locale}
//           onClick={() => switchLanguage(locale)}
//           className={`px-3 py-1 rounded ${
//             currentLocale === locale
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           {locale.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   );
// }
