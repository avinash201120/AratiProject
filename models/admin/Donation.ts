import mongoose, { Schema, Types, Model } from "mongoose";

export interface IDonation {
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdBy: Types.ObjectId;
  createdAt?: Date;
}

const DonationSchema = new Schema<IDonation>({
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

export const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);
