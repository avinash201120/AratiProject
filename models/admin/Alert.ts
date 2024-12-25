import mongoose, { Schema, Model } from "mongoose";

export interface IAlert {
  message: string;
  status: "unread" | "read";
  createdAt?: Date;
}

const AlertSchema = new Schema<IAlert>({
  message: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  createdAt: { type: Date, default: Date.now },
});

export const Alert: Model<IAlert> =
  mongoose.models.Alert || mongoose.model<IAlert>("Alert", AlertSchema);
