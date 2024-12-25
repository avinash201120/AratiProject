import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  currentStep: number;
}

const initialState: FormState = {
  currentStep: 0,
};

const formSlice = createSlice({
  name: "productforproductexchangeform",
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep } = formSlice.actions;
export default formSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface FormState {
//   formData: {
//     exchangeOffer: {
//       // zoneOneBanner?: string;
//       title: string;
//       offerType: "Good" | "Service";
//       category: string;
//       subcategory: string;
//       featuredProductStatus: "New" | "GoodCondition" | "Used";
//       additionalDescription?: string;
//       // images: string[];
//       startDate?: Date | null;
//       endDate?: Date | null;
//       formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation";
//       materialConditions?: {
//         decision: "yes" | "no";
//         depositPayment: {
//           required: boolean;
//           percentage?: number; // Optional to support both "yes" and "no" decisions
//         };
//         estimatedValue?: number;
//         otherContingentCoverageRequired?: string;
//       };

//       guarantees?: {
//         moneyBackGuarantee: boolean;
//         satisfactionGuarantee: boolean;
//       };
//       paymentDetails?: {
//         desiredPaymentForm?: "exchange-sum" | "exchange-service";
//         desiredPaymentType?:
//           | "hand-to-hand"
//           | "before-delivery"
//           | "after-delivery";
//       };
//       deliveryConditions?: {
//         pickup?: {
//           allowed: boolean;
//           details?: {
//             address?: string;
//             country?: string;
//             city?: string;
//             campus?: string;
//           };
//         };
//         delivery?: {
//           allowed: boolean;
//           details?: {
//             cost?: number | null;
//             country?: string;
//             city?: string;
//           };
//         };
//       };
//       geolocation?: {
//         campus?: string;
//         country?: string;
//       };
//       otherSpecialConditions?: {
//         additionalDescription?: string;
//         // uploadedFiles?: string[];
//       };
//     };
//     expectedRequirements: {
//       // zoneOneBanner?: string;
//       title: string;
//       offerType: "Good" | "Service";
//       category: string;
//       subcategory: string;
//       featuredProductStatus: "New" | "GoodCondition" | "Used";
//       additionalDescription?: string;
//       // images: string[];
//       startDate?: Date | null;
//       endDate?: Date | null;
//       formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation";

//       materialConditions?: {
//         decision: "yes" | "no";
//         depositPayment: {
//           required: boolean;
//           percentage?: number; // Optional to support both "yes" and "no" decisions
//         };
//         estimatedValue?: number;
//         otherContingentCoverageRequired?: string;
//       };
//       guarantees?: {
//         moneyBackGuarantee: boolean;
//         satisfactionGuarantee: boolean;
//       };
//       paymentDetails?: {
//         desiredPaymentForm?: "exchange-sum" | "exchange-service";
//         desiredPaymentType?:
//           | "hand-to-hand"
//           | "before-delivery"
//           | "after-delivery";
//       };
//       deliveryConditions?: {
//         pickup?: {
//           allowed: boolean;
//           details?: {
//             address?: string;
//             country?: string;
//             city?: string;
//             campus?: string;
//           };
//         };
//         delivery?: {
//           allowed: boolean;
//           details?: {
//             cost?: number | null;
//             country?: string;
//             city?: string;
//           };
//         };
//       };
//       geolocation?: {
//         campus?: string;
//         country?: string;
//       };
//       otherSpecialConditions?: {
//         additionalDescription?: string;
//         // uploadedFiles?: string[];
//       };
//     };
//   };
//   currentStep: number;
// }

// const initialState: FormState = {
//   formData: {
//     exchangeOffer: {
//       // zoneOneBanner: undefined,
//       title: "",
//       offerType: "Good",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "New",
//       additionalDescription: "",
//       // images: [],
//       startDate: null,
//       endDate: null,
//       formOfExchange: "Exchange",
//       materialConditions: {
//         decision: "no", // Set an initial value for decision
//         depositPayment: {
//           required: false,
//         },
//         estimatedValue: 0,
//         otherContingentCoverageRequired: "",
//       },
//       guarantees: {
//         moneyBackGuarantee: false,
//         satisfactionGuarantee: false,
//       },
//       paymentDetails: {
//         desiredPaymentForm: "exchange-sum",
//         desiredPaymentType: "hand-to-hand",
//       },
//       deliveryConditions: {
//         pickup: {
//           allowed: false,
//           details: {
//             address: "",
//             country: "",
//             city: "",
//             campus: "",
//           },
//         },
//         delivery: {
//           allowed: false,
//           details: {
//             cost: null,
//             country: "",
//             city: "",
//           },
//         },
//       },
//       geolocation: {
//         campus: "",
//         country: "",
//       },
//       otherSpecialConditions: {
//         additionalDescription: "",
//         // uploadedFiles: [],
//       },
//     },
//     expectedRequirements: {
//       // zoneOneBanner: undefined,
//       title: "",
//       offerType: "Good",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "New",
//       additionalDescription: "",
//       // images: [],
//       startDate: null,
//       endDate: null,
//       formOfExchange: "Exchange",

//       materialConditions: {
//         decision: "no", //Set an initial value for decision
//         depositPayment: {
//           required: false,
//         },
//         estimatedValue: 0,
//         otherContingentCoverageRequired: "",
//       },
//       guarantees: {
//         moneyBackGuarantee: false,
//         satisfactionGuarantee: false,
//       },
//       paymentDetails: {
//         desiredPaymentForm: "exchange-sum",
//         desiredPaymentType: "hand-to-hand",
//       },
//       deliveryConditions: {
//         pickup: {
//           allowed: false,
//           details: {
//             address: "",
//             country: "",
//             city: "",
//             campus: "",
//           },
//         },
//         delivery: {
//           allowed: false,
//           details: {
//             cost: null,
//             country: "",
//             city: "",
//           },
//         },
//       },
//       geolocation: {
//         campus: "",
//         country: "",
//       },
//       otherSpecialConditions: {
//         additionalDescription: "",
//         // uploadedFiles: [],
//       },
//     },
//   },
//   currentStep: 0,
// };

// const formSlice = createSlice({
//   name: "productforproductexchangeform",
//   initialState,
//   reducers: {
//     setExchangeOffer(
//       state,
//       action: PayloadAction<Partial<FormState["formData"]["exchangeOffer"]>>
//     ) {
//       state.formData.exchangeOffer = {
//         ...state.formData.exchangeOffer,
//         ...action.payload,
//       };
//     },
//     setExpectedRequirements(
//       state,
//       action: PayloadAction<
//         Partial<FormState["formData"]["expectedRequirements"]>
//       >
//     ) {
//       state.formData.expectedRequirements = {
//         ...state.formData.expectedRequirements,
//         ...action.payload,
//       };
//     },
//     setCurrentStep(state, action: PayloadAction<number>) {
//       state.currentStep = action.payload;
//     },
//     resetForm(state) {
//       state.formData = initialState.formData;
//       state.currentStep = 0;
//     },
//   },
// });

// export const {
//   setExchangeOffer,
//   setExpectedRequirements,
//   setCurrentStep,
//   resetForm,
// } = formSlice.actions;
// export default formSlice.reducer;

//before change
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface FormState {
//   formData: {
//     proposedOffer: {
//       title: string;
//       offerType: string;
//       category: string;
//       subcategory: string;
//       featuredProductStatus: string;
//       additionalDescription: string;
//       startDate: Date | null;
//       endDate: Date | null;
//       formOfExchange: string;
//     };
//     materialConditions: {
//       decision: string;
//       percentage: string;
//       moneyBackGuarantee: boolean;
//       satisfactionGuarantee: boolean;
//       desiredPaymentForm: string;
//       desiredPaymentType: string;
//     };
//     deliveryConditions: {
//       pickup: "yes" | "no" | "";
//       pickupAddress: string;
//       pickupCountry: string;
//       pickupCity: string;
//       pickupDetails: string;
//       pickupCampus: string;
//       delivery: "yes" | "no" | "";
//       deliveryCost: string;
//       deliveryCountry: string;
//       deliveryCity: string;
//     };
//     expectedRequirements: Record<string, unknown>;
//   };
//   currentStep: number;
// }

// const initialState: FormState = {
//   formData: {
//     proposedOffer: {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       startDate: null,
//       endDate: null,
//       formOfExchange: "",
//     },
//     materialConditions: {
//       decision: "",
//       percentage: "",
//       moneyBackGuarantee: false,
//       satisfactionGuarantee: false,
//       desiredPaymentForm: "",
//       desiredPaymentType: "",
//     },
//     deliveryConditions: {
//       pickup: "",
//       pickupAddress: "",
//       pickupCountry: "",
//       pickupCity: "",
//       pickupDetails: "",
//       pickupCampus: "",
//       delivery: "",
//       deliveryCost: "",
//       deliveryCountry: "",
//       deliveryCity: "",
//     },
//     expectedRequirements: {},
//   },
//   currentStep: 0,
// };

// const formSlice = createSlice({
//   name: "productforproductexchangeform",
//   initialState,
//   reducers: {
//     setFormData(state, action: PayloadAction<Partial<FormState["formData"]>>) {
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     setCurrentStep(state, action: PayloadAction<number>) {
//       state.currentStep = action.payload;
//     },
//     resetForm(state) {
//       state.formData = initialState.formData;
//       state.currentStep = 0;
//     },
//   },
// });

// export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;
// export default formSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface FormState {
//   formData: {
//     proposedOffer: {
//       title: string;
//       offerType: string;
//       category: string;
//       subcategory: string;
//       featuredProductStatus: string;
//       additionalDescription: string;
//       startDate: Date | null;
//       endDate: Date | null;
//       formOfExchange: string;
//     };
//     materialConditions: {
//       decision: string;
//       percentage: string;
//       moneyBackGuarantee: boolean;
//       satisfactionGuarantee: boolean;
//       desiredPaymentForm: string;
//       desiredPaymentType: string;
//     };
//     deliveryConditions: {
//       pickup: "yes" | "no" | "";
//       pickupAddress: string;
//       pickupCountry: string;
//       pickupCity: string;
//       pickupDetails: string;
//       pickupCampus: string;
//       delivery: "yes" | "no" | "";
//       deliveryCost: string;
//       deliveryCountry: string;
//       deliveryCity: string;
//     };
//     expectedRequirements: Record<string, unknown>;
//   };
//   currentStep: number;
// }

// const initialState: FormState = {
//   formData: {
//     proposedOffer: {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       startDate: null,
//       endDate: null,
//       formOfExchange: "",
//     },
//     materialConditions: {
//       decision: "",
//       percentage: "",
//       moneyBackGuarantee: false,
//       satisfactionGuarantee: false,
//       desiredPaymentForm: "",
//       desiredPaymentType: "",
//     },
//     deliveryConditions: {
//       pickup: "",
//       pickupAddress: "",
//       pickupCountry: "",
//       pickupCity: "",
//       pickupDetails: "",
//       pickupCampus: "",
//       delivery: "",
//       deliveryCost: "",
//       deliveryCountry: "",
//       deliveryCity: "",
//     },
//     expectedRequirements: {},
//   },
//   currentStep: 0,
// };

// const formSlice = createSlice({
//   name: "productforproductexchangeform",
//   initialState,
//   reducers: {
//     setFormData(state, action: PayloadAction<Partial<FormState["formData"]>>) {
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     setCurrentStep(state, action: PayloadAction<number>) {
//       state.currentStep = action.payload;
//     },
//     resetForm(state) {
//       state.formData = initialState.formData;
//       state.currentStep = 0;
//     },
//   },
// });

// export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;
// export default formSlice.reducer;
