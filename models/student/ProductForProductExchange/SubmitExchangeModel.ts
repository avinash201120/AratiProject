import mongoose, { Schema } from "mongoose";

// Interface for TypeScript
export interface SubmitExchangeModel {
  zoneOneBanner: string;
  title: string;
  offerType: "Good" | "Service";
  category: string;
  subcategory: string;
  featuredProductStatus: "New" | "GoodCondition" | "Used";
  additionalDescription?: string;
  images?: string[];
  offerDates?: {
    startDate?: Date;
    endDate?: Date;
  };
  formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation";
  materialConditions?: {
    estimatedValue?: number;
    depositPayment?: {
      required: boolean;
      percentage?: number;
    };
    otherContingentCoverageRequired?: string;
  };
  guarantees?: {
    moneyBackGuarantee: boolean;
    satisfactionGuarantee: boolean;
  };
  paymentDetails?: {
    desiredPaymentForm?: "exchange-sum" | "exchange-service";
    desiredPaymentType?: "hand-to-hand" | "before-delivery" | "after-delivery";
  };
  deliveryConditions?: {
    pickup?: {
      allowed: boolean;
      details?: {
        address?: string;
        country?: string;
        city?: string;
        campus?: string;
      };
    };
    delivery?: {
      allowed: boolean;
      details?: {
        cost?: number;
        country?: string;
        city?: string;
      };
    };
  };
  geolocation?: {
    campus?: string;
    country?: string;
  };
  otherSpecialConditions?: {
    additionalDescription?: string;
    uploadedFiles?: string[];
  };
}

