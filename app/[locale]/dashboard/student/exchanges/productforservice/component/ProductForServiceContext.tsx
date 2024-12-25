"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface SubmitExchangeMaterialConditions {
  estimatedValue: string;
  decision: string;
  depositPayment: { percentage: string };
  otherContingentCoverageRequired: string;
}

// Define the interface for when travelExpenses is "yes"
interface WithTravelExpenses {
  travelExpenses: "yes";
  feeAmount: number; // Required if travelExpenses is "yes"
}

// Define the interface for when travelExpenses is "no"
interface WithoutTravelExpenses {
  travelExpenses: "no";
  feeAmount?: never; // Disallowed when travelExpenses is "no"
}

// Union of both interfaces
type TravelExpensesForm = WithTravelExpenses | WithoutTravelExpenses;

// Define the interface for when travelExpenses is "yes"
interface WithFreeQuote {
  freeQuote: "yes";
  feeAmount?: never; // Required if travelExpenses is "yes"
}

// Define the interface for when travelExpenses is "no"
interface WithOutFreeQuote {
  freeQuote: "no";
  feeAmount: number; // Disallowed when travelExpenses is "no"
}

// Union of both interfaces
type FreeQuote = WithFreeQuote | WithOutFreeQuote;

interface WithOtherPossibleCost {
  otherPossibleCost: "yes";
  amountOfCost: number;
}

interface WithOutOtherPossibleCost {
  otherPossibleCost: "no";
  amountOfCost?: never;
}

type OtherPossibleCost = WithOtherPossibleCost | WithOutOtherPossibleCost;

interface ContingentWarrantyRequired {
  contingentWarrantyRequired: "yes" | "no";
}

// Define Types/Interfaces for reusability
interface ExpectedRequirementsMaterialConditions {
  hourlyRate: number;
  minimumBenefit: number;
  packageRequested: string;
  travelExpenses: TravelExpensesForm;
  freeQuote: FreeQuote;
  otherPossibleCost: OtherPossibleCost;
  specifyNatureOfTheseCost: string;
  contingentWarrantyRequired: ContingentWarrantyRequired;
  estimatedValue: string;
  decision: string;
  depositPayment: { percentage: string };
  otherContingentCoverageRequired: string;
}

interface Guarantees {
  moneyBackGuarantee: string;
  satisfactionGuarantee: string;
}

interface PaymentDetails {
  desiredPaymentForm: string;
  desiredPaymentType: string;
}

interface DeliveryDetails {
  address: string;
  country: string;
  city: string;
  campus?: string;
}

interface DeliveryConditions {
  pickup: {
    allowed: "yes" | "no" | "";
    details: DeliveryDetails;
  };
  delivery: {
    allowed: "yes" | "no" | "";
    details: { cost: string; country: string; city: string };
  };
}

interface OtherSpecialConditions {
  additionalDescription: string;
  uploadedFiles: File[];
}

interface SubmitExchangeDetails {
  zoneOneBanner: File | null;
  title: string;
  images: (File | null)[];
  offerType: string;
  category: string;
  subcategory: string;
  featuredProductStatus: string;
  additionalDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  formOfExchange: string;
  materialConditions: SubmitExchangeMaterialConditions;
  guarantees: Guarantees;
  paymentDetails: PaymentDetails;
  deliveryConditions: DeliveryConditions;
  geolocation: { campus: string; country: string };
  otherSpecialConditions: OtherSpecialConditions;
  file: File | null;
}

interface ExchangeDetails {
  zoneOneBanner: File | null;
  title: string;
  images: (File | null)[];
  offerType: string;
  category: string;
  subcategory: string;
  featuredProductStatus: string;
  additionalDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  formOfExchange: string;
  materialConditions: ExpectedRequirementsMaterialConditions;
  guarantees: Guarantees;
  paymentDetails: PaymentDetails;
  deliveryConditions: DeliveryConditions;
  geolocation: { campus: string; country: string };
  otherSpecialConditions: OtherSpecialConditions;
  file: File | null;
}

const initialFormData: {
  submitExchangeDetails: SubmitExchangeDetails;
  expectedRequirementsDetails: ExchangeDetails;
} = {
  submitExchangeDetails: {
    zoneOneBanner: null,
    title: "",
    images: [null, null, null],
    offerType: "",
    category: "",
    subcategory: "",
    featuredProductStatus: "",
    additionalDescription: "",
    startDate: null,
    endDate: null,
    formOfExchange: "",
    materialConditions: {
      estimatedValue: "",
      decision: "",
      depositPayment: { percentage: "" },
      otherContingentCoverageRequired: "",
    },
    guarantees: {
      moneyBackGuarantee: "",
      satisfactionGuarantee: "",
    },
    paymentDetails: {
      desiredPaymentForm: "",
      desiredPaymentType: "",
    },
    deliveryConditions: {
      pickup: {
        allowed: "",
        details: { address: "", country: "", city: "", campus: "" },
      },
      delivery: {
        allowed: "",
        details: { cost: "", country: "", city: "" },
      },
    },
    geolocation: {
      campus: "",
      country: "",
    },
    otherSpecialConditions: {
      additionalDescription: "",
      uploadedFiles: [],
    },
    file: null,
  },

  expectedRequirementsDetails: {
    zoneOneBanner: null,
    title: "",
    images: [null, null, null],
    offerType: "",
    category: "",
    subcategory: "",
    featuredProductStatus: "",
    additionalDescription: "",
    startDate: null,
    endDate: null,
    formOfExchange: "",
    materialConditions: {
      hourlyRate: 0,
      minimumBenefit: 0,
      packageRequested: "",
      travelExpenses: {
        travelExpenses: "no", // Default to "no"
      },
      freeQuote: {
        freeQuote: "no", // Default to "no"
        feeAmount: 0,
      },
      otherPossibleCost: {
        otherPossibleCost: "no", // Default to "no"
      },
      specifyNatureOfTheseCost: "",
      contingentWarrantyRequired: {
        contingentWarrantyRequired: "no", // Default to "no"
      },
      estimatedValue: "",
      decision: "",
      depositPayment: { percentage: "" },
      otherContingentCoverageRequired: "",
    },
    guarantees: {
      moneyBackGuarantee: "",
      satisfactionGuarantee: "",
    },
    paymentDetails: {
      desiredPaymentForm: "",
      desiredPaymentType: "",
    },
    deliveryConditions: {
      pickup: {
        allowed: "",
        details: { address: "", country: "", city: "", campus: "" },
      },
      delivery: {
        allowed: "",
        details: { cost: "", country: "", city: "" },
      },
    },
    geolocation: {
      campus: "",
      country: "",
    },
    otherSpecialConditions: {
      additionalDescription: "",
      uploadedFiles: [],
    },
    file: null,
  },
};

export default initialFormData;

interface FormContextType {
  formData: typeof initialFormData;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  resetFormData: () => void; // New method to reset form
  currentStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

interface FormProviderProps {
  children: ReactNode;
}

// Create context
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

// FormProvider component
export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<typeof initialFormData>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFormData = localStorage.getItem("formData");
        return savedFormData ? JSON.parse(savedFormData) : initialFormData;
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return initialFormData;
      }
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("currentStep");
      return savedStep ? parseInt(savedStep, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
  }, [formData, currentStep]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // Reset form data to initial state
  const resetFormData = () => {
    setFormData(initialFormData);
    localStorage.removeItem("formData");
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        resetFormData,
        currentStep,
        handleNext,
        handleBack,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Hook to access the context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
