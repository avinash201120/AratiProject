"use client";

import React from "react";
import { Steps } from "antd";
// import { useFormContext } from "./component/FormContext";
// import SubmitExchangeForm from "./component/SubmitExchangeForm";

// import ExpectedRequirement from "./component/ExpectedRequirements";
import Success from "./component/Success";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentStep } from "@/store/slices/productForProductFormSlice";
import SubmitexchangeForm from "./component/SubmitexchnageForm";
import ExpectedrequiremtnsForm from "./component/ExpectedrequirementsForm";
// import { useTranslations } from "next-intl";

// const { Step } = Steps;

const MultiStepForm = () => {
  const dispatch = useDispatch();
  // const { currentStep, handleBack } = useFormContext();

  const { currentStep } = useSelector(
    (state: RootState) => state.productForProductExchangeForm
  );

  // const handleNext = () => dispatch(setCurrentStep(currentStep + 1));
  const handleBack = () => dispatch(setCurrentStep(currentStep - 1));

  //steps array

  const steps = [
    {
      title: (
        <span className="text-xs sm:text-sm">Submit an Exchange Offer</span>
      ),
      description: (
        <span className="text-xs sm:text-sm">Submit Your Exchange</span>
      ),
    },
    {
      title: <span className="text-xs sm:text-sm">Expected Requirements</span>,
      description: (
        <span className="text-xs sm:text-sm">What do you need?</span>
      ),
    },
    {
      title: <span className="text-xs sm:text-sm">Success</span>,
      description: (
        <span className="text-xs sm:text-sm">Review and confirm</span>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Steps Progress Bar */}

      <Steps
        current={currentStep - 1}
        items={steps}
        className="mb-6 flex flex-row gap-4 overflow-x-auto whitespace-nowrap"
      />

      {/* Step Content */}

      {currentStep === 1 && <SubmitexchangeForm />}

      {currentStep === 2 && <ExpectedrequiremtnsForm />}
      {currentStep === 3 && <Success />}
      {/* Back Button */}
      <div className="flex justify-start mt-6">
        <button
          onClick={handleBack} // Navigate back to step 0
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
