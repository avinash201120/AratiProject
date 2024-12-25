import mongoose, { Schema, Document } from "mongoose";

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
    freeQuote: "yes" | "no" | "";
    feeAmount?: number | null;
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

interface SFSExpectedRequirements extends Document {
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
const SFSExpectedRequirementsSchema = new Schema<SFSExpectedRequirements>({
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
        enum: ["yes", "no", ""],
        required: true,
      },
      feeAmount: {
        type: Number,
        required: function (this: SFSExpectedRequirements) {
          console.log(
            "Checking if feeAmount is required for freeQuote:",
            this.materialConditions.freeQuote.freeQuote
          ); // Debugging: log freeQuote
          return this.materialConditions.freeQuote.freeQuote === "no"; // Only required if freeQuote is "no"
        },
        set: function (this: SFSExpectedRequirements, value: any) {
          console.log(
            "Setting feeAmount. Current freeQuote value:",
            this.materialConditions.freeQuote.freeQuote
          ); // Debugging: log the current freeQuote value
          console.log("Received value for feeAmount:", value); // Debugging: log received value for feeAmount
          if (this.materialConditions.freeQuote.freeQuote === "yes") {
            return undefined; // Set feeAmount to undefined if freeQuote is "yes"
          }
          const numericValue = isNaN(value) ? undefined : value;
          console.log("Returning feeAmount value:", numericValue); // Debugging: log the final value of feeAmount
          return numericValue;
        },
        validate: {
          validator: function (value: number | undefined) {
            const freeQuoteValue = this.materialConditions.freeQuote.freeQuote;
            console.log(
              "Validating feeAmount. Current freeQuote value:",
              freeQuoteValue
            ); // Debugging: log freeQuote during validation
            if (freeQuoteValue === "no") {
              const isValid = typeof value === "number" && !isNaN(value);
              console.log("Is feeAmount a valid number for 'no'?", isValid); // Debugging: log validation result
              return isValid; // Validate feeAmount as a number if freeQuote is "no"
            }
            const isValidForYes = value === null || value === undefined;
            console.log(
              "Is feeAmount valid for 'yes' or empty?",
              isValidForYes
            ); // Debugging: log validation result for 'yes' or empty
            return isValidForYes; // Validate feeAmount as null or undefined if freeQuote is "yes"
          },
          message: "feeAmount must be a valid number when freeQuote is 'no'.",
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
          if (typeof value === "string") {
            const numberValue = Number(value);
            return isNaN(numberValue) ? null : numberValue; // Convert to number if valid
          }
          return value; // Return the value as is if it's already a valid number
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
export { SFSExpectedRequirementsSchema };

const SFSExpectedRequirementsModel =
  mongoose.models.SFSExpectedRequirements ||
  mongoose.model("SFSExpectedRequirements", SFSExpectedRequirementsSchema);

export default SFSExpectedRequirementsModel;
