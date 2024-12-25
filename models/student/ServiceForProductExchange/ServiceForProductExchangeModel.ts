import mongoose, { Schema, Document } from "mongoose";
import { SFPSubmitExchangeSchema } from "@/models/student/ServiceForProductExchange/SFPSubmitExchangeModel";
import { SFPExpectedRequirementsSchema } from "@/models/student/ServiceForProductExchange/SFPExpectedRequirementModel";

// Interface for ProductForServiceExchange
export interface ServiceForProductExchange extends Document {
  submitExchangeDetails: Record<string, any>; // Adjust type based on schema
  expectedRequirements: Record<string, any>; // Adjust type based on schema
  status: "active" | "inactive" | "pending" | "completed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Main Schema for ProductForServiceExchange
const ServiceForProductExchangeSchema = new Schema(
  {
    submitExchangeDetails: {
      type: SFPSubmitExchangeSchema.obj, // Use the `.obj` of the schema
      required: true,
    },
    expectedRequirements: {
      type: SFPExpectedRequirementsSchema.obj, // Use the `.obj` of the schema
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "completed"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Override the default toJSON method
ServiceForProductExchangeSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// Export the model
export default mongoose.models.ServiceForProductExchange ||
  mongoose.model<ServiceForProductExchange>(
    "ServiceForProductExchange",
    ServiceForProductExchangeSchema
  );
