import mongoose, { Schema, Document } from "mongoose";
import SubmitExchangeSchema from "@/models/student/ProductForProductExchange/SubmitExchangeModel";
import ExpectedRequirementsSchema from "@/models/student/ProductForProductExchange/ExpectedRequirementsModel";

// Interface for ProductForProductExchange
export interface ProductForProductExchange extends Document {
  id: string;
  submitExchangeDetails: typeof SubmitExchangeSchema; // Reference the schema
  expectedRequirements: typeof ExpectedRequirementsSchema; // Reference the schema
  status: "active" | "inactive" | "pending" | "completed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductForProductExchangeSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    submitExchangeDetails: {
      type: SubmitExchangeSchema, // Use the subschema
      required: true,
    },
    expectedRequirements: {
      type: ExpectedRequirementsSchema, // Use the subschema
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
ProductForProductExchangeSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.models.ProductForProductExchange ||
  mongoose.model<ProductForProductExchange>(
    "ProductForProductExchange",
    ProductForProductExchangeSchema
  );

// import mongoose, { Schema, Document } from "mongoose";
// import SubmitExchangeSchema from "@/models/student/SubmitExchangeModel";
// import ExpectedRequirementsSchema from "@/models/student/ExpectedRequirementsModel";

// // Interface for TypeScript type
// export interface ProductForProductExchange extends Document {
//   id: string; // Unique identifier for the product exchange
//   submitExchangeDetails: mongoose.Types.Subdocument; // Details of the exchange from SubmitExchangeModel
//   expectedRequirements: mongoose.Types.Subdocument; // Details of the expected requirements
//   status: "active" | "inactive" | "pending" | "completed"; // Status of the exchange
//   createdBy: mongoose.Types.ObjectId; // Reference to User model
//   createdAt: Date; // Creation timestamp
//   updatedAt: Date; // Last update timestamp
// }

// // Schema for Mongoose
// const ProductForProductExchangeSchema: Schema = new Schema(
//   {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       auto: true, // Automatically generated ObjectId
//     },
//     submitExchangeDetails: {
//       type: SubmitExchangeSchema,
//       required: true,
//     },
//     expectedRequirements: {
//       type: ExpectedRequirementsSchema,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive", "pending", "completed"],
//       default: "pending",
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//     versionKey: false, // Removes the __v field
//   }
// );

// // Override the default toJSON method to map `_id` to `id`
// ProductForProductExchangeSchema.set("toJSON", {
//   virtuals: true,
//   transform: (_doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     return ret;
//   },
// });

// // Export the Mongoose model
// export default mongoose.models.ProductForProductExchange ||
//   mongoose.model<ProductForProductExchange>(
//     "ProductForProductExchange",
//     ProductForProductExchangeSchema
//   );
