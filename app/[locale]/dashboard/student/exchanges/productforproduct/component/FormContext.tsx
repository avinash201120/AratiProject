"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define Types/Interfaces for reusability
interface MaterialConditions {
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
  materialConditions: MaterialConditions;
  guarantees: Guarantees;
  paymentDetails: PaymentDetails;
  deliveryConditions: DeliveryConditions;
  geolocation: { campus: string; country: string };
  otherSpecialConditions: OtherSpecialConditions;
  file: File | null;
}

// Initial Form Data Object
const INITIAL_FORM_DATA: {
  submitExchangeDetails: ExchangeDetails;
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
    guarantees: { moneyBackGuarantee: "", satisfactionGuarantee: "" },
    paymentDetails: { desiredPaymentForm: "", desiredPaymentType: "" },
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
    geolocation: { campus: "", country: "" },
    otherSpecialConditions: { additionalDescription: "", uploadedFiles: [] },
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
      estimatedValue: "",
      decision: "",
      depositPayment: { percentage: "" },
      otherContingentCoverageRequired: "",
    },
    guarantees: { moneyBackGuarantee: "", satisfactionGuarantee: "" },
    paymentDetails: { desiredPaymentForm: "", desiredPaymentType: "" },
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
    geolocation: { campus: "", country: "" },
    otherSpecialConditions: { additionalDescription: "", uploadedFiles: [] },
    file: null,
  },
};

export default INITIAL_FORM_DATA;

interface FormContextType {
  formData: typeof INITIAL_FORM_DATA;
  setFormData: React.Dispatch<React.SetStateAction<typeof INITIAL_FORM_DATA>>;
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
  const [formData, setFormData] = useState<typeof INITIAL_FORM_DATA>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFormData = localStorage.getItem("formData");
        return savedFormData ? JSON.parse(savedFormData) : INITIAL_FORM_DATA;
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return INITIAL_FORM_DATA;
      }
    }
    return INITIAL_FORM_DATA;
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
    setFormData(INITIAL_FORM_DATA);
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

// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";

// // Define the shape of the context

// interface FormContextType {
//   formData: {
//     submitExchangeDetails: {
//       zoneOneBanner: File | null;
//       title: string;
//       images: (File | null)[];
//       offerType: string;
//       category: string;
//       subcategory: string;
//       featuredProductStatus: string;
//       additionalDescription: string;
//       startDate: Date | null;
//       endDate: Date | null;
//       formOfExchange: string;
//       materialConditions: {
//         estimatedValue: string;
//         decision: string;
//         depositPayment: { percentage: string };
//         otherContingentCoverageRequired: string;
//       };
//       guarantees: { moneyBackGuarantee: string; satisfactionGuarantee: string };
//       paymentDetails: {
//         desiredPaymentForm: string;
//         desiredPaymentType: string;
//       };
//       deliveryConditions: {
//         pickup: {
//           allowed: "yes" | "no" | "";
//           details: {
//             address: string;
//             country: string;
//             city: string;
//             campus: string;
//           };
//         };
//         delivery: {
//           allowed: "yes" | "no" | "";
//           details: { cost: string; country: string; city: string };
//         };
//       };
//       geolocation: { campus: string; country: string };
//       otherSpecialConditions: {
//         additionalDescription: string;
//         uploadedFiles: File[];
//       };
//       file: File | null;
//     };
//     expectedRequirementsDetails: {
//       zoneOneBanner: File | null;
//       title: string;
//       images: (File | null)[];
//       offerType: string;
//       category: string;
//       subcategory: string;
//       featuredProductStatus: string;
//       additionalDescription: string;
//       startDate: Date | null;
//       endDate: Date | null;
//       formOfExchange: string;
//       materialConditions: {
//         estimatedValue: string;
//         decision: string;
//         depositPayment: { percentage: string };
//         otherContingentCoverageRequired: string;
//       };
//       guarantees: { moneyBackGuarantee: string; satisfactionGuarantee: string };
//       paymentDetails: {
//         desiredPaymentForm: string;
//         desiredPaymentType: string;
//       };
//       deliveryConditions: {
//         pickup: {
//           allowed: "yes" | "no" | "";
//           details: {
//             address: string;
//             country: string;
//             city: string;
//             campus: string;
//           };
//         };
//         delivery: {
//           allowed: "yes" | "no" | "";
//           details: { cost: string; country: string; city: string };
//         };
//       };
//       geolocation: { campus: string; country: string };
//       otherSpecialConditions: {
//         additionalDescription: string;
//         uploadedFiles: File[];
//       };
//       file: File | null;
//     };
//   };
//   setFormData: React.Dispatch<
//     React.SetStateAction<FormContextType["formData"]>
//   >;
//   currentStep: number;
//   handleNext: () => void;
//   handleBack: () => void;
// }

