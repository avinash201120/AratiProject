import mongoose, { Schema, Types, Model } from "mongoose";

export interface ISale {
  title: string;
  description: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  createdBy: Types.ObjectId;
  createdAt?: Date;
}

const SaleSchema = new Schema<ISale>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Sale: Model<ISale> =
  mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
