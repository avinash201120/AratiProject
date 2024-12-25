import mongoose, { Schema } from "mongoose";

// Define the schema
const PFSSubmitExchangeSchema = new Schema({
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
    estimatedValue: { type: String, required: true },
    depositPayment: {
      decision: { type: String, enum: ["yes", "no", ""], required: true },
      depositPayment: {
        percentage: {
          type: String,
          required: function (this: { decision: string }) {
            return this.decision === "yes";
          },
        },
      },
    },
    otherContingentCoverageRequired: { type: String, required: true },
  },
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
  deliveryConditions: {
    pickup: {
      allowed: { type: String, enum: ["yes", "no", ""], required: true },
      details: {
        address: String,
        country: String,
        city: String,
        campus: String,
      },
    },
    delivery: {
      allowed: { type: String, enum: ["yes", "no", ""], required: true },
      costOption: { type: String, enum: ["yes", "no", ""] },
      details: {
        amount: String,
        country: String,
        city: String,
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

// Export both Schema and Model
export { PFSSubmitExchangeSchema }; // Export the schema explicitly
const PFSSubmitExchangeModel =
  mongoose.models.PFSSubmitExchange ||
  mongoose.model("PFSSubmitExchange", PFSSubmitExchangeSchema);
export default PFSSubmitExchangeModel;
