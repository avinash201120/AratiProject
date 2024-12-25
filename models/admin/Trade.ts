import mongoose, { Schema, Types, Model } from "mongoose";

export interface ITrade {
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdBy: Types.ObjectId;
  createdAt?: Date;
}

const TradeSchema = new Schema<ITrade>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Trade: Model<ITrade> =
  mongoose.models.Trade || mongoose.model<ITrade>("Trade", TradeSchema);
