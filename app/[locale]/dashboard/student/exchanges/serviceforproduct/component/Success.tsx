"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Success = () => {
  const t = useTranslations("form");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          {t(`Your offer is successfully posted!`)}
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          {t(`We congratulate you for your Eco-Solidarity contribution!`)}
        </p>
        <hr className="my-4 border-gray-300" />
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          {t(`Any tips to optimize the impact of your Offer?`)}
        </h2>
        <p className="text-gray-700 text-base">
          {/* {t(`Enhance your social branding by publishing an impactful post on our
          platform and on social networks, aimed at our community of current and
          future talent.`)} */}
          {t("enhance_social_branding_full")}
        </p>
      </div>
    </div>
  );
};

export default Success;