// Schema for SubmitExchangeModel
const SubmitExchangeSchema: Schema = new Schema({
  zoneOneBanner: { type: String, required: true },
  title: { type: String, required: true },
  offerType: { type: String, enum: ["Good", "Service"], required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  featuredProductStatus: {
    type: String,
    enum: ["New", "GoodCondition", "Used"],
    required: true,
  },
  additionalDescription: { type: String },
  images: { type: [String] },
  offerDates: {
    startDate: { type: Date },
    endDate: { type: Date },
  },
  formOfExchange: {
    type: String,
    enum: ["Exchange", "Classic Sale", "Auction", "Donation"],
    required: true,
  },
  materialConditions: {
    estimatedValue: { type: Number },
    depositPayment: {
      required: { type: Boolean },
      percentage: { type: Number },
    },
    otherContingentCoverageRequired: { type: String },
  },
  guarantees: {
    moneyBackGuarantee: { type: Boolean },
    satisfactionGuarantee: { type: Boolean },
  },
  paymentDetails: {
    desiredPaymentForm: {
      type: String,
      enum: ["exchange-sum", "exchange-service"],
    },
    desiredPaymentType: {
      type: String,
      enum: ["hand-to-hand", "before-delivery", "after-delivery"],
    },
  },
  deliveryConditions: {
    pickup: {
      allowed: { type: Boolean },
      details: {
        address: { type: String },
        country: { type: String },
        city: { type: String },
        campus: { type: String },
      },
    },
    delivery: {
      allowed: { type: Boolean },
      details: {
        cost: { type: Number },
        country: { type: String },
        city: { type: String },
      },
    },
  },
  geolocation: {
    campus: { type: String },
    country: { type: String },
  },
  otherSpecialConditions: {
    additionalDescription: { type: String },
    uploadedFiles: { type: [String] },
  },
});

export default SubmitExchangeSchema; // Export only the schema

// import mongoose, { Schema } from "mongoose";

// export interface SubmitExchangeModel {
//   title: string; // Title of the offer
//   offerType: "Good" | "Service"; // Type of the offer
//   category: string; // Main category of the offer
//   subcategory: string; // Subcategory of the offer
//   featuredProductStatus: "New" | "GoodCondition" | "Used"; // Status of the product
//   additionalDescription?: string; // Additional details about the offer
//   images?: string[]; // Array of image URLs for uploaded files
//   offerDates?: {
//     startDate?: Date; // Start date of the offer
//     endDate?: Date; // End date of the offer
//   };
//   formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation"; // Type of exchange
//   materialConditions?: {
//     estimatedValue?: number; // Estimated value of the offer
//     depositPayment?: {
//       required: boolean; // Whether deposit payment is required
//       percentage?: number; // Percentage of deposit if required
//     };
//     otherContingentCoverageRequired?: string; // Details of contingent coverage
//   };
//   guarantees?: {
//     moneyBackGuarantee: boolean; // Money-back guarantee
//     satisfactionGuarantee: boolean; // Satisfaction or exchange guarantee
//   };
//   paymentDetails?: {
//     desiredPaymentForm?: "exchange-sum" | "exchange-service"; // Desired payment form
//     desiredPaymentType?: "hand-to-hand" | "before-delivery" | "after-delivery"; // Desired payment type
//   };
//   deliveryConditions?: {
//     pickup?: {
//       allowed: boolean; // Whether pickup is allowed
//       details?: {
//         address?: string; // Pickup address
//         country?: string; // Pickup country
//         city?: string; // Pickup city
//         campus?: string; // Pickup campus
//       };
//     };
//     delivery?: {
//       allowed: boolean; // Whether delivery is allowed
//       details?: {
//         cost?: number; // Delivery cost
//         country?: string; // Delivery country
//         city?: string; // Delivery city
//       };
//     };
//   };
//   geolocation?: {
//     campus?: string; // Geolocation of campus
//     country?: string; // Geolocation of country
//   };
//   otherSpecialConditions?: {
//     additionalDescription?: string; // Additional description of payment or delivery
//     uploadedFiles?: string[]; // Array of uploaded file URLs
//   };
// }

// // Schema for SubmitExchangeModel
// const SubmitExchangeSchema: Schema<SubmitExchangeModel> = new Schema({
//   title: { type: String, required: true },
//   offerType: { type: String, enum: ["Good", "Service"], required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   featuredProductStatus: {
//     type: String,
//     enum: ["New", "GoodCondition", "Used"],
//     required: true,
//   },
//   additionalDescription: { type: String },
//   images: { type: [String] },
//   offerDates: {
//     startDate: { type: Date },
//     endDate: { type: Date },
//   },
//   formOfExchange: {
//     type: String,
//     enum: ["Exchange", "Classic Sale", "Auction", "Donation"],
//     required: true,
//   },
//   materialConditions: {
//     estimatedValue: { type: Number },
//     depositPayment: {
//       required: { type: Boolean },
//       percentage: { type: Number },
//     },
//     otherContingentCoverageRequired: { type: String },
//   },
//   guarantees: {
//     moneyBackGuarantee: { type: Boolean },
//     satisfactionGuarantee: { type: Boolean },
//   },
//   paymentDetails: {
//     desiredPaymentForm: {
//       type: String,
//       enum: ["exchange-sum", "exchange-service"],
//     },
//     desiredPaymentType: {
//       type: String,
//       enum: ["hand-to-hand", "before-delivery", "after-delivery"],
//     },
//   },
//   deliveryConditions: {
//     pickup: {
//       allowed: { type: Boolean },
//       details: {
//         address: { type: String },
//         country: { type: String },
//         city: { type: String },
//         campus: { type: String },
//       },
//     },
//     delivery: {
//       allowed: { type: Boolean },
//       details: {
//         cost: { type: Number },
//         country: { type: String },
//         city: { type: String },
//       },
//     },
//   },
//   geolocation: {
//     campus: { type: String },
//     country: { type: String },
//   },
//   otherSpecialConditions: {
//     additionalDescription: { type: String },
//     uploadedFiles: { type: [String] },
//   },
// });

// export default mongoose.model<SubmitExchangeModel>(
//   "SubmitExchange",
//   SubmitExchangeSchema
// );
