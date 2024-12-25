import mongoose, { Schema } from "mongoose";

// Define the schema
const PFSExpectedRequirementsSchema = new Schema({
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
    // freeQuote: {
    //   freeQuote: { type: String, enum: ["yes", "no", ""], required: true },
    //   feeAmount: {
    //     type: Number,
    //     required: function (this: { freeQuote: string }) {
    //       return this.freeQuote === "no";
    //     },
    //   },
    // },
    freeQuote: {
      freeQuote: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      feeAmount: {
        type: Number,
        set: function (value: any) {
          // Convert "undefined" string to actual undefined or parse the number
          if (value === "undefined") return undefined;
          return Number(value);
        },
        required: function (this: any) {
          // Ensure feeAmount is required only if freeQuote is "no"
          return this.freeQuote === "no";
        },
        default: function (this: any) {
          // Default to null if freeQuote is "yes" or ""
          return this.freeQuote === "yes" || this.freeQuote === ""
            ? null
            : undefined;
        },
        validate: {
          validator: function (value: number | null | undefined) {
            const freeQuoteValue = (this as any).freeQuote; // Access freeQuote safely
            if (freeQuoteValue === "no") {
              return typeof value === "number" && !isNaN(value);
            }
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
      amountOfCost: { type: Number },
      natureOfTheseCost: { type: String },
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
export { PFSExpectedRequirementsSchema }; // Schema export

const PFSExpectedRequirementsModel =
  mongoose.models.PFSExpectedRequirements ||
  mongoose.model("PFSExpectedRequirements", PFSExpectedRequirementsSchema);

export default PFSExpectedRequirementsModel;