// interface FormProviderProps {
//   children: ReactNode;
// }

// // Create context
// export const FormContext = createContext<FormContextType | undefined>(
//   undefined
// );

// // FormProvider component
// export const FormProvider = ({ children }: FormProviderProps) => {
//   const [formData, setFormData] = useState<FormContextType["formData"]>(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const savedFormData = localStorage.getItem("formData");
//         return savedFormData
//           ? JSON.parse(savedFormData)
//           : {
//               submitExchangeDetails: {
//                 zoneOneBanner: null,
//                 title: "",
//                 images: [null, null, null],
//                 offerType: "",
//                 category: "",
//                 subcategory: "",
//                 featuredProductStatus: "",
//                 additionalDescription: "",
//                 startDate: null,
//                 endDate: null,
//                 formOfExchange: "",
//                 materialConditions: {
//                   estimatedValue: "",
//                   decision: "",
//                   depositPayment: { percentage: "" },
//                   otherContingentCoverageRequired: "",
//                 },
//                 guarantees: {
//                   moneyBackGuarantee: "",
//                   satisfactionGuarantee: "",
//                 },
//                 paymentDetails: {
//                   desiredPaymentForm: "",
//                   desiredPaymentType: "",
//                 },
//                 deliveryConditions: {
//                   pickup: {
//                     allowed: "",
//                     details: { address: "", country: "", city: "", campus: "" },
//                   },
//                   delivery: {
//                     allowed: "",
//                     details: { cost: "", country: "", city: "" },
//                   },
//                 },
//                 geolocation: { campus: "", country: "" },
//                 otherSpecialConditions: {
//                   additionalDescription: "",
//                   uploadedFiles: [],
//                 },
//                 file: null,
//               },
//               expectedRequirementsDetails: {
//                 zoneOneBanner: null,
//                 title: "",
//                 images: [null, null, null],
//                 offerType: "",
//                 category: "",
//                 subcategory: "",
//                 featuredProductStatus: "",
//                 additionalDescription: "",
//                 startDate: null,
//                 endDate: null,
//                 formOfExchange: "",
//                 materialConditions: {
//                   estimatedValue: "",
//                   decision: "",
//                   depositPayment: { percentage: "" },
//                   otherContingentCoverageRequired: "",
//                 },
//                 guarantees: {
//                   moneyBackGuarantee: "",
//                   satisfactionGuarantee: "",
//                 },
//                 paymentDetails: {
//                   desiredPaymentForm: "",
//                   desiredPaymentType: "",
//                 },
//                 deliveryConditions: {
//                   pickup: {
//                     allowed: "",
//                     details: { address: "", country: "", city: "", campus: "" },
//                   },
//                   delivery: {
//                     allowed: "",
//                     details: { cost: "", country: "", city: "" },
//                   },
//                 },
//                 geolocation: { campus: "", country: "" },
//                 otherSpecialConditions: {
//                   additionalDescription: "",
//                   uploadedFiles: [],
//                 },
//                 file: null,
//               },
//             };
//       } catch (error) {
//         console.error("Error parsing localStorage data:", error);
//         return {
//           submitExchangeDetails: {
//             zoneOneBanner: null,
//             title: "",
//             images: [null, null, null],
//             offerType: "",
//             category: "",
//             subcategory: "",
//             featuredProductStatus: "",
//             additionalDescription: "",
//             startDate: null,
//             endDate: null,
//             formOfExchange: "",
//             materialConditions: {
//               estimatedValue: "",
//               decision: "",
//               depositPayment: { percentage: "" },
//               otherContingentCoverageRequired: "",
//             },
//             guarantees: {
//               moneyBackGuarantee: "",
//               satisfactionGuarantee: "",
//             },
//             paymentDetails: {
//               desiredPaymentForm: "",
//               desiredPaymentType: "",
//             },
//             deliveryConditions: {
//               pickup: {
//                 allowed: "",
//                 details: { address: "", country: "", city: "", campus: "" },
//               },
//               delivery: {
//                 allowed: "",
//                 details: { cost: "", country: "", city: "" },
//               },
//             },
//             geolocation: { campus: "", country: "" },
//             otherSpecialConditions: {
//               additionalDescription: "",
//               uploadedFiles: [],
//             },
//             file: null,
//           },
//           expectedRequirementsDetails: {
//             zoneOneBanner: null,
//             title: "",
//             images: [null, null, null],
//             offerType: "",
//             category: "",
//             subcategory: "",
//             featuredProductStatus: "",
//             additionalDescription: "",
//             startDate: null,
//             endDate: null,
//             formOfExchange: "",
//             materialConditions: {
//               estimatedValue: "",
//               decision: "",
//               depositPayment: { percentage: "" },
//               otherContingentCoverageRequired: "",
//             },
//             guarantees: {
//               moneyBackGuarantee: "",
//               satisfactionGuarantee: "",
//             },
//             paymentDetails: {
//               desiredPaymentForm: "",
//               desiredPaymentType: "",
//             },
//             deliveryConditions: {
//               pickup: {
//                 allowed: "",
//                 details: { address: "", country: "", city: "", campus: "" },
//               },
//               delivery: {
//                 allowed: "",
//                 details: { cost: "", country: "", city: "" },
//               },
//             },
//             geolocation: { campus: "", country: "" },
//             otherSpecialConditions: {
//               additionalDescription: "",
//               uploadedFiles: [],
//             },
//             file: null,
//           },
//         };
//       }
//     }
//   });

