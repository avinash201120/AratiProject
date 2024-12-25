"use client";

import React from "react";
// import { useFormContext, FormProvider } from "./component/FormContext";
import MultiStepForm from "./MultistepForm";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentStep } from "@/store/slices/serviceForProductFormSlice";

const PageContent = () => {
  const dispatch = useDispatch();
  const t = useTranslations("proposeExchangeOffer");
  // const { currentStep, handleNext } = useFormContext();
  const { currentStep } = useSelector(
    (state: RootState) => state.serviceForProductExchangeForm
  );

  const handleNext = () => dispatch(setCurrentStep(currentStep + 1));
  // const handleBack = () => dispatch(setCurrentStep(currentStep - 1));

  return (
    <div>
      {currentStep === 0 ? (
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto m-4">
          <h1 className="text-3xl font-extrabold text-center my-6 text-blue-700">
            {t("heading")}
          </h1>
          <div>
            <p className="text-center text-gray-600 mb-6">{t("subheading")}</p>

            {/* Informative Section */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
              <p className="mb-4 text-gray-700">
                {t("infoSection.paragraph1")}
              </p>
              <p className="mb-4 text-gray-700">
                {t("infoSection.paragraph2")}
              </p>
              <p className="mb-4 text-gray-700">
                {t("infoSection.paragraph3")}
              </p>
              <p className="text-gray-700">{t("infoSection.paragraph4")}</p>
            </div>

            {/* Image Upload Section */}
            <div className="flex flex-col items-center mb-6">
              <label
                className="flex flex-col items-center justify-center w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                htmlFor="fileUpload"
              >
                <Image
                  src="/imagetoselect.png"
                  alt={t("imageUpload.alt")}
                  width={100}
                  height={100}
                  className="mb-4"
                />
                <p className="text-sm text-gray-500">
                  {t("imageUpload.label")}
                </p>
                <input type="file" id="fileUpload" className="hidden" />
              </label>
            </div>

            {/* Additional Information Section */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md">
              <p className="mb-4 text-gray-700">
                {t("additionalInfo.paragraph1")}
              </p>
              <p className="mb-4 text-gray-700">
                {t("additionalInfo.paragraph2")}
              </p>
              <p className="mb-4 text-gray-700">
                {t("additionalInfo.paragraph3")}
              </p>
              <p className="mb-4 text-gray-700">
                {t("additionalInfo.paragraph4")}
              </p>
              <div className="flex items-start">
                <input
                  type="radio"
                  onChange={handleNext} // Proceed to step 1
                  className="mt-1 mr-2"
                />
                <p className="text-gray-700">
                  {t("additionalInfo.terms.text")}{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    {t("additionalInfo.terms.link")}
                  </span>{" "}
                  {t("additionalInfo.terms.confirmation")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MultiStepForm />
      )}
    </div>
  );
};

const Page = () => {
  return (
    // <FormProvider>
    <PageContent />
    // </FormProvider>
  );
};

export default Page;
