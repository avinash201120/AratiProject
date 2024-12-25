import mongoose, { Schema, Document } from "mongoose";
import { SFSSubmitExchangeSchema } from "@/models/student/ServiceForServiceExchange/SFSSubmitExchangeModel";
import { SFSExpectedRequirementsSchema } from "@/models/student/ServiceForServiceExchange/SFSExpectedRequirementModel";

// Interface for ProductForServiceExchange
export interface ServiceForServiceExchange extends Document {
  submitExchangeDetails: Record<string, any>; // Adjust type based on schema
  expectedRequirements: Record<string, any>; // Adjust type based on schema
  status: "active" | "inactive" | "pending" | "completed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Main Schema for ProductForServiceExchange
const ServiceForServiceExchangeSchema = new Schema(
  {
    submitExchangeDetails: {
      type: SFSSubmitExchangeSchema.obj, // Use the `.obj` of the schema
      required: true,
    },
    expectedRequirements: {
      type: SFSExpectedRequirementsSchema.obj, // Use the `.obj` of the schema
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
ServiceForServiceExchangeSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// Export the model
export default mongoose.models.ServiceForServiceExchange ||
  mongoose.model<ServiceForServiceExchange>(
    "ServiceForServiceExchange",
    ServiceForServiceExchangeSchema
  );
