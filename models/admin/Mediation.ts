import mongoose, { Schema, Types, Model } from "mongoose";

export interface IMediation {
  issue: string;
  resolution?: string;
  status: "open" | "resolved";
  createdBy: Types.ObjectId;
  createdAt?: Date;
}

const MediationSchema = new Schema<IMediation>({
  issue: { type: String, required: true },
  resolution: { type: String },
  status: { type: String, enum: ["open", "resolved"], default: "open" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Mediation: Model<IMediation> =
  mongoose.models.Mediation ||
  mongoose.model<IMediation>("Mediation", MediationSchema);
