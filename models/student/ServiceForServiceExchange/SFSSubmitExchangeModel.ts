import mongoose, { Schema, Document } from "mongoose";

// Define the types for the schema fields
interface OtherPossibleCost {
  otherPossibleCost: "yes" | "no" | ""; // Valid values for otherPossibleCost
  amountOfCost?: number | null; // Optional, number or null
  natureOfTheseCost: string; // Required nature description
}

interface MaterialConditions {
  hourlyRate: number;
  minimumBenefit: number;
  packageRequested: number;
  travelExpenses: {
    isRequired: "yes" | "no" | null;
    feeAmount: number;
  };
  freeQuote: {
    freeQuote: "yes" | "no" | ""; // Valid values for freeQuote
    feeAmount?: number; // Optional feeAmount, required only when freeQuote is "no"
  };
  otherPossibleCost: OtherPossibleCost;
  contingentWarranty: string;
  guarantees: {
    moneyBackGuarantee: "yes" | "no" | "";
    satisfactionGuarantee: "yes" | "no" | "";
  };
  estimatedValue: string;
  depositPayment: {
    decision: "yes" | "no" | "";
    percentage: string;
  };
  otherContingentCoverageRequired: string;
  paymentDetails: {
    desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
    desiredPaymentType:
      | "hand-to-hand"
      | "before-delivery"
      | "after-delivery"
      | "";
  };
}

interface SFSSubmitExchangeSchemaInterface extends Document {
  title: string;
  offerType: string;
  category: string;
  subcategory: string;
  featuredProductStatus: "New" | "GoodCondition" | "Used" | "";
  additionalDescription: string;
  images: string[];
  startDate: string;
  endDate: string;
  materialConditions: MaterialConditions;
  deliveryConditions: {
    pickup: {
      allowed: "yes" | "no" | null;
      details: {
        address: string;
        country: string;
        city: string;
        campus: string;
      };
    };
    delivery: {
      allowed: "yes" | "no" | null;
      costOption: "yes" | "no" | null;
      details: {
        amount: string;
        country: string;
        city: string;
      };
    };
  };
  geolocation: {
    campus: string;
    country: string;
  };
  otherSpecialConditions: {
    additionalDescription: string;
    uploadedFiles: string[];
  };
}

// Define the schema
const SFSSubmitExchangeSchema = new Schema<SFSSubmitExchangeSchemaInterface>({
  title: { type: String, required: true },
  offerType: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  featuredProductStatus: {
    type: String,
    enum: ["New", "GoodCondition", "Used", ""],
    required: true,
  },
  additionalDescription: { type: String, required: true },
  images: [{ type: String }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  materialConditions: {
    hourlyRate: { type: Number, required: true },
    minimumBenefit: { type: Number, required: true },
    packageRequested: { type: Number, required: true },
    travelExpenses: {
      isRequired: { type: String, enum: ["yes", "no", null], required: true },
      feeAmount: {
        type: Number,
        required: function (this: { isRequired: string }) {
          return this.isRequired === "yes";
        },
      },
    },
    freeQuote: {
      freeQuote: {
        type: String,
        enum: ["yes", "no", ""], // Valid values for freeQuote
        required: true, // Make freeQuote required
      },
      feeAmount: {
        type: Number,
        // feeAmount is required only if freeQuote is "no"
        required: function (this: SFSSubmitExchangeSchemaInterface) {
          return this.materialConditions.freeQuote.freeQuote === "no";
        },
        set: function (this: SFSSubmitExchangeSchemaInterface, value: any) {
          // Handle "undefined" and non-number inputs for feeAmount
          if (this.materialConditions.freeQuote.freeQuote === "yes") {
            return undefined; // If freeQuote is 'yes', set feeAmount to undefined
          }
          if (this.materialConditions.freeQuote.freeQuote === "no") {
            return isNaN(value) ? undefined : value; // Ensure feeAmount is a valid number
          }
          return value; // For other cases, return the value as is
        },
        validate: {
          validator: function (
            this: SFSSubmitExchangeSchemaInterface,
            value: number | null | undefined
          ): boolean {
            const freeQuoteValue = this.materialConditions.freeQuote.freeQuote;
            // If freeQuote is 'no', feeAmount should be a valid number
            if (freeQuoteValue === "no") {
              return typeof value === "number" && !isNaN(value);
            }
            // If freeQuote is 'yes', feeAmount must be null or undefined
            return value === null || value === undefined;
          },
          message: "feeAmount must be a number when freeQuote is 'no'.",
        },
      },
    },
    otherPossibleCost: {
      otherPossibleCost: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      amountOfCost: {
        type: Number,
        set: function (value: any): number | null {
          // Convert string 'null' to actual null value
          if (value === "null" || value === null) {
            return null;
          }
          return value; // Return the value as is if it's valid
        },
      },
      natureOfTheseCost: { type: String, required: true },
    },
    contingentWarranty: { type: String, required: true },
    guarantees: {
      moneyBackGuarantee: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      satisfactionGuarantee: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
    },
    estimatedValue: { type: String, required: true },
    depositPayment: {
      decision: { type: String, enum: ["yes", "no", ""], required: true },
      percentage: {
        type: String,
        required: function (this: { decision: string }) {
          return this.decision === "yes";
        },
      },
    },
    otherContingentCoverageRequired: { type: String, required: true },
    paymentDetails: {
      desiredPaymentForm: {
        type: String,
        enum: ["exchange-sum", "exchange-service", ""],
        required: true,
      },
      desiredPaymentType: {
        type: String,
        enum: ["hand-to-hand", "before-delivery", "after-delivery", ""],
        required: true,
      },
    },
  },
  deliveryConditions: {
    pickup: {
      allowed: { type: String, enum: ["yes", "no", null], required: true },
      details: {
        address: { type: String },
        country: { type: String },
        city: { type: String },
        campus: { type: String },
      },
    },
    delivery: {
      allowed: { type: String, enum: ["yes", "no", null], required: true },
      costOption: { type: String, enum: ["yes", "no", null] },
      details: {
        amount: { type: String },
        country: { type: String },
        city: { type: String },
      },
    },
  },
  geolocation: {
    campus: { type: String, required: true },
    country: { type: String, required: true },
  },
  otherSpecialConditions: {
    additionalDescription: { type: String, required: true },
    uploadedFiles: [{ type: String }],
  },
});

// Export the schema and the model separately
export { SFSSubmitExchangeSchema };

const SFSSubmitExchangeModel =
  mongoose.models.SFSSubmitExchangeSchema ||
  mongoose.model("SFSSubmitExchangeSchema", SFSSubmitExchangeSchema);

export default SFSSubmitExchangeModel;