//   // const [formData, setFormData] = useState<FormContextType["formData"]>(() => {
//   //   // Initialize state from localStorage if available
//   //   if (typeof window !== "undefined") {
//   //     const savedFormData = localStorage.getItem("formData");
//   //     return savedFormData
//   //       ? JSON.parse(savedFormData)
//   //       : {
//   //           submitExchangeDetails: {
//   //             zoneOneBanner: null,
//   //             title: "",
//   //             images: [null, null, null],
//   //             offerType: "",
//   //             category: "",
//   //             subcategory: "",
//   //             featuredProductStatus: "",
//   //             additionalDescription: "",
//   //             startDate: null,
//   //             endDate: null,
//   //             formOfExchange: "",
//   //             materialConditions: {
//   //               estimatedValue: "",
//   //               decision: "",
//   //               depositPayment: { percentage: "" },
//   //               otherContingentCoverageRequired: "",
//   //             },
//   //             guarantees: {
//   //               moneyBackGuarantee: "",
//   //               satisfactionGuarantee: "",
//   //             },
//   //             paymentDetails: {
//   //               desiredPaymentForm: "",
//   //               desiredPaymentType: "",
//   //             },
//   //             deliveryConditions: {
//   //               pickup: {
//   //                 allowed: "",
//   //                 details: { address: "", country: "", city: "", campus: "" },
//   //               },
//   //               delivery: {
//   //                 allowed: "",
//   //                 details: { cost: "", country: "", city: "" },
//   //               },
//   //             },
//   //             geolocation: { campus: "", country: "" },
//   //             otherSpecialConditions: {
//   //               additionalDescription: "",
//   //               uploadedFiles: [],
//   //             },
//   //             file: null,
//   //           },
//   //           expectedRequirementsDetails: {
//   //             zoneOneBanner: null,
//   //             title: "",
//   //             images: [null, null, null],
//   //             offerType: "",
//   //             category: "",
//   //             subcategory: "",
//   //             featuredProductStatus: "",
//   //             additionalDescription: "",
//   //             startDate: null,
//   //             endDate: null,
//   //             formOfExchange: "",
//   //             materialConditions: {
//   //               estimatedValue: "",
//   //               decision: "",
//   //               depositPayment: { percentage: "" },
//   //               otherContingentCoverageRequired: "",
//   //             },
//   //             guarantees: {
//   //               moneyBackGuarantee: "",
//   //               satisfactionGuarantee: "",
//   //             },
//   //             paymentDetails: {
//   //               desiredPaymentForm: "",
//   //               desiredPaymentType: "",
//   //             },
//   //             deliveryConditions: {
//   //               pickup: {
//   //                 allowed: "",
//   //                 details: { address: "", country: "", city: "", campus: "" },
//   //               },
//   //               delivery: {
//   //                 allowed: "",
//   //                 details: { cost: "", country: "", city: "" },
//   //               },
//   //             },
//   //             geolocation: { campus: "", country: "" },
//   //             otherSpecialConditions: {
//   //               additionalDescription: "",
//   //               uploadedFiles: [],
//   //             },
//   //             file: null,
//   //           },
//   //         };
//   //   }
//   //   return {
//   //     submitExchangeDetails: {
//   //       zoneOneBanner: null,
//   //       title: "",
//   //       images: [null, null, null],
//   //       offerType: "",
//   //       category: "",
//   //       subcategory: "",
//   //       featuredProductStatus: "",
//   //       additionalDescription: "",
//   //       startDate: null,
//   //       endDate: null,
//   //       formOfExchange: "",
//   //       materialConditions: {
//   //         estimatedValue: "",
//   //         decision: "",
//   //         depositPayment: { percentage: "" },
//   //         otherContingentCoverageRequired: "",
//   //       },
//   //       guarantees: { moneyBackGuarantee: "", satisfactionGuarantee: "" },
//   //       paymentDetails: { desiredPaymentForm: "", desiredPaymentType: "" },
//   //       deliveryConditions: {
//   //         pickup: {
//   //           allowed: "",
//   //           details: { address: "", country: "", city: "", campus: "" },
//   //         },
//   //         delivery: {
//   //           allowed: "",
//   //           details: { cost: "", country: "", city: "" },
//   //         },
//   //       },
//   //       geolocation: { campus: "", country: "" },
//   //       otherSpecialConditions: { additionalDescription: "" },
//   //       file: null,
//   //     },
//   //     expectedRequirementsDetails: {
//   //       zoneOneBanner: null,
//   //       title: "",
//   //       images: [null, null, null],
//   //       offerType: "",
//   //       category: "",
//   //       subcategory: "",
//   //       featuredProductStatus: "",
//   //       additionalDescription: "",
//   //       startDate: null,
//   //       endDate: null,
//   //       formOfExchange: "",
//   //       materialConditions: {
//   //         estimatedValue: "",
//   //         decision: "",
//   //         depositPayment: { percentage: "" },
//   //         otherContingentCoverageRequired: "",
//   //       },
//   //       guarantees: { moneyBackGuarantee: "", satisfactionGuarantee: "" },
//   //       paymentDetails: { desiredPaymentForm: "", desiredPaymentType: "" },
//   //       deliveryConditions: {
//   //         pickup: {
//   //           allowed: "",
//   //           details: { address: "", country: "", city: "", campus: "" },
//   //         },
//   //         delivery: {
//   //           allowed: "",
//   //           details: { cost: "", country: "", city: "" },
//   //         },
//   //       },
//   //       geolocation: { campus: "", country: "" },
//   //       otherSpecialConditions: { additionalDescription: "" },
//   //       file: null,
//   //     },
//   //   };
//   // });

//   const [currentStep, setCurrentStep] = useState<number>(() => {
//     if (typeof window !== "undefined") {
//       const savedStep = localStorage.getItem("currentStep");
//       return savedStep ? parseInt(savedStep, 10) : 0;
//     }
//     return 0;
//   });

//   useEffect(() => {
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("currentStep", JSON.stringify(currentStep));
//   }, [formData, currentStep]);

//   const handleNext = () => setCurrentStep((prev) => prev + 1);
//   const handleBack = () => setCurrentStep((prev) => prev - 1);

//   return (
//     <FormContext.Provider
//       value={{
//         formData,
//         setFormData,
//         currentStep,
//         handleNext,
//         handleBack,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// // Hook to access the context
// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error("useFormContext must be used within a FormProvider");
//   }
//   return context;
// };
