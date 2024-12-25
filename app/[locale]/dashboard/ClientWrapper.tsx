"use client";

import { FormProvider } from "@/app/[locale]/dashboard/student/exchanges/productforproduct/component/FormContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}
